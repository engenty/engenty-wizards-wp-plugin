<?php
/**
 * A standalone run: the state WordPress keeps, the routes a visitor's browser calls, the limits.
 *
 * @package Engenty_Wizards
 */

defined( 'ABSPATH' ) || exit;

/**
 * The browser follows the flow and draws every page; this class keeps the run (values, outputs,
 * history) and moves it: a page is sent as values, a step that needs the model is asked for by
 * id and answered with the view after it. Ports of the runtime's runner.ts and input.ts, line
 * for line where it says so.
 */
class Engenty_Runs {

	const NS = 'engenty/v1';

	/** A run keeps files up to this size; images only. */
	const MAX_UPLOAD = 4000000;

	/** A branch back to an earlier step without `max` is taken at most this often (definition.ts DEFAULT_LOOP_MAX). */
	const DEFAULT_LOOP_MAX = 10;

	/** A page with decided fields shows at most this many (definition.ts MAX_SHOWN_FIELDS). */
	const MAX_SHOWN_FIELDS = 5;

	/** Hooks the public routes. */
	public static function init() {
		add_action( 'rest_api_init', array( __CLASS__, 'routes' ) );
		add_action( 'engenty_wizards_daily', array( __CLASS__, 'expire' ) );
		if ( ! wp_next_scheduled( 'engenty_wizards_daily' ) ) {
			wp_schedule_event( time() + HOUR_IN_SECONDS, 'daily', 'engenty_wizards_daily' );
		}
	}

	/**
	 * The public routes: no nonce, a visitor's browser calls them.
	 */
	public static function routes() {
		$public = '__return_true';
		$routes = array(
			array( '/local/wizards/(?P<token>[A-Za-z0-9]{22})', 'GET', 'wizard' ),
			array( '/local/wizards/(?P<token>[A-Za-z0-9]{22})/runs', 'POST', 'start' ),
			array( '/local/runs/(?P<id>[A-Za-z0-9_]{6,24})', 'GET', 'get_view' ),
			array( '/local/runs/(?P<id>[A-Za-z0-9_]{6,24})/pages/(?P<step>[A-Za-z0-9_]+)', 'POST', 'submit_page' ),
			array( '/local/runs/(?P<id>[A-Za-z0-9_]{6,24})/steps/(?P<step>[A-Za-z0-9_]+)', 'POST', 'run_step' ),
			array( '/local/runs/(?P<id>[A-Za-z0-9_]{6,24})/reviews/(?P<step>[A-Za-z0-9_]+)', 'POST', 'review' ),
			array( '/local/runs/(?P<id>[A-Za-z0-9_]{6,24})/back', 'POST', 'back' ),
			array( '/local/runs/(?P<id>[A-Za-z0-9_]{6,24})/retry', 'POST', 'retry' ),
			array( '/local/runs/(?P<id>[A-Za-z0-9_]{6,24})/cancel', 'POST', 'cancel' ),
			array( '/local/runs/(?P<id>[A-Za-z0-9_]{6,24})/uploads', 'POST', 'upload' ),
			array( '/local/runs/(?P<id>[A-Za-z0-9_]{6,24})/assets/(?P<asset>[A-Za-z0-9_.-]+)', 'GET', 'asset' ),
			array( '/local/runs/(?P<id>[A-Za-z0-9_]{6,24})/steps/(?P<step>[A-Za-z0-9_]+)/download', 'GET', 'download' ),
		);
		foreach ( $routes as list( $path, $method, $handler ) ) {
			register_rest_route(
				self::NS,
				$path,
				array(
					'methods'             => $method,
					'callback'            => array( __CLASS__, $handler ),
					'permission_callback' => $public,
				)
			);
		}
	}

	// --- the table ------------------------------------------------------------------------

	/**
	 * One run by id, its state read.
	 *
	 * @param string $id The id.
	 * @return array|null
	 */
	public static function load( $id ) {
		global $wpdb;
		$table = Engenty_Packages::runs_table();
		// phpcs:ignore WordPress.DB.DirectDatabaseQuery -- own table.
		$row = $wpdb->get_row( $wpdb->prepare( 'SELECT * FROM %i WHERE id = %s', $table, $id ), ARRAY_A );
		if ( ! $row ) {
			return null;
		}
		$row['state'] = Engenty_Packages::json_or( $row['state'], self::fresh_state() );
		$row['calls'] = (int) $row['calls'];
		return $row;
	}

	/**
	 * Writes the run's changes.
	 *
	 * @param array $run   The run.
	 * @param array $patch Columns to change; `state` as an array.
	 * @return array The run as it is now.
	 */
	private static function update( array $run, array $patch ) {
		global $wpdb;
		if ( isset( $patch['state'] ) ) {
			$patch['state'] = wp_json_encode( $patch['state'] );
		}
		$patch['updated_at'] = current_time( 'mysql', true );
		if ( isset( $patch['status'] ) && in_array( $patch['status'], array( 'done', 'failed', 'cancelled' ), true ) && empty( $run['finished_at'] ) ) {
			$patch['finished_at'] = $patch['updated_at'];
		}
		// phpcs:ignore WordPress.DB.DirectDatabaseQuery -- own table.
		$wpdb->update( Engenty_Packages::runs_table(), $patch, array( 'id' => $run['id'] ) );
		return self::load( $run['id'] );
	}

	/**
	 * A run's state as it starts (run.ts RunState).
	 *
	 * @return array
	 */
	private static function fresh_state() {
		return array(
			'values'    => new stdClass(),
			'outputs'   => new stdClass(),
			'history'   => array(),
			'notes'     => new stdClass(),
			'pages'     => new stdClass(),
			'loops'     => new stdClass(),
			'decisions' => new stdClass(),
		);
	}

	/**
	 * The state with every map as an array (JSON gives `{}` as stdClass only when empty).
	 *
	 * @param array $state The state.
	 * @return array
	 */
	private static function maps( array $state ) {
		foreach ( array( 'values', 'outputs', 'notes', 'pages', 'loops', 'decisions', 'redo' ) as $key ) {
			$state[ $key ] = isset( $state[ $key ] ) ? (array) $state[ $key ] : array();
		}
		$state['history'] = array_values( (array) ( $state['history'] ?? array() ) );
		return $state;
	}

	/**
	 * The state as it is written: empty maps as `{}`, not `[]`.
	 *
	 * @param array $state The state.
	 * @return array
	 */
	private static function packed( array $state ) {
		foreach ( array( 'values', 'outputs', 'notes', 'pages', 'loops', 'decisions', 'redo' ) as $key ) {
			if ( isset( $state[ $key ] ) && is_array( $state[ $key ] ) && empty( $state[ $key ] ) ) {
				$state[ $key ] = new stdClass();
			}
		}
		return $state;
	}

	/**
	 * Where a run's files live.
	 *
	 * @param string $run_id The run.
	 * @return string
	 */
	public static function files_dir( $run_id ) {
		$upload = wp_upload_dir();
		return trailingslashit( $upload['basedir'] ) . 'engenty-wizards/runs/' . sanitize_key( $run_id );
	}

	/**
	 * Moves an uploaded photo into a run's folder through WordPress' own upload handling.
	 *
	 * @param array  $file The entry of the request's files.
	 * @param string $dir  The run's folder under uploads.
	 * @param string $id   The name the file keeps there.
	 * @return true|WP_Error
	 */
	private static function keep_upload( array $file, $dir, $id ) {
		if ( ! function_exists( 'wp_handle_upload' ) ) {
			require_once ABSPATH . 'wp-admin/includes/file.php';
		}
		$upload = wp_upload_dir();
		$into   = static function ( $dirs ) use ( $dir, $upload ) {
			$dirs['path']   = $dir;
			$dirs['url']    = str_replace( $upload['basedir'], $upload['baseurl'], $dir );
			$dirs['subdir'] = '';
			return $dirs;
		};
		add_filter( 'upload_dir', $into );
		$moved = wp_handle_upload(
			$file,
			array(
				'test_form'                => false,
				'mimes'                    => array(
					'jpg|jpeg' => 'image/jpeg',
					'png'      => 'image/png',
					'webp'     => 'image/webp',
					'gif'      => 'image/gif',
				),
				'unique_filename_callback' => static function () use ( $id ) {
					return $id;
				},
			)
		);
		remove_filter( 'upload_dir', $into );
		if ( ! is_array( $moved ) || ! empty( $moved['error'] ) || empty( $moved['file'] ) ) {
			return new WP_Error( 'engenty_io', __( 'Die Datei konnte nicht gespeichert werden.', 'engenty-wizards' ), array( 'status' => 500 ) );
		}
		return true;
	}

	/**
	 * Removes a wizard's runs with their files.
	 *
	 * @param string $wizard_id The wizard.
	 */
	public static function remove_of_wizard( $wizard_id ) {
		global $wpdb;
		$table = Engenty_Packages::runs_table();
		// phpcs:ignore WordPress.DB.DirectDatabaseQuery -- own table.
		$ids = $wpdb->get_col( $wpdb->prepare( 'SELECT id FROM %i WHERE wizard_id = %s', $table, $wizard_id ) );
		foreach ( (array) $ids as $id ) {
			Engenty_Packages::remove_dir( self::files_dir( $id ) );
		}
		// phpcs:ignore WordPress.DB.DirectDatabaseQuery -- own table.
		$wpdb->delete( $table, array( 'wizard_id' => $wizard_id ) );
	}

	/** Removes runs older than the settings say, with their files. Daily. */
	public static function expire() {
		global $wpdb;
		$days = (int) ( Engenty_Settings::all()['local']['keepDays'] ?? 90 );
		if ( $days <= 0 ) {
			return;
		}
		$table  = Engenty_Packages::runs_table();
		$before = gmdate( 'Y-m-d H:i:s', time() - $days * DAY_IN_SECONDS );
		// phpcs:ignore WordPress.DB.DirectDatabaseQuery -- own table.
		$ids = $wpdb->get_col( $wpdb->prepare( 'SELECT id FROM %i WHERE started_at < %s', $table, $before ) );
		foreach ( (array) $ids as $id ) {
			Engenty_Packages::remove_dir( self::files_dir( $id ) );
			// phpcs:ignore WordPress.DB.DirectDatabaseQuery -- own table.
			$wpdb->delete( $table, array( 'id' => $id ) );
		}
	}

	// --- limits ---------------------------------------------------------------------------

	/**
	 * Who the visitor is, as a hash of the id their browser keeps and their address.
	 *
	 * @param WP_REST_Request $request The request.
	 * @return string
	 */
	private static function visitor( WP_REST_Request $request ) {
		$id = sanitize_text_field( (string) $request->get_header( 'x-engenty-visitor' ) );
		$ip = isset( $_SERVER['REMOTE_ADDR'] ) ? sanitize_text_field( wp_unslash( $_SERVER['REMOTE_ADDR'] ) ) : '';
		return substr( hash( 'sha256', 'engenty:' . $id . ':' . $ip . ':' . wp_salt( 'nonce' ) ), 0, 40 );
	}

	/**
	 * Whether a visitor may start another run, by the hour and the wizard's day.
	 *
	 * @param string $visitor   The visitor's hash.
	 * @param string $wizard_id The wizard.
	 * @return true|WP_Error
	 */
	private static function within_limits( $visitor, $wizard_id ) {
		global $wpdb;
		$table    = Engenty_Packages::runs_table();
		$settings = Engenty_Settings::all()['local'];
		$hour     = gmdate( 'Y-m-d H:i:s', time() - HOUR_IN_SECONDS );
		$day      = gmdate( 'Y-m-d H:i:s', time() - DAY_IN_SECONDS );
		// phpcs:ignore WordPress.DB.DirectDatabaseQuery -- own table.
		$by_visitor = (int) $wpdb->get_var( $wpdb->prepare( 'SELECT COUNT(*) FROM %i WHERE visitor = %s AND started_at > %s', $table, $visitor, $hour ) );
		if ( $by_visitor >= (int) $settings['runsPerHour'] ) {
			return new WP_Error(
				'engenty_limit',
				__( 'Das waren genug Versuche für diese Stunde. Bitte später noch einmal.', 'engenty-wizards' ),
				array(
					'status' => 429,
					'code'   => 'limit',
				)
			);
		}
		// phpcs:ignore WordPress.DB.DirectDatabaseQuery -- own table.
		$by_wizard = (int) $wpdb->get_var( $wpdb->prepare( 'SELECT COUNT(*) FROM %i WHERE wizard_id = %s AND started_at > %s', $table, $wizard_id, $day ) );
		if ( $by_wizard >= (int) $settings['runsPerDay'] ) {
			return new WP_Error(
				'engenty_limit',
				__( 'Dieser Wizard hat heute genug zu tun gehabt. Bitte morgen noch einmal.', 'engenty-wizards' ),
				array(
					'status' => 429,
					'code'   => 'limit',
				)
			);
		}
		return true;
	}

	// --- the routes -----------------------------------------------------------------------

	/**
	 * A WP_Error as the browser reads it (`{ error, code }` with its status), or the answer.
	 *
	 * @param array|WP_Error $answer The answer.
	 * @return WP_REST_Response
	 */
	private static function respond( $answer ) {
		if ( is_wp_error( $answer ) ) {
			$data = (array) $answer->get_error_data();
			$body = array(
				'error' => $answer->get_error_message(),
				'code'  => $data['code'] ?? str_replace( 'engenty_', '', $answer->get_error_code() ),
			);
			if ( ! empty( $data['fields'] ) ) {
				$body['fields'] = $data['fields'];
			}
			return new WP_REST_Response( $body, (int) ( $data['status'] ?? 400 ) );
		}
		return rest_ensure_response( $answer );
	}

	/**
	 * The wizard as a visitor's browser starts it (run.ts PublicWizard).
	 *
	 * @param WP_REST_Request $request `token`.
	 * @return WP_REST_Response
	 */
	public static function wizard( WP_REST_Request $request ) {
		$w = Engenty_Packages::by_token( (string) $request['token'] );
		if ( ! $w ) {
			return self::respond( new WP_Error( 'engenty_not_found', __( 'Diesen Wizard gibt es nicht.', 'engenty-wizards' ), array( 'status' => 404 ) ) );
		}
		$provider = Engenty_Think::provider();
		$ready    = 'live' === $w['status'] && ! empty( $provider['ready'] );
		return self::respond(
			array(
				'token'             => $w['token'],
				'title'             => $w['title'],
				'description'       => $w['description'],
				'avatar'            => $w['avatar'],
				'intro'             => $w['definition']['intro'] ?? null,
				'brand'             => self::brand(),
				'turnstileSiteKey'  => null,
				'available'         => $ready,
				'unavailableReason' => $ready ? null : ( 'live' === $w['status'] ? __( 'Dieser Wizard ist gerade nicht erreichbar.', 'engenty-wizards' ) : __( 'Dieser Wizard ist pausiert.', 'engenty-wizards' ) ),
				'steps'             => $w['steps'],
				'provider'          => $provider['name'] ?? null,
			)
		);
	}

	/**
	 * The site as the wizard's brand (run.ts BrandView).
	 *
	 * @return array
	 */
	public static function brand() {
		$logo   = Engenty_Site_Reader::logo();
		$colors = Engenty_Site_Reader::colors();
		return array(
			'name'    => wp_specialchars_decode( get_bloginfo( 'name' ), ENT_QUOTES ),
			'accent'  => $colors[0]['value'] ?? null,
			'logoUrl' => $logo['url'] ?? null,
		);
	}

	/**
	 * Starts a run (runner.ts createRun).
	 *
	 * @param WP_REST_Request $request `origin`, `website` (the honeypot).
	 * @return WP_REST_Response
	 */
	public static function start( WP_REST_Request $request ) {
		global $wpdb;
		$w = Engenty_Packages::by_token( (string) $request['token'] );
		if ( ! $w || 'live' !== $w['status'] ) {
			return self::respond( new WP_Error( 'engenty_not_found', __( 'Diesen Wizard gibt es nicht.', 'engenty-wizards' ), array( 'status' => 404 ) ) );
		}
		$body = (array) $request->get_json_params();
		// The honeypot: a field no person sees, filled by a bot.
		if ( '' !== (string) ( $body['website'] ?? '' ) ) {
			return self::respond(
				new WP_Error(
					'engenty_limit',
					__( 'Das hat nicht geklappt.', 'engenty-wizards' ),
					array(
						'status' => 429,
						'code'   => 'limit',
					)
				)
			);
		}
		$visitor = self::visitor( $request );
		$ok      = self::within_limits( $visitor, $w['id'] );
		if ( is_wp_error( $ok ) ) {
			return self::respond( $ok );
		}
		$first = $w['definition']['steps'][0];
		$now   = current_time( 'mysql', true );
		$id    = 'loc_' . strtolower( wp_generate_password( 16, false ) );
		$state = self::fresh_state();
		// phpcs:ignore WordPress.DB.DirectDatabaseQuery -- own table.
		$wpdb->insert(
			Engenty_Packages::runs_table(),
			array(
				'id'         => $id,
				'wizard_id'  => $w['id'],
				'status'     => 'page' === $first['type'] ? 'waiting_input' : 'running',
				'cursor_id'  => $first['id'],
				'state'      => wp_json_encode( $state ),
				'origin'     => esc_url_raw( mb_substr( (string) ( $body['origin'] ?? '' ), 0, 500 ) ),
				'visitor'    => $visitor,
				'calls'      => 0,
				'error'      => '',
				'started_at' => $now,
				'updated_at' => $now,
			)
		);
		$run = self::load( $id );
		return self::respond(
			array(
				'runId' => $id,
				'view'  => self::view( $run, $w ),
			)
		);
	}

	/**
	 * The run and its wizard, or why not.
	 *
	 * @param WP_REST_Request $request `id`.
	 * @return array|WP_Error `[ $run, $wizard ]`.
	 */
	private static function find( WP_REST_Request $request ) {
		$run = self::load( (string) $request['id'] );
		$w   = $run ? Engenty_Packages::get( $run['wizard_id'] ) : null;
		if ( ! $run || ! $w ) {
			return new WP_Error( 'engenty_not_found', __( 'Diesen Durchlauf gibt es nicht mehr.', 'engenty-wizards' ), array( 'status' => 404 ) );
		}
		return array( $run, $w );
	}

	/**
	 * The view as it is.
	 *
	 * @param WP_REST_Request $request `id`.
	 * @return WP_REST_Response
	 */
	public static function get_view( WP_REST_Request $request ) {
		$found = self::find( $request );
		if ( is_wp_error( $found ) ) {
			return self::respond( $found );
		}
		list( $run, $w ) = $found;
		return self::respond( self::view( $run, $w ) );
	}

	/**
	 * A page's answers (runner.ts submitPage).
	 *
	 * @param WP_REST_Request $request `id`, `step`, `{ values }`.
	 * @return WP_REST_Response
	 */
	public static function submit_page( WP_REST_Request $request ) {
		$found = self::find( $request );
		if ( is_wp_error( $found ) ) {
			return self::respond( $found );
		}
		list( $run, $w ) = $found;
		$step_id         = (string) $request['step'];
		$step            = self::step_of( $w['definition'], $step_id );
		if ( ! in_array( $run['status'], array( 'waiting_input', 'done' ), true ) ) {
			return self::respond( new WP_Error( 'engenty_conflict', __( 'Der Wizard arbeitet gerade.', 'engenty-wizards' ), array( 'status' => 409 ) ) );
		}
		if ( $run['cursor_id'] !== $step_id || ! $step || 'page' !== $step['type'] ) {
			return self::respond( new WP_Error( 'engenty_conflict', __( 'Diese Seite ist nicht mehr aktuell.', 'engenty-wizards' ), array( 'status' => 409 ) ) );
		}
		$state   = self::maps( $run['state'] );
		$input   = (array) ( ( (array) $request->get_json_params() )['values'] ?? array() );
		$context = self::page_context( $w['definition'], $state, $step );
		$read    = self::read_page_input( $step, $input, $context );
		// An answer that leads to a step the site cannot run would stop the run there, later.
		foreach ( self::closed_choices( $w['definition'], $step, $state['values'], self::lacking_of( $w ) ) as $id => $choice ) {
			if ( ! array_key_exists( $id, $read['values'] ) ) {
				continue;
			}
			$answer = self::as_string( $read['values'][ $id ] );
			if ( ! $choice['values'] || in_array( $answer, array_map( array( __CLASS__, 'as_string' ), $choice['values'] ), true ) ) {
				$read['errors'][] = array(
					'field'   => $id,
					'message' => __( 'Das ist hier gerade nicht verfügbar.', 'engenty-wizards' ),
				);
			}
		}
		if ( $read['errors'] ) {
			return self::respond(
				new WP_Error(
					'engenty_input',
					__( 'Bitte die markierten Felder prüfen.', 'engenty-wizards' ),
					array(
						'status' => 422,
						'fields' => $read['errors'],
					)
				)
			);
		}
		// Uploads named must belong to this run.
		foreach ( $step['fields'] as $field ) {
			if ( in_array( $field['kind'], array( 'image', 'file', 'signature' ), true ) && isset( $read['values'][ $field['id'] ] ) ) {
				$ids = (array) $read['values'][ $field['id'] ];
				foreach ( $ids as $asset_id ) {
					if ( ! self::asset_path( $run['id'], (string) $asset_id ) ) {
						return self::respond(
							new WP_Error(
								'engenty_input',
								__( 'Bitte die markierten Felder prüfen.', 'engenty-wizards' ),
								array(
									'status' => 422,
									'fields' => array(
										array(
											'field'   => $field['id'],
											'message' => __( 'Datei nicht gefunden', 'engenty-wizards' ),
										),
									),
								)
							)
						);
					}
				}
			}
		}
		$state['values'] = array_merge( $state['values'], $read['values'] );
		// Fields left empty on a revisited page are cleared, not kept from before.
		foreach ( $step['fields'] as $field ) {
			if ( ! array_key_exists( $field['id'], $read['values'] ) ) {
				unset( $state['values'][ $field['id'] ] );
			}
		}
		// Later pages decide their fields again on what is answered now.
		$after = false;
		foreach ( $w['definition']['steps'] as $s ) {
			if ( $after ) {
				unset( $state['pages'][ $s['id'] ] );
			}
			if ( $s['id'] === $step_id ) {
				$after = true;
			}
		}
		$state['history'][] = $step_id;
		$cursor             = self::advance( $w['definition'], $step_id, $state );
		$run                = self::update(
			$run,
			array(
				'state'     => self::packed( $state ),
				'cursor_id' => (string) $cursor,
				'status'    => 'running',
				'error'     => '',
			)
		);
		return self::respond( self::settle( $run, $w ) );
	}

	/**
	 * Runs the one step the browser asks for: a decision over branches, a page's decided
	 * fields, or an automatic step (runner.ts drive, one turn of the loop).
	 *
	 * @param WP_REST_Request $request `id`, `step`.
	 * @return WP_REST_Response
	 */
	public static function run_step( WP_REST_Request $request ) {
		$found = self::find( $request );
		if ( is_wp_error( $found ) ) {
			return self::respond( $found );
		}
		list( $run, $w ) = $found;
		if ( 'running' !== $run['status'] ) {
			return self::respond( self::view( $run, $w ) );
		}
		$def    = $w['definition'];
		$state  = self::maps( $run['state'] );
		$asked  = (string) $request['step'];
		$active = ! empty( $state['deciding'] ) ? (string) $state['deciding'] : $run['cursor_id'];
		if ( $asked !== $active ) {
			return self::respond( self::view( $run, $w ) );
		}
		$step = self::step_of( $def, $active );
		if ( ! $step ) {
			return self::respond( self::view( self::update( $run, array( 'status' => 'done' ) ), $w ) );
		}
		$think = new Engenty_Think( $def, $w, $run );
		try {
			if ( ! empty( $state['deciding'] ) ) {
				$cursor = $think->decide_branch( $step, $state );
				unset( $state['deciding'] );
				$run = self::update(
					$run,
					array(
						'state'     => self::packed( $state ),
						'cursor_id' => (string) $cursor,
						'status'    => null === $cursor ? 'done' : 'running',
						'calls'     => $run['calls'] + $think->calls,
						'error'     => '',
					)
				);
				return self::respond( self::settle( $run, $w ) );
			}
			if ( 'page' === $step['type'] ) {
				// A page whose fields a decision picks: picked once, as the run reaches it.
				if ( self::has_decided_fields( $step ) && ! isset( $state['pages'][ $step['id'] ] ) ) {
					$state['pages'][ $step['id'] ] = array( 'shown' => $think->decide_page_fields( $step, $state ) );
				}
				$run = self::update(
					$run,
					array(
						'state'  => self::packed( $state ),
						'status' => 'waiting_input',
						'calls'  => $run['calls'] + $think->calls,
					)
				);
				return self::respond( self::view( $run, $w ) );
			}
			if ( 'review' === $step['type'] ) {
				return self::respond( self::view( self::update( $run, array( 'status' => 'waiting_input' ) ), $w ) );
			}
			if ( 'result' === $step['type'] ) {
				return self::respond( self::view( self::update( $run, array( 'status' => 'done' ) ), $w ) );
			}
			$output                          = $think->run_automatic( $step, $state );
			$state['outputs'][ $step['id'] ] = $output;
			unset( $state['notes'][ $step['id'] ], $state['redo'][ $step['id'] ] );
			$cursor = self::advance( $def, $step['id'], $state );
			$run    = self::update(
				$run,
				array(
					'state'     => self::packed( $state ),
					'cursor_id' => (string) $cursor,
					'status'    => null === $cursor ? 'done' : 'running',
					'calls'     => $run['calls'] + $think->calls,
					'error'     => '',
				)
			);
			return self::respond( self::settle( $run, $w ) );
		} catch ( Engenty_Step_Error $e ) {
			$run  = self::update(
				$run,
				array(
					'status' => 'failed',
					'error'  => $e->getMessage(),
					'calls'  => $run['calls'] + $think->calls,
				)
			);
			$view = self::view( $run, $w );
			return new WP_REST_Response( $view, 502 === $e->status ? 200 : 200 );
		}
	}

	/**
	 * After a step: a run whose next step is a page or a review waits; the result ends it;
	 * an automatic step stays `running` for the browser to ask for.
	 *
	 * @param array $run The run.
	 * @param array $w   The wizard.
	 * @return array The view.
	 */
	private static function settle( array $run, array $w ) {
		if ( 'running' !== $run['status'] ) {
			return self::view( $run, $w );
		}
		$state = self::maps( $run['state'] );
		if ( ! empty( $state['deciding'] ) ) {
			return self::view( $run, $w );
		}
		$step = self::step_of( $w['definition'], $run['cursor_id'] );
		if ( ! $step ) {
			return self::view( self::update( $run, array( 'status' => 'done' ) ), $w );
		}
		if ( 'result' === $step['type'] ) {
			return self::view( self::update( $run, array( 'status' => 'done' ) ), $w );
		}
		if ( 'review' === $step['type'] || ( 'page' === $step['type'] && ! self::has_decided_fields( $step ) ) ) {
			return self::view( self::update( $run, array( 'status' => 'waiting_input' ) ), $w );
		}
		if ( 'page' === $step['type'] && isset( $state['pages'][ $step['id'] ] ) ) {
			return self::view( self::update( $run, array( 'status' => 'waiting_input' ) ), $w );
		}
		return self::view( $run, $w );
	}

	/**
	 * A review's answer (runner.ts reviewStep).
	 *
	 * @param WP_REST_Request $request `id`, `step`, `{ type: accept, edits }` or `{ type: regenerate, target, note, items }`.
	 * @return WP_REST_Response
	 */
	public static function review( WP_REST_Request $request ) {
		$found = self::find( $request );
		if ( is_wp_error( $found ) ) {
			return self::respond( $found );
		}
		list( $run, $w ) = $found;
		$step_id         = (string) $request['step'];
		$step            = self::step_of( $w['definition'], $step_id );
		if ( ! in_array( $run['status'], array( 'waiting_input', 'done' ), true ) || $run['cursor_id'] !== $step_id || ! $step || 'review' !== $step['type'] ) {
			return self::respond( new WP_Error( 'engenty_conflict', __( 'Diese Seite ist nicht mehr aktuell.', 'engenty-wizards' ), array( 'status' => 409 ) ) );
		}
		$body  = (array) $request->get_json_params();
		$state = self::maps( $run['state'] );
		if ( 'regenerate' === ( $body['type'] ?? '' ) ) {
			$target = (string) ( $body['target'] ?? '' );
			if ( ! in_array( $target, (array) $step['show'], true ) ) {
				return self::respond( new WP_Error( 'engenty_conflict', __( 'Unbekanntes Ziel.', 'engenty-wizards' ), array( 'status' => 409 ) ) );
			}
			$note                      = mb_substr( sanitize_textarea_field( (string) ( $body['note'] ?? '' ) ), 0, 2000 );
			$state['notes'][ $target ] = '' !== $note ? $note : __( 'Bitte eine neue Variante.', 'engenty-wizards' );
			if ( ! empty( $body['items'] ) ) {
				$state['redo'][ $target ] = array_map( 'intval', (array) $body['items'] );
			} else {
				unset( $state['redo'][ $target ] );
			}
			$run = self::update(
				$run,
				array(
					'state'     => self::packed( $state ),
					'cursor_id' => $target,
					'status'    => 'running',
					'error'     => '',
				)
			);
			return self::respond( self::view( $run, $w ) );
		}
		foreach ( (array) ( $body['edits'] ?? array() ) as $target => $text ) {
			if ( ! empty( $step['edit'] ) && in_array( $target, (array) $step['show'], true ) && isset( $state['outputs'][ $target ] ) ) {
				$state['outputs'][ $target ]['text'] = mb_substr( (string) $text, 0, 50000 );
			}
		}
		$state['history'][] = $step_id;
		$cursor             = self::advance( $w['definition'], $step_id, $state );
		$run                = self::update(
			$run,
			array(
				'state'     => self::packed( $state ),
				'cursor_id' => (string) $cursor,
				'status'    => 'running',
				'error'     => '',
			)
		);
		return self::respond( self::settle( $run, $w ) );
	}

	/**
	 * Back to the interactive step before (runner.ts goBack).
	 *
	 * @param WP_REST_Request $request `id`.
	 * @return WP_REST_Response
	 */
	public static function back( WP_REST_Request $request ) {
		$found = self::find( $request );
		if ( is_wp_error( $found ) ) {
			return self::respond( $found );
		}
		list( $run, $w ) = $found;
		if ( ! in_array( $run['status'], array( 'waiting_input', 'done', 'failed' ), true ) ) {
			return self::respond( new WP_Error( 'engenty_conflict', __( 'Der Wizard arbeitet gerade.', 'engenty-wizards' ), array( 'status' => 409 ) ) );
		}
		$state    = self::maps( $run['state'] );
		$previous = array_pop( $state['history'] );
		if ( ! $previous ) {
			return self::respond( new WP_Error( 'engenty_conflict', __( 'Kein vorheriger Schritt.', 'engenty-wizards' ), array( 'status' => 409 ) ) );
		}
		unset( $state['deciding'] );
		$run = self::update(
			$run,
			array(
				'state'     => self::packed( $state ),
				'cursor_id' => $previous,
				'status'    => 'waiting_input',
				'error'     => '',
			)
		);
		return self::respond( self::view( $run, $w ) );
	}

	/**
	 * Once more after a failure (runner.ts retry).
	 *
	 * @param WP_REST_Request $request `id`.
	 * @return WP_REST_Response
	 */
	public static function retry( WP_REST_Request $request ) {
		$found = self::find( $request );
		if ( is_wp_error( $found ) ) {
			return self::respond( $found );
		}
		list( $run, $w ) = $found;
		if ( 'failed' !== $run['status'] ) {
			return self::respond( new WP_Error( 'engenty_conflict', __( 'Nichts zu wiederholen.', 'engenty-wizards' ), array( 'status' => 409 ) ) );
		}
		$run = self::update(
			$run,
			array(
				'status' => 'running',
				'error'  => '',
			)
		);
		return self::respond( self::view( $run, $w ) );
	}

	/**
	 * Cancels the run.
	 *
	 * @param WP_REST_Request $request `id`.
	 * @return WP_REST_Response
	 */
	public static function cancel( WP_REST_Request $request ) {
		$found = self::find( $request );
		if ( is_wp_error( $found ) ) {
			return self::respond( $found );
		}
		list( $run, $w ) = $found;
		return self::respond( self::view( self::update( $run, array( 'status' => 'cancelled' ) ), $w ) );
	}

	// --- files ------------------------------------------------------------------------------

	/**
	 * A picture the person gives: kept in the run's folder, 4 MB, images only.
	 *
	 * @param WP_REST_Request $request `id`, multipart `file`.
	 * @return WP_REST_Response
	 */
	public static function upload( WP_REST_Request $request ) {
		$found = self::find( $request );
		if ( is_wp_error( $found ) ) {
			return self::respond( $found );
		}
		list( $run ) = $found;
		$files       = $request->get_file_params();
		$file        = $files['file'] ?? null;
		if ( ! $file || ! is_uploaded_file( $file['tmp_name'] ?? '' ) ) {
			return self::respond( new WP_Error( 'engenty_input', __( 'Keine Datei.', 'engenty-wizards' ), array( 'status' => 400 ) ) );
		}
		if ( (int) $file['size'] > self::MAX_UPLOAD ) {
			return self::respond( new WP_Error( 'engenty_too_large', __( 'Die Datei ist größer als 4 MB.', 'engenty-wizards' ), array( 'status' => 413 ) ) );
		}
		$type = wp_check_filetype_and_ext( $file['tmp_name'], (string) $file['name'] );
		$mime = (string) ( $type['type'] ?? '' );
		if ( ! in_array( $mime, array( 'image/jpeg', 'image/png', 'image/webp', 'image/gif' ), true ) ) {
			return self::respond( new WP_Error( 'engenty_input', __( 'Hier gehen nur Fotos (JPEG, PNG, WebP).', 'engenty-wizards' ), array( 'status' => 415 ) ) );
		}
		$id  = 'a_' . strtolower( wp_generate_password( 12, false ) ) . '.' . $type['ext'];
		$dir = self::files_dir( $run['id'] );
		wp_mkdir_p( $dir );
		file_put_contents( $dir . '/index.html', '' ); // phpcs:ignore WordPress.WP.AlternativeFunctions.file_system_operations_file_put_contents -- no listing of the folder.
		$kept = self::keep_upload( $file, $dir, $id );
		if ( is_wp_error( $kept ) ) {
			return self::respond( $kept );
		}
		$name = sanitize_file_name( (string) $file['name'] );
		file_put_contents( // phpcs:ignore WordPress.WP.AlternativeFunctions.file_system_operations_file_put_contents -- the plugin's own folder under uploads.
			$dir . '/' . $id . '.json',
			wp_json_encode(
				array(
					'name' => $name,
					'mime' => $mime,
				)
			)
		); // phpcs:ignore WordPress.WP.AlternativeFunctions.file_system_operations_file_put_contents -- beside the file.
		return self::respond(
			array(
				'id'   => $id,
				'kind' => 'image',
				'mime' => $mime,
				'name' => $name,
			)
		);
	}

	/**
	 * Where an asset of a run is, or null.
	 *
	 * @param string $run_id   The run.
	 * @param string $asset_id The asset.
	 * @return string|null
	 */
	public static function asset_path( $run_id, $asset_id ) {
		if ( ! preg_match( '/^[A-Za-z0-9_-]+(\.[A-Za-z0-9]+)?$/', $asset_id ) ) {
			return null;
		}
		$path = self::files_dir( $run_id ) . '/' . $asset_id;
		return file_exists( $path ) ? $path : null;
	}

	/**
	 * What an asset is, as kept beside it.
	 *
	 * @param string $run_id   The run.
	 * @param string $asset_id The asset.
	 * @return array `{ name, mime }`.
	 */
	public static function asset_meta( $run_id, $asset_id ) {
		$meta = self::files_dir( $run_id ) . '/' . $asset_id . '.json';
		$data = file_exists( $meta ) ? json_decode( (string) file_get_contents( $meta ), true ) : null; // phpcs:ignore WordPress.WP.AlternativeFunctions.file_get_contents_file_get_contents -- beside the file.
		return is_array( $data ) ? $data : array(
			'name' => $asset_id,
			'mime' => Engenty_Packages::mime_or( wp_check_filetype( $asset_id )['type'] ),
		);
	}

	/**
	 * Serves an asset of the run: a picture the person gave, a document a step wrote.
	 *
	 * @param WP_REST_Request $request `id`, `asset`.
	 */
	public static function asset( WP_REST_Request $request ) {
		$found = self::find( $request );
		if ( is_wp_error( $found ) ) {
			return self::respond( $found );
		}
		list( $run ) = $found;
		$path        = self::asset_path( $run['id'], (string) $request['asset'] );
		if ( ! $path ) {
			return self::respond( new WP_Error( 'engenty_not_found', __( 'Diese Datei gibt es nicht.', 'engenty-wizards' ), array( 'status' => 404 ) ) );
		}
		$meta = self::asset_meta( $run['id'], (string) $request['asset'] );
		self::send_file( $path, $meta['mime'], $meta['name'], 'text/html' !== $meta['mime'] );
	}

	/**
	 * Writes a file to the browser and ends the request.
	 *
	 * @param string $path     The file.
	 * @param string $mime     Its type.
	 * @param string $name     Its name.
	 * @param bool   $inline   Shown in the page rather than saved.
	 */
	private static function send_file( $path, $mime, $name, $inline ) {
		nocache_headers();
		header( 'Content-Type: ' . $mime );
		header( 'Content-Length: ' . (string) filesize( $path ) );
		header( 'Content-Disposition: ' . ( $inline ? 'inline' : 'attachment' ) . '; filename="' . rawurlencode( $name ) . '"' );
		if ( 'text/html' === $mime ) {
			// A document a model wrote: shown in a frame that runs nothing but its own scripts.
			header( 'Content-Security-Policy: default-src \'none\'; img-src * data: blob:; style-src \'unsafe-inline\'; script-src \'unsafe-inline\'; font-src * data:' );
		}
		readfile( $path ); // phpcs:ignore WordPress.WP.AlternativeFunctions.file_system_operations_readfile -- the plugin's own folder under uploads.
		exit;
	}

	/**
	 * Writes a text as a download and ends the request.
	 *
	 * @param string $text The content.
	 * @param string $mime Its type.
	 * @param string $name Its name.
	 */
	public static function send_text( $text, $mime, $name ) {
		nocache_headers();
		header( 'Content-Type: ' . $mime . '; charset=utf-8' );
		header( 'Content-Disposition: attachment; filename="' . rawurlencode( $name ) . '"' );
		echo $text; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- a file the person downloads.
		exit;
	}

	/**
	 * A step's output as a file: html, md, txt, csv, json (class-downloads.php).
	 *
	 * @param WP_REST_Request $request `id`, `step`, `format`.
	 */
	public static function download( WP_REST_Request $request ) {
		$found = self::find( $request );
		if ( is_wp_error( $found ) ) {
			return self::respond( $found );
		}
		list( $run, $w ) = $found;
		$step            = self::step_of( $w['definition'], (string) $request['step'] );
		$state           = self::maps( $run['state'] );
		$output          = $step ? ( $state['outputs'][ $step['id'] ] ?? null ) : null;
		if ( ! $step || ! $output ) {
			return self::respond( new WP_Error( 'engenty_not_found', __( 'Dieses Ergebnis gibt es nicht.', 'engenty-wizards' ), array( 'status' => 404 ) ) );
		}
		$format = sanitize_key( (string) $request->get_param( 'format' ) );
		$file   = Engenty_Downloads::make( $run, $w, $step, $output, $format );
		if ( is_wp_error( $file ) ) {
			return self::respond( $file );
		}
		if ( isset( $file['path'] ) ) {
			self::send_file( $file['path'], $file['mime'], $file['name'], false );
		}
		self::send_text( $file['text'], $file['mime'], $file['name'] );
	}

	// --- the flow (definition.ts, ported) -------------------------------------------------

	/**
	 * A step by id.
	 *
	 * @param array  $def The definition.
	 * @param string $id  The id.
	 * @return array|null
	 */
	public static function step_of( array $def, $id ) {
		foreach ( $def['steps'] as $step ) {
			if ( $step['id'] === $id ) {
				return $step;
			}
		}
		return null;
	}

	/**
	 * The index of a step in the list, or -1.
	 *
	 * @param array  $def The definition.
	 * @param string $id  The id.
	 * @return int
	 */
	private static function index_of( array $def, $id ) {
		foreach ( $def['steps'] as $i => $step ) {
			if ( $step['id'] === $id ) {
				return $i;
			}
		}
		return -1;
	}

	/**
	 * Whether a page has fields a decision shows (definition.ts isDecidedField).
	 *
	 * @param array $step The page.
	 * @return bool
	 */
	public static function has_decided_fields( array $step ) {
		foreach ( (array) ( $step['fields'] ?? array() ) as $f ) {
			if ( ! empty( $f['ask'] ) || ! empty( $f['group'] ) ) {
				return true;
			}
		}
		return false;
	}

	/**
	 * What branch rules read (definition.ts branchValues): answers by id, outputs as `steps.<id>.<key>`.
	 *
	 * @param array $state The state.
	 * @return array
	 */
	public static function branch_values( array $state ) {
		$out = (array) $state['values'];
		foreach ( (array) $state['outputs'] as $step_id => $output ) {
			$json = $output['json'] ?? null;
			if ( is_array( $json ) && ! array_is_list( $json ) ) {
				foreach ( $json as $key => $value ) {
					$out[ "steps.{$step_id}.{$key}" ] = $value;
				}
			}
			foreach ( (array) ( $output['decided'] ?? array() ) as $key => $p ) {
				$out[ "steps.{$step_id}.{$key}.p" ] = $p;
			}
		}
		return $out;
	}

	/**
	 * The conditions of a rule or a field, as a list (definition.ts conditionsOf).
	 *
	 * @param mixed $when One, several, or none.
	 * @return array
	 */
	public static function conditions_of( $when ) {
		if ( null === $when ) {
			return array();
		}
		return is_array( $when ) && array_is_list( $when ) ? $when : array( $when );
	}

	/**
	 * A typed number as a number (definition.ts numberOf): "89,90" counts as 89.9.
	 *
	 * @param mixed $v The value.
	 * @return float|null
	 */
	private static function number_of( $v ) {
		if ( is_int( $v ) || is_float( $v ) ) {
			return is_finite( (float) $v ) ? (float) $v : null;
		}
		if ( ! is_string( $v ) || '' === trim( $v ) ) {
			return null;
		}
		$n = str_replace( ',', '.', preg_replace( '/\s/', '', $v ) );
		return is_numeric( $n ) ? (float) $n : null;
	}

	/**
	 * Whether a value is empty (definition.ts isEmptyValue).
	 *
	 * @param mixed $v The value.
	 * @return bool
	 */
	public static function is_empty_value( $v ) {
		return null === $v || '' === $v || ( is_array( $v ) && empty( $v ) );
	}

	/**
	 * A value as a string, as JavaScript's String() does for what a condition compares.
	 *
	 * @param mixed $v The value.
	 * @return string
	 */
	private static function as_string( $v ) {
		if ( true === $v ) {
			return 'true';
		}
		if ( false === $v ) {
			return 'false';
		}
		if ( null === $v ) {
			return 'undefined';
		}
		if ( is_array( $v ) ) {
			return implode( ',', array_map( array( __CLASS__, 'as_string' ), $v ) );
		}
		return (string) $v;
	}

	/**
	 * Whether a condition holds (definition.ts conditionMatches).
	 *
	 * @param array $c      The condition.
	 * @param array $values What it reads.
	 * @return bool
	 */
	public static function condition_matches( array $c, array $values ) {
		$v     = $values[ $c['field'] ] ?? null;
		$value = $c['value'] ?? null;
		switch ( $c['op'] ) {
			case 'empty':
				return self::is_empty_value( $v );
			case 'notEmpty':
				return ! self::is_empty_value( $v );
			case 'equals':
				return self::as_string( $v ) === self::as_string( $value );
			case 'notEquals':
				return self::as_string( $v ) !== self::as_string( $value );
			case 'in':
				return is_array( $value ) && in_array( self::as_string( $v ), array_map( array( __CLASS__, 'as_string' ), $value ), true );
			case 'gt':
			case 'lt':
				$a = self::number_of( $v );
				$b = self::number_of( $value );
				return null !== $a && null !== $b && ( 'gt' === $c['op'] ? $a > $b : $a < $b );
			case 'contains':
				if ( is_array( $v ) ) {
					return in_array( self::as_string( $value ), array_map( array( __CLASS__, 'as_string' ), $v ), true );
				}
				return is_string( $v ) && null !== $value && false !== mb_stripos( $v, self::as_string( $value ) );
		}
		return false;
	}

	/**
	 * Whether every condition holds (definition.ts whenHolds).
	 *
	 * @param mixed $when   The conditions.
	 * @param array $values What they read.
	 * @return bool
	 */
	public static function when_holds( $when, array $values ) {
		foreach ( self::conditions_of( $when ) as $c ) {
			if ( ! self::condition_matches( $c, $values ) ) {
				return false;
			}
		}
		return true;
	}

	/**
	 * A rule with neither condition nor statement (definition.ts isOtherwise).
	 *
	 * @param array $rule The rule.
	 * @return bool
	 */
	private static function is_otherwise( array $rule ) {
		return ! isset( $rule['when'] ) && ! isset( $rule['ask'] );
	}

	/**
	 * Whether a rule may still send the run on (definition.ts ruleOpen).
	 *
	 * @param array  $def     The definition.
	 * @param string $step_id The step.
	 * @param array  $rule    The rule.
	 * @param array  $loops   How often each branch was taken.
	 * @return bool
	 */
	private static function rule_open( array $def, $step_id, array $rule, array $loops ) {
		$from = self::index_of( $def, $step_id );
		$to   = 'end' === $rule['goto'] ? count( $def['steps'] ) : self::index_of( $def, $rule['goto'] );
		$max  = $rule['max'] ?? ( $to >= 0 && $to <= $from ? self::DEFAULT_LOOP_MAX : PHP_INT_MAX );
		return (int) ( $loops[ $step_id . '→' . $rule['goto'] ] ?? 0 ) < (int) $max;
	}

	/**
	 * Where a step goes when none of its rules holds (definition.ts otherwiseOf).
	 *
	 * @param array  $def     The definition.
	 * @param string $step_id The step.
	 * @param array  $loops   How often each branch was taken.
	 * @return array `[ cursor, rule ]`.
	 */
	private static function otherwise_of( array $def, $step_id, array $loops ) {
		$index = self::index_of( $def, $step_id );
		$rules = (array) ( $def['steps'][ $index ]['next'] ?? array() );
		foreach ( $rules as $i => $r ) {
			if ( self::is_otherwise( $r ) && self::rule_open( $def, $step_id, $r, $loops ) ) {
				return array( 'end' === $r['goto'] ? null : $r['goto'], $i );
			}
		}
		return array( $def['steps'][ $index + 1 ]['id'] ?? null, null );
	}

	/**
	 * Where a run goes after a step (definition.ts followRules): the first open `when` rule that
	 * holds, else a decision over the open `ask` rules, else the next step.
	 *
	 * @param array  $def     The definition.
	 * @param string $step_id The step.
	 * @param array  $values  What rules read.
	 * @param array  $loops   How often each branch was taken.
	 * @return array `{ kind: go, cursor, rule }` or `{ kind: decide, rules }`.
	 */
	public static function follow_rules( array $def, $step_id, array $values, array $loops ) {
		$step = self::step_of( $def, $step_id );
		if ( ! $step ) {
			return array(
				'kind'   => 'go',
				'cursor' => null,
				'rule'   => null,
			);
		}
		$rules = (array) ( $step['next'] ?? array() );
		foreach ( $rules as $i => $rule ) {
			if ( isset( $rule['when'] ) && self::rule_open( $def, $step_id, $rule, $loops ) && self::when_holds( $rule['when'], $values ) ) {
				return array(
					'kind'   => 'go',
					'cursor' => 'end' === $rule['goto'] ? null : $rule['goto'],
					'rule'   => $i,
				);
			}
		}
		$asks = array();
		foreach ( $rules as $i => $rule ) {
			if ( ! empty( $rule['ask'] ) && self::rule_open( $def, $step_id, $rule, $loops ) ) {
				$asks[] = $i;
			}
		}
		if ( $asks ) {
			return array(
				'kind'  => 'decide',
				'rules' => $asks,
			);
		}
		list( $cursor, $rule ) = self::otherwise_of( $def, $step_id, $loops );
		return array(
			'kind'   => 'go',
			'cursor' => $cursor,
			'rule'   => $rule,
		);
	}

	/**
	 * Counts a branch taken and gives the cursor (runner.ts taken).
	 *
	 * @param array    $def     The definition.
	 * @param string   $step_id The step.
	 * @param int|null $rule    The rule's index, or null.
	 * @param mixed    $cursor  Where it goes.
	 * @param array    $state   The state, changed in place.
	 * @return string|null
	 */
	public static function taken( array $def, $step_id, $rule, $cursor, array &$state ) {
		if ( null !== $rule ) {
			$step = self::step_of( $def, $step_id );
			$goto = $step['next'][ $rule ]['goto'] ?? null;
			if ( $goto ) {
				$key                    = $step_id . '→' . $goto;
				$state['loops'][ $key ] = (int) ( $state['loops'][ $key ] ?? 0 ) + 1;
			}
		}
		return $cursor;
	}

	/**
	 * Where the run goes after `step_id` (runner.ts advance): a rule at once, or a decision the
	 * next request makes (`deciding`).
	 *
	 * @param array  $def     The definition.
	 * @param string $step_id The step.
	 * @param array  $state   The state, changed in place.
	 * @return string|null
	 */
	public static function advance( array $def, $step_id, array &$state ) {
		$outcome = self::follow_rules( $def, $step_id, self::branch_values( $state ), (array) $state['loops'] );
		if ( 'decide' === $outcome['kind'] ) {
			$state['deciding'] = $step_id;
			return $step_id;
		}
		return self::taken( $def, $step_id, $outcome['rule'], $outcome['cursor'], $state );
	}

	// --- closed choices (fit.ts, ported) --------------------------------------------------

	/**
	 * Where step `i` goes when none of its rules holds, as an index; the count = the end
	 * (fit.ts otherwiseIndex).
	 *
	 * @param array $def   The definition.
	 * @param int   $i     The step's index.
	 * @param array $index Step id → index.
	 * @return int
	 */
	private static function otherwise_index( array $def, $i, array $index ) {
		foreach ( (array) ( $def['steps'][ $i ]['next'] ?? array() ) as $rule ) {
			if ( self::is_otherwise( $rule ) ) {
				return 'end' === $rule['goto'] ? count( $def['steps'] ) : ( $index[ $rule['goto'] ] ?? $i + 1 );
			}
		}
		return $i + 1;
	}

	/**
	 * The steps every path from `from` to the end passes through (fit.ts unavoidableFrom). A rule
	 * on an answer in `known` goes one way; a rule on anything else may go either way.
	 *
	 * @param array  $def   The definition.
	 * @param string $from  The step to start from.
	 * @param array  $known The answers given.
	 * @return array Step ids.
	 */
	public static function unavoidable_from( array $def, $from, array $known ) {
		$index = array();
		foreach ( $def['steps'] as $i => $s ) {
			$index[ $s['id'] ] = $i;
		}
		$count       = count( $def['steps'] );
		$start       = $index[ $from ] ?? 0;
		$successors  = static function ( $i ) use ( $def, $index, $count, $known ) {
			$out = array();
			foreach ( (array) ( $def['steps'][ $i ]['next'] ?? array() ) as $rule ) {
				if ( self::is_otherwise( $rule ) ) {
					continue;
				}
				$target  = 'end' === $rule['goto'] ? $count : ( $index[ $rule['goto'] ] ?? -1 );
				$decided = true;
				foreach ( self::conditions_of( $rule['when'] ?? null ) as $c ) {
					if ( ! array_key_exists( $c['field'], $known ) ) {
						$decided = false;
					}
				}
				if ( ! empty( $rule['ask'] ) || ! $decided ) {
					if ( $target >= 0 ) {
						$out[] = $target;
					}
					continue;
				}
				if ( self::when_holds( $rule['when'] ?? null, $known ) ) {
					// The first rule that matches decides; nothing after it is tried.
					if ( $target >= 0 ) {
						$out[] = $target;
					}
					return $out;
				}
			}
			// No rule matching goes on to the "otherwise" step, else the next (or ends after the last).
			$out[] = self::otherwise_index( $def, $i, $index );
			return $out;
		};
		$reaches_end = static function ( $without ) use ( $start, $count, $successors ) {
			if ( $without === $start ) {
				return false;
			}
			$seen  = array( $start => true );
			$queue = array( $start );
			while ( $queue ) {
				$i = array_shift( $queue );
				if ( $i >= $count ) {
					return true;
				}
				foreach ( $successors( $i ) as $j ) {
					if ( $j !== $without && ! isset( $seen[ $j ] ) ) {
						$seen[ $j ] = true;
						$queue[]    = $j;
					}
				}
			}
			return false;
		};
		$out         = array();
		foreach ( $def['steps'] as $i => $s ) {
			if ( ! $reaches_end( $i ) ) {
				$out[] = $s['id'];
			}
		}
		return $out;
	}

	/**
	 * The choices a page offers (fit.ts choicesOf): each select's options, a toggle's on and off.
	 *
	 * @param array $step The page.
	 * @return array `[{ field, values }]`.
	 */
	private static function choices_of( array $step ) {
		$out = array();
		foreach ( (array) $step['fields'] as $f ) {
			if ( 'select' === $f['kind'] && ! empty( $f['options'] ) ) {
				$out[] = array(
					'field'  => $f['id'],
					'values' => array_values( (array) $f['options'] ),
				);
			} elseif ( 'toggle' === $f['kind'] ) {
				$out[] = array(
					'field'  => $f['id'],
					'values' => array( true, false ),
				);
			}
		}
		return $out;
	}

	/**
	 * What a need is called where a visitor reads that it is missing (the runner's class groups):
	 * what a model would do, or the account behind everything else.
	 *
	 * @param string $need A need (fit.ts Need).
	 * @return string audio | image | video | speech | account.
	 */
	public static function need_group( $need ) {
		if ( 'field:audio' === $need ) {
			return 'audio';
		}
		if ( in_array( $need, array( 'tool:image', 'asset:image' ), true ) ) {
			return 'image';
		}
		if ( in_array( $need, array( 'asset:video', 'film', 'widget:video' ), true ) ) {
			return 'video';
		}
		if ( in_array( $need, array( 'asset:voice', 'asset:speech' ), true ) ) {
			return 'speech';
		}
		return 'account';
	}

	/**
	 * What each step lacks here, from the check made when the wizard was installed: its hard
	 * needs as groups. Reading the web and calling an API are not lacking where the site's
	 * abilities do it.
	 *
	 * @param array $w The wizard.
	 * @return callable Step → groups.
	 */
	public static function lacking_of( array $w ) {
		$runs_here = Engenty_Think::abilities_on();
		$hard      = array();
		foreach ( (array) ( $w['notes']['notes'] ?? array() ) as $n ) {
			if ( empty( $n['hard'] ) || ! isset( $n['stepId'], $n['need'] ) ) {
				continue;
			}
			if ( $runs_here && in_array( $n['need'], array( 'tool:web_fetch', 'tool:http' ), true ) ) {
				continue;
			}
			$hard[ $n['stepId'] ][] = self::need_group( (string) $n['need'] );
		}
		return static function ( array $step ) use ( $hard ) {
			return array_values( array_unique( $hard[ $step['id'] ] ?? array() ) );
		};
	}

	/**
	 * The answers on a page that lead to a step this site cannot run (fit.ts closedChoicesFor):
	 * with them the run would stop there. The answers given already count; the page's other
	 * fields may still go either way. A choice whose every value leads there is left open: the
	 * run cannot go around it, and the start already warned. A voice note is closed as a whole:
	 * nothing here listens.
	 *
	 * @param array    $def     The definition.
	 * @param array    $step    The page.
	 * @param array    $values  The answers so far.
	 * @param callable $lacking Step → groups it lacks.
	 * @return array Field → `{ values, classes }`.
	 */
	public static function closed_choices( array $def, array $step, array $values, $lacking ) {
		$ids = array();
		foreach ( (array) $step['fields'] as $f ) {
			$ids[ $f['id'] ] = true;
		}
		$known = array_diff_key( $values, $ids );
		$out   = array();
		foreach ( (array) $step['fields'] as $f ) {
			if ( 'audio' === $f['kind'] ) {
				$out[ $f['id'] ] = array(
					'values'  => array(),
					'classes' => array( 'audio' ),
				);
			}
		}
		foreach ( self::choices_of( $step ) as $choice ) {
			$closed = array(
				'values'  => array(),
				'classes' => array(),
			);
			foreach ( $choice['values'] as $value ) {
				$ahead   = self::unavoidable_from( $def, $step['id'], array_merge( $known, array( $choice['field'] => $value ) ) );
				$missing = array();
				foreach ( $ahead as $id ) {
					$s = self::step_of( $def, $id );
					if ( $s ) {
						$missing = array_merge( $missing, (array) $lacking( $s ) );
					}
				}
				if ( $missing ) {
					$closed['values'][] = $value;
					$closed['classes']  = array_values( array_unique( array_merge( $closed['classes'], $missing ) ) );
				}
			}
			if ( $closed['values'] && count( $closed['values'] ) < count( $choice['values'] ) ) {
				$out[ $choice['field'] ] = $closed;
			}
		}
		return $out;
	}

	/**
	 * The answer a closed choice gets instead (fit.ts openValue): its first value that stays open.
	 *
	 * @param array  $step   The page.
	 * @param string $field  The field.
	 * @param array  $closed Its closed choice.
	 * @return mixed
	 */
	private static function open_value( array $step, $field, array $closed ) {
		$shut = array_map( array( __CLASS__, 'as_string' ), $closed['values'] );
		foreach ( self::choices_of( $step ) as $choice ) {
			if ( $choice['field'] !== $field ) {
				continue;
			}
			foreach ( $choice['values'] as $v ) {
				if ( ! in_array( self::as_string( $v ), $shut, true ) ) {
					return $v;
				}
			}
		}
		return null;
	}

	// --- pages (input.ts, ported) ---------------------------------------------------------

	/**
	 * The fields of a page that are shown (definition.ts shownFields): a hidden field's value
	 * does not count for the fields after it.
	 *
	 * @param array $fields The fields.
	 * @param array $known  What was known before the page.
	 * @param array $page   What the page holds so far.
	 * @return array
	 */
	public static function shown_fields( array $fields, array $known, array $page ) {
		$values = array_merge( $known, $page );
		$out    = array();
		foreach ( $fields as $field ) {
			if ( self::when_holds( $field['when'] ?? null, $values ) ) {
				$out[] = $field;
			} else {
				unset( $values[ $field['id'] ] );
			}
		}
		return $out;
	}

	/**
	 * What a page knows besides the person's input (runner.ts pageContext): what its fields'
	 * `when` read from before, the choices from earlier data, the decided fields kept.
	 *
	 * @param array $def   The definition.
	 * @param array $state The state.
	 * @param array $step  The page.
	 * @return array `{ known, options, decided }`.
	 */
	public static function page_context( array $def, array $state, array $step ) {
		$own   = array();
		$needs = array();
		foreach ( $step['fields'] as $f ) {
			$own[ $f['id'] ] = true;
		}
		foreach ( $step['fields'] as $f ) {
			foreach ( self::conditions_of( $f['when'] ?? null ) as $c ) {
				if ( ! isset( $own[ $c['field'] ] ) ) {
					$needs[ $c['field'] ] = true;
				}
			}
		}
		$all   = self::branch_values( $state );
		$known = array();
		foreach ( array_keys( $needs ) as $ref ) {
			$known[ $ref ] = $all[ $ref ] ?? null;
		}
		$options = array();
		foreach ( $step['fields'] as $f ) {
			if ( ! empty( $f['optionsFrom'] ) ) {
				$found = self::options_from_data( (string) $f['optionsFrom'], (array) $state['outputs'] );
				if ( $found ) {
					$options[ $f['id'] ] = $found;
				}
			}
		}
		$decided = self::has_decided_fields( $step ) ? (array) ( $state['pages'][ $step['id'] ]['shown'] ?? array() ) : array();
		return array(
			'known'   => $known,
			'options' => $options,
			'decided' => $decided,
		);
	}

	/**
	 * The choices an `optionsFrom` reference finds (definition.ts optionsFromData): a list
	 * output or one column of a table output; stored lists do not exist here.
	 *
	 * @param string $ref     The reference.
	 * @param array  $outputs The outputs.
	 * @return array
	 */
	public static function options_from_data( $ref, array $outputs ) {
		$ref   = trim( preg_replace( '/^\{\{\s*|\s*\}\}$/', '', $ref ) );
		$parts = explode( '.', $ref );
		if ( 'steps' !== ( $parts[0] ?? '' ) || count( $parts ) < 3 || count( $parts ) > 4 ) {
			return array();
		}
		$json  = $outputs[ $parts[1] ]['json'] ?? null;
		$value = is_array( $json ) ? ( $json[ $parts[2] ] ?? null ) : null;
		if ( ! is_array( $value ) ) {
			return array();
		}
		$column = $parts[3] ?? null;
		$seen   = array();
		foreach ( $value as $row ) {
			$v = $column ? ( is_array( $row ) ? ( $row[ $column ] ?? null ) : null ) : $row;
			if ( null === $v || is_array( $v ) ) {
				continue;
			}
			$text = mb_substr( trim( (string) $v ), 0, 200 );
			if ( '' !== $text ) {
				$seen[ $text ] = true;
			}
			if ( count( $seen ) >= 100 ) {
				break;
			}
		}
		return array_keys( $seen );
	}

	/**
	 * A value typed by its field (input.ts coerce).
	 *
	 * @param array $field The field.
	 * @param mixed $raw   What the browser sent.
	 * @return mixed
	 */
	private static function coerce( array $field, $raw ) {
		if ( null === $raw ) {
			return null;
		}
		switch ( $field['kind'] ) {
			case 'number':
				if ( '' === $raw ) {
					return null;
				}
				$n = str_replace( ',', '.', (string) $raw );
				return is_numeric( $n ) ? (float) $n : NAN;
			case 'toggle':
				return true === $raw || 'true' === $raw || 'on' === $raw;
			case 'multiselect':
				$list = is_array( $raw ) ? $raw : array( $raw );
				return array_values(
					array_filter(
						array_map( 'strval', $list ),
						static function ( $v ) use ( $field ) {
							return in_array( $v, (array) ( $field['options'] ?? array() ), true );
						}
					)
				);
			case 'slot':
				$v = trim( (string) $raw );
				return '' !== $v ? $v : null;
			case 'image':
			case 'file':
				$ids = array_values( array_filter( array_map( 'strval', is_array( $raw ) ? $raw : array( $raw ) ) ) );
				$ids = array_slice( $ids, 0, 30 );
				if ( ! $ids ) {
					return null;
				}
				return ! empty( $field['multiple'] ) ? $ids : $ids[0];
			case 'signature':
				return is_string( $raw ) && '' !== $raw ? substr( $raw, 0, 64 ) : null;
			case 'location':
				if ( is_string( $raw ) ) {
					$label = mb_substr( trim( $raw ), 0, 300 );
					return '' !== $label ? array( 'label' => $label ) : null;
				}
				if ( ! is_array( $raw ) ) {
					return null;
				}
				$out = array();
				$lat = is_numeric( $raw['lat'] ?? null ) ? (float) $raw['lat'] : null;
				$lng = is_numeric( $raw['lng'] ?? null ) ? (float) $raw['lng'] : null;
				if ( null !== $lat && null !== $lng && abs( $lat ) <= 90 && abs( $lng ) <= 180 ) {
					$out['lat'] = round( $lat, 6 );
					$out['lng'] = round( $lng, 6 );
					if ( is_numeric( $raw['accuracy'] ?? null ) && (float) $raw['accuracy'] >= 0 ) {
						$out['accuracy'] = (int) round( (float) $raw['accuracy'] );
					}
				}
				$label = is_string( $raw['label'] ?? null ) ? mb_substr( trim( $raw['label'] ), 0, 300 ) : '';
				if ( '' !== $label ) {
					$out['label'] = $label;
				}
				return isset( $out['lat'] ) || isset( $out['label'] ) ? $out : null;
			case 'audio':
			case 'connection':
			case 'list':
				return null;
			case 'items':
				if ( ! is_array( $raw ) ) {
					return array();
				}
				$rows = array();
				foreach ( array_slice( $raw, 0, 200 ) as $r ) {
					if ( ! is_array( $r ) ) {
						continue;
					}
					$row = array();
					foreach ( (array) ( $field['columns'] ?? array() ) as $c ) {
						$v = $r[ $c['id'] ] ?? null;
						if ( 'text' === $c['kind'] ) {
							$row[ $c['id'] ] = mb_substr( (string) ( $v ?? '' ), 0, 2000 );
						} else {
							$n               = str_replace( ',', '.', (string) ( $v ?? '' ) );
							$row[ $c['id'] ] = is_numeric( $n ) ? (float) $n : 0;
						}
					}
					foreach ( $row as $v ) {
						if ( '' !== $v && 0 !== $v && 0.0 !== $v ) {
							$rows[] = $row;
							break;
						}
					}
				}
				return $rows;
			default:
				return mb_substr( (string) ( is_array( $raw ) ? '' : $raw ), 0, 20000 );
		}
	}

	/**
	 * Keep only this page's fields that are shown, typed; report what is missing or wrong
	 * (input.ts readPageInput).
	 *
	 * @param array $step    The page.
	 * @param array $input   What the browser sent.
	 * @param array $context `{ known, options, decided }`.
	 * @return array `{ values, errors }`.
	 */
	public static function read_page_input( array $step, array $input, array $context ) {
		$values = array();
		$errors = array();
		$fields = array();
		foreach ( $step['fields'] as $f ) {
			$decided = ! empty( $f['ask'] ) || ! empty( $f['group'] );
			if ( $decided && ! in_array( $f['id'], (array) $context['decided'], true ) ) {
				continue;
			}
			if ( ! empty( $context['options'][ $f['id'] ] ) ) {
				$f['options'] = $context['options'][ $f['id'] ];
			}
			$fields[] = $f;
		}
		$typed = array();
		foreach ( $fields as $f ) {
			$typed[ $f['id'] ] = self::coerce( $f, $input[ $f['id'] ] ?? null );
		}
		foreach ( self::shown_fields( $fields, (array) $context['known'], $typed ) as $field ) {
			$v = $typed[ $field['id'] ];
			if ( in_array( $field['kind'], array( 'connection', 'list' ), true ) ) {
				continue;
			}
			if ( ! empty( $field['required'] ) && self::is_empty_value( $v ) && 'toggle' !== $field['kind'] ) {
				$errors[] = array(
					'field'   => $field['id'],
					'message' => __( 'Pflichtfeld', 'engenty-wizards' ),
				);
				continue;
			}
			if ( is_array( $v ) && in_array( $field['kind'], array( 'image', 'file' ), true ) ) {
				if ( ! empty( $field['min'] ) && count( $v ) < (int) $field['min'] ) {
					$errors[] = array(
						'field'   => $field['id'],
						'message' => sprintf( /* translators: %d: files */ __( 'Bitte mindestens %d auswählen', 'engenty-wizards' ), (int) $field['min'] ),
					);
					continue;
				}
				if ( ! empty( $field['max'] ) && count( $v ) > (int) $field['max'] ) {
					$errors[] = array(
						'field'   => $field['id'],
						'message' => sprintf( /* translators: %d: files */ __( 'Höchstens %d – bitte einige entfernen', 'engenty-wizards' ), (int) $field['max'] ),
					);
					continue;
				}
			}
			if ( 'number' === $field['kind'] && is_float( $v ) && is_nan( $v ) ) {
				$errors[] = array(
					'field'   => $field['id'],
					'message' => __( 'Bitte eine Zahl eingeben', 'engenty-wizards' ),
				);
				continue;
			}
			if ( 'select' === $field['kind'] && ! self::is_empty_value( $v ) && ! in_array( (string) $v, (array) ( $field['options'] ?? array() ), true ) ) {
				$errors[] = array(
					'field'   => $field['id'],
					'message' => __( 'Ungültige Auswahl', 'engenty-wizards' ),
				);
				continue;
			}
			if ( 'slot' === $field['kind'] && ! self::is_empty_value( $v ) && ! in_array( (string) $v, (array) ( $field['options'] ?? array() ), true ) ) {
				$errors[] = array(
					'field'   => $field['id'],
					'message' => __( 'Dieser Termin wird nicht angeboten', 'engenty-wizards' ),
				);
				continue;
			}
			if ( 'email' === $field['kind'] && ! self::is_empty_value( $v ) && ! is_email( (string) $v ) ) {
				$errors[] = array(
					'field'   => $field['id'],
					'message' => __( 'Keine gültige E-Mail-Adresse', 'engenty-wizards' ),
				);
				continue;
			}
			if ( 'url' === $field['kind'] && ! self::is_empty_value( $v ) && ! wp_http_validate_url( (string) $v ) && ! filter_var( (string) $v, FILTER_VALIDATE_URL ) ) {
				$errors[] = array(
					'field'   => $field['id'],
					'message' => __( 'Keine gültige URL', 'engenty-wizards' ),
				);
				continue;
			}
			if ( null !== $v ) {
				$values[ $field['id'] ] = $v;
			}
		}
		return array(
			'values' => $values,
			'errors' => $errors,
		);
	}

	// --- the view (runner.ts runView) -----------------------------------------------------

	/**
	 * The formats a step's output can be downloaded in here: what the result step asks for,
	 * of what PHP can make (definition.ts formatsFor, narrowed).
	 *
	 * @param array      $step   The step.
	 * @param array|null $wanted The deliverable's formats.
	 * @return array
	 */
	public static function available_formats( array $step, $wanted ) {
		switch ( $step['type'] ) {
			case 'agent':
				$possible = 'json' === ( $step['output']['format'] ?? 'markdown' ) ? array( 'json', 'csv', 'md' ) : array( 'md', 'txt', 'html' );
				break;
			case 'generate':
				$possible = in_array( $step['asset'] ?? '', array( 'document', 'dashboard' ), true ) ? array( 'html' ) : array();
				break;
			case 'surface':
				$possible = array( 'json' );
				break;
			default:
				$possible = array();
		}
		if ( null === $wanted ) {
			return $possible;
		}
		$formats = array_values( array_intersect( $wanted, $possible ) );
		// A PDF or Word file asked of a written output: the HTML stands in, the browser prints it.
		if ( ! $formats && in_array( 'html', $possible, true ) && array_intersect( $wanted, array( 'pdf', 'docx' ) ) ) {
			$formats[] = 'html';
		}
		return $formats;
	}

	/**
	 * What the page's fields start with (runner.ts prefillOf): an earlier step's result.
	 *
	 * @param array $def    The definition.
	 * @param array $state  The state.
	 * @param array $step  The page.
	 * @param array $closed The page's closed choices: a closed start value gives way to an open one.
	 * @return array
	 */
	private static function prefill_of( array $def, array $state, array $step, array $closed = array() ) {
		$out = array();
		foreach ( $step['fields'] as $field ) {
			if ( empty( $field['prefill'] ) ) {
				continue;
			}
			$value = Engenty_Think::resolve_ref( trim( preg_replace( '/^\{\{\s*|\s*\}\}$/', '', (string) $field['prefill'] ) ), $def, $state, array() );
			if ( null !== $value && '' !== $value ) {
				$out[ $field['id'] ] = $value;
			}
		}
		// A closed choice starts on a value that stays open, not on one the site refuses.
		foreach ( $closed as $id => $choice ) {
			$field = null;
			foreach ( $step['fields'] as $f ) {
				if ( $f['id'] === $id ) {
					$field = $f;
				}
			}
			if ( ! $field ) {
				continue;
			}
			$start = $out[ $id ] ?? ( $field['default'] ?? ( 'toggle' === $field['kind'] ? false : null ) );
			if ( null !== $start && in_array( self::as_string( $start ), array_map( array( __CLASS__, 'as_string' ), $choice['values'] ), true ) ) {
				$out[ $id ] = self::open_value( $step, $id, $choice );
			}
		}
		return $out;
	}

	/**
	 * The view the browser draws (run.ts RunView).
	 *
	 * @param array $run The run.
	 * @param array $w   The wizard.
	 * @return array
	 */
	public static function view( array $run, array $w ) {
		$def   = $w['definition'];
		$state = self::maps( $run['state'] );
		$step  = self::step_of( $def, $run['cursor_id'] );
		$index = $step ? self::index_of( $def, $step['id'] ) : count( $def['steps'] );
		$refs  = array();
		if ( $step && 'review' === $step['type'] ) {
			$refs = (array) $step['show'];
		} elseif ( $step && 'result' === $step['type'] ) {
			foreach ( (array) $step['deliverables'] as $d ) {
				$refs[] = $d['from'];
			}
			$refs = array_values( array_unique( $refs ) );
		}
		$shown   = array();
		$outputs = array();
		foreach ( $refs as $ref ) {
			if ( str_starts_with( $ref, 'lists.' ) ) {
				continue;
			}
			$s = self::step_of( $def, $ref );
			if ( ! $s ) {
				continue;
			}
			$deliverable = null;
			if ( 'result' === $step['type'] ) {
				foreach ( (array) $step['deliverables'] as $d ) {
					if ( $d['from'] === $s['id'] ) {
						$deliverable = $d;
						break;
					}
				}
			}
			$output  = $state['outputs'][ $s['id'] ] ?? null;
			$shown[] = array(
				'step'    => Engenty_Packages::public_step( $s ),
				'output'  => $output,
				'formats' => $output ? self::available_formats( $s, $deliverable ? (array) $deliverable['formats'] : null ) : array(),
				'label'   => $deliverable['label'] ?? null,
			);
			if ( $output ) {
				$outputs[ $s['id'] ] = $output;
			}
		}
		$events = array();
		if ( 'running' === $run['status'] && $step ) {
			$events[] = array(
				'id'      => 1,
				'at'      => gmdate( 'c', strtotime( $run['updated_at'] . ' UTC' ) ),
				'stepId'  => $step['id'],
				'type'    => 'step_started',
				'message' => (string) ( $step['working'] ?? $step['title'] ),
				'note'    => null,
				'asset'   => null,
			);
		}
		$context = $step && 'page' === $step['type'] ? self::page_context( $def, $state, $step ) : null;
		$closed  = $step && 'page' === $step['type'] && 'waiting_input' === $run['status']
			? self::closed_choices( $def, $step, $state['values'], self::lacking_of( $w ) )
			: array();
		return array(
			'id'            => $run['id'],
			'status'        => $run['status'],
			'mode'          => 'live',
			'wizard'        => array(
				'title'       => $def['title'],
				'description' => $def['description'] ?? '',
				'avatar'      => $def['avatar'] ?? 'round',
				'intro'       => $def['intro'] ?? null,
			),
			'step'          => $step ? Engenty_Packages::public_step( $step ) : null,
			'values'        => (object) $state['values'],
			'prefill'       => (object) ( $step && 'page' === $step['type'] ? self::prefill_of( $def, $state, $step, $closed ) : array() ),
			'known'         => (object) ( $context['known'] ?? array() ),
			'options'       => (object) ( $context['options'] ?? array() ),
			'decidedFields' => $context['decided'] ?? array(),
			'closed'        => (object) $closed,
			'outputs'       => (object) $outputs,
			'shown'         => $shown,
			'progress'      => array(
				'done'  => 'done' === $run['status'] ? count( $def['steps'] ) : $index,
				'total' => count( $def['steps'] ),
			),
			'canBack'       => count( $state['history'] ) > 0 && 'running' !== $run['status'],
			'error'         => '' !== (string) $run['error'] ? (string) $run['error'] : null,
			'events'        => $events,
			'brand'         => self::brand(),
			'ask'           => null,
			'lists'         => array(),
			'connections'   => array(),
			'keeps'         => false,
			'shareUrl'      => null,
			'expiresAt'     => null,
		);
	}

	// --- the admin's list ----------------------------------------------------------------

	/**
	 * The runs as Ergebnisse lists them, newest first, by pages of 50 (the runtime's shape).
	 *
	 * @param array $filter `wizard`, `status` (done | open | all), `q`, `days`, `page`.
	 * @return array `{ runs, page, pages, total }`.
	 */
	public static function list_runs( array $filter ) {
		global $wpdb;
		$table = Engenty_Packages::runs_table();
		$where = array( '1=1' );
		$args  = array();
		if ( ! empty( $filter['wizard'] ) ) {
			$where[] = 'wizard_id = %s';
			$args[]  = (string) $filter['wizard'];
		}
		$status = (string) ( $filter['status'] ?? 'done' );
		if ( 'done' === $status ) {
			$where[] = "status = 'done'";
		} elseif ( 'open' === $status ) {
			$where[] = "status IN ('waiting_input', 'running', 'failed')";
		}
		if ( ! empty( $filter['days'] ) ) {
			$where[] = 'started_at > %s';
			$args[]  = gmdate( 'Y-m-d H:i:s', time() - (int) $filter['days'] * DAY_IN_SECONDS );
		}
		if ( ! empty( $filter['q'] ) ) {
			$where[] = '(state LIKE %s OR origin LIKE %s)';
			$like    = '%' . $wpdb->esc_like( (string) $filter['q'] ) . '%';
			$args[]  = $like;
			$args[]  = $like;
		}
		$sql  = implode( ' AND ', $where );
		$page = max( 1, (int) ( $filter['page'] ?? 1 ) );
		// phpcs:disable WordPress.DB.DirectDatabaseQuery, WordPress.DB.PreparedSQL.InterpolatedNotPrepared, WordPress.DB.PreparedSQLPlaceholders.ReplacementsWrongNumber, PluginCheck.Security.DirectDB.UnescapedDBParameter -- own table; $sql holds literal fragments with placeholders, their values follow in $args.
		$total = (int) $wpdb->get_var( $wpdb->prepare( "SELECT COUNT(*) FROM %i WHERE {$sql}", array_merge( array( $table ), $args ) ) );
		$rows  = $wpdb->get_results(
			$wpdb->prepare(
				"SELECT * FROM %i WHERE {$sql} ORDER BY started_at DESC LIMIT %d OFFSET %d",
				array_merge( array( $table ), $args, array( 50, ( $page - 1 ) * 50 ) )
			),
			ARRAY_A
		);
		// phpcs:enable
		$wizards = array();
		foreach ( Engenty_Packages::all() as $w ) {
			$wizards[ $w['id'] ] = $w;
		}
		$runs = array();
		foreach ( (array) $rows as $row ) {
			$row['state'] = Engenty_Packages::json_or( $row['state'], array() );
			$w            = $wizards[ $row['wizard_id'] ] ?? null;
			$runs[]       = self::summary( $row, $w );
		}
		return array(
			'runs'  => $runs,
			'page'  => $page,
			'pages' => max( 1, (int) ceil( $total / 50 ) ),
			'total' => $total,
		);
	}

	/**
	 * A run as the list shows it (services/api.ts apiRuns' shape, with `local`).
	 *
	 * @param array      $row The row, its state read.
	 * @param array|null $w   The wizard.
	 * @return array
	 */
	private static function summary( array $row, $w ) {
		$state   = self::maps( (array) $row['state'] );
		$email   = '';
		$summary = array();
		$fields  = $w ? Engenty_Think::all_fields( $w['definition'] ) : array();
		foreach ( $fields as $f ) {
			$v = $state['values'][ $f['id'] ] ?? null;
			if ( self::is_empty_value( $v ) ) {
				continue;
			}
			if ( 'email' === $f['kind'] && '' === $email ) {
				$email = (string) $v;
				continue;
			}
			if ( count( $summary ) < 3 && is_scalar( $v ) && ! in_array( $f['kind'], array( 'image', 'file', 'signature', 'toggle' ), true ) ) {
				$summary[] = mb_substr( (string) $v, 0, 60 );
			}
		}
		return array(
			'id'        => $row['id'],
			'local'     => true,
			'wizardId'  => $row['wizard_id'],
			'wizard'    => $w ? $w['title'] : $row['wizard_id'],
			'status'    => $row['status'],
			'step'      => $row['cursor_id'],
			'createdAt' => mysql2date( 'c', $row['started_at'], false ),
			'updatedAt' => mysql2date( 'c', $row['updated_at'], false ),
			'origin'    => $row['origin'],
			'email'     => $email,
			'summary'   => implode( ' · ', $summary ),
			'credits'   => 0,
			'calls'     => (int) $row['calls'],
			'files'     => 0,
		);
	}

	/**
	 * One run for the admin's drawer (services/api.ts apiRun's shape, with `local` and `calls`).
	 *
	 * @param string $id The run.
	 * @return array|WP_Error
	 */
	public static function report( $id ) {
		$run = self::load( $id );
		$w   = $run ? Engenty_Packages::get( $run['wizard_id'] ) : null;
		if ( ! $run || ! $w ) {
			return new WP_Error( 'engenty_not_found', __( 'Dieses Ergebnis gibt es nicht.', 'engenty-wizards' ), array( 'status' => 404 ) );
		}
		$state   = self::maps( $run['state'] );
		$answers = array();
		foreach ( Engenty_Think::all_fields( $w['definition'] ) as $f ) {
			$v = $state['values'][ $f['id'] ] ?? null;
			if ( self::is_empty_value( $v ) ) {
				continue;
			}
			$answers[] = array(
				'label' => $f['label'],
				'kind'  => $f['kind'],
				'value' => Engenty_Think::stringify( Engenty_Think::resolve_ref( $f['id'], $w['definition'], $state, array() ) ),
			);
		}
		$outputs = array();
		foreach ( $w['definition']['steps'] as $step ) {
			$output = $state['outputs'][ $step['id'] ] ?? null;
			if ( ! $output ) {
				continue;
			}
			$downloads = array();
			foreach ( self::available_formats( $step, null ) as $format ) {
				$downloads[ $format ] = rest_url( self::NS . '/local/runs/' . rawurlencode( $run['id'] ) . '/steps/' . rawurlencode( $step['id'] ) . '/download?format=' . $format );
			}
			$assets = array();
			foreach ( (array) ( $output['assets'] ?? array() ) as $a ) {
				$assets[] = array(
					'id'   => $a['id'],
					'name' => $a['name'],
					'mime' => $a['mime'],
					'url'  => rest_url( self::NS . '/local/runs/' . rawurlencode( $run['id'] ) . '/assets/' . rawurlencode( $a['id'] ) ),
				);
			}
			$outputs[] = array(
				'stepId'    => $step['id'],
				'title'     => $step['title'],
				'text'      => (string) ( $output['text'] ?? '' ),
				'json'      => $output['json'] ?? null,
				'downloads' => (object) $downloads,
				'assets'    => $assets,
			);
		}
		$summary = self::summary( $run, $w );
		return array_merge(
			$summary,
			array(
				'answers'  => $answers,
				'outputs'  => $outputs,
				'error'    => '' !== (string) $run['error'] ? (string) $run['error'] : null,
				'shareUrl' => null,
				'provider' => Engenty_Think::provider()['name'] ?? null,
			)
		);
	}
}
