<?php
/**
 * `engenty/v1`: what the admin app and the block editor call. Each route checks the person's
 * capability and forwards to engenty.ai with the site's token; neither the token nor the account
 * server's addresses reach the browser.
 *
 * @package Engenty_Wizards
 */

defined( 'ABSPATH' ) || exit;

/**
 * The REST routes.
 */
class Engenty_Rest {

	const NS = 'engenty/v1';

	/** Hooks the routes. */
	public static function init() {
		add_action( 'rest_api_init', array( __CLASS__, 'routes' ) );
	}

	/** Who may manage the connection and settings. */
	public static function can_manage() {
		return current_user_can( 'manage_options' );
	}

	/** Who may list and place wizards. */
	public static function can_edit() {
		return current_user_can( 'edit_posts' );
	}

	/** Who may read results, contacts and bookings. */
	public static function can_read_results() {
		return current_user_can( ENGENTY_RESULTS_CAP ) || current_user_can( 'manage_options' );
	}

	/**
	 * One route.
	 *
	 * @param string   $path       Route.
	 * @param string   $methods    GET or POST.
	 * @param callable $callback   Handler.
	 * @param callable $permission Who may.
	 */
	private static function route( $path, $methods, $callback, $permission ) {
		register_rest_route(
			self::NS,
			$path,
			array(
				'methods'             => $methods,
				'callback'            => $callback,
				'permission_callback' => $permission,
			)
		);
	}

	/** Registers the routes. */
	public static function routes() {
		$manage  = array( __CLASS__, 'can_manage' );
		$edit    = array( __CLASS__, 'can_edit' );
		$results = array( __CLASS__, 'can_read_results' );

		self::route( '/status', 'GET', array( __CLASS__, 'status' ), $edit );
		self::route( '/connect', 'POST', array( __CLASS__, 'connect' ), $manage );
		self::route( '/connect/key', 'POST', array( __CLASS__, 'connect_key' ), $manage );
		self::route( '/disconnect', 'POST', array( __CLASS__, 'disconnect' ), $manage );
		self::route( '/settings', 'GET', array( __CLASS__, 'settings' ), $manage );
		self::route( '/settings', 'POST', array( __CLASS__, 'save_settings' ), $manage );

		self::route( '/site', 'GET', array( __CLASS__, 'site' ), $manage );
		self::route( '/site', 'POST', array( __CLASS__, 'read_site' ), $manage );
		self::route( '/site/(?P<job>[\w-]+)', 'GET', array( __CLASS__, 'site_job' ), $manage );
		self::route( '/space', 'GET', array( __CLASS__, 'space' ), $edit );

		self::route( '/wizards', 'GET', array( __CLASS__, 'wizards' ), $edit );
		self::route( '/wizards', 'POST', array( __CLASS__, 'create_wizard' ), $manage );
		self::route( '/templates', 'GET', array( __CLASS__, 'templates' ), $manage );
		self::route( '/pages', 'POST', array( __CLASS__, 'create_page' ), $manage );

		self::route( '/runs', 'GET', array( __CLASS__, 'runs' ), $results );
		self::route( '/runs/(?P<id>[\w-]+)', 'GET', array( __CLASS__, 'run' ), $results );
		self::route( '/contacts', 'GET', array( __CLASS__, 'contacts' ), $results );
		self::route( '/contacts/overview', 'GET', array( __CLASS__, 'contacts_overview' ), $results );
		self::route( '/contacts/(?P<id>[\w-]+)', 'GET', array( __CLASS__, 'contact' ), $results );
		self::route( '/appointments', 'GET', array( __CLASS__, 'appointments' ), $results );
	}

	/**
	 * A runtime answer as REST: a WP_Error keeps its status and the runtime's code.
	 *
	 * @param array|WP_Error $res Answer.
	 * @return WP_REST_Response|WP_Error
	 */
	private static function answer( $res ) {
		return is_wp_error( $res ) ? $res : rest_ensure_response( $res );
	}

	/**
	 * A query string of the allowed parameters a request carries.
	 *
	 * @param WP_REST_Request $request The request.
	 * @param array           $names   Allowed names.
	 * @return string `?a=b` or ''.
	 */
	private static function query( WP_REST_Request $request, array $names ) {
		$query = array();
		foreach ( $names as $name ) {
			$value = $request->get_param( $name );
			if ( null !== $value && '' !== $value ) {
				$query[ $name ] = sanitize_text_field( (string) $value );
			}
		}
		return $query ? '?' . http_build_query( $query ) : '';
	}

	/**
	 * The state the admin app starts from: connected or not, the account, the setup.
	 *
	 * @param WP_REST_Request $request The request.
	 * @return WP_REST_Response
	 */
	public static function status( WP_REST_Request $request ) {
		$connected = Engenty_Settings::connected();
		$me        = $connected ? Engenty_Client::me( (bool) $request->get_param( 'fresh' ) ) : null;
		$error     = is_wp_error( $me ) ? array(
			'code'    => $me->get_error_data()['code'] ?? $me->get_error_code(),
			'message' => $me->get_error_message(),
		) : null;
		if ( is_wp_error( $me ) && 'engenty_not_connected' === $me->get_error_code() ) {
			$connected = false;
		}
		$settings = Engenty_Settings::all();
		$auth     = Engenty_Settings::auth();
		return rest_ensure_response(
			array(
				'connected'    => $connected,
				'cloud'        => Engenty_Connect::cloud(),
				'defaultCloud' => untrailingslashit( (string) apply_filters( 'engenty_wizards_cloud', ENGENTY_WIZARDS_CLOUD ) ),
				'method'       => $auth['method'] ?? ( $connected ? 'oauth' : null ),
				'me'           => is_wp_error( $me ) ? null : $me,
				'error'        => $error,
				'connectedAt'  => isset( $auth['connected_at'] ) ? gmdate( 'c', (int) $auth['connected_at'] ) : null,
				'setup'        => $settings['setup'],
				'site'         => array(
					'name'  => wp_specialchars_decode( get_bloginfo( 'name' ), ENT_QUOTES ),
					'url'   => home_url( '/' ),
					'admin' => wp_get_current_user()->user_email,
					'shop'  => class_exists( 'WooCommerce' ),
				),
				'can'          => array(
					'manage'  => self::can_manage(),
					'results' => self::can_read_results(),
				),
			)
		);
	}

	/**
	 * Where the admin signs up or signs in.
	 *
	 * @param WP_REST_Request $request `signup`: true for a new account.
	 * @return WP_REST_Response|WP_Error
	 */
	public static function connect( WP_REST_Request $request ) {
		$url = Engenty_Connect::start( (bool) $request->get_param( 'signup' ) );
		return is_wp_error( $url ) ? $url : rest_ensure_response( array( 'url' => $url ) );
	}

	/**
	 * Connects by hand with an address and an API Key.
	 *
	 * @param WP_REST_Request $request `cloud`, `key`.
	 * @return WP_REST_Response|WP_Error
	 */
	public static function connect_key( WP_REST_Request $request ) {
		$me = Engenty_Connect::connect_key( (string) $request->get_param( 'cloud' ), (string) $request->get_param( 'key' ) );
		return is_wp_error( $me ) ? $me : rest_ensure_response( array( 'ok' => true ) );
	}

	/** Disconnects the site. */
	public static function disconnect() {
		Engenty_Connect::disconnect();
		return rest_ensure_response( array( 'ok' => true ) );
	}

	/** The settings, with the pages the bubble may leave out. */
	public static function settings() {
		$roles = array();
		foreach ( wp_roles()->roles as $slug => $role ) {
			$roles[] = array(
				'slug'  => $slug,
				'name'  => translate_user_role( $role['name'] ),
				'has'   => ! empty( $role['capabilities'][ ENGENTY_RESULTS_CAP ] ),
				'fixed' => 'administrator' === $slug,
			);
		}
		$pages = array_map(
			static function ( $post ) {
				return array(
					'id'    => $post->ID,
					'title' => wp_specialchars_decode( get_the_title( $post ), ENT_QUOTES ),
				);
			},
			get_posts(
				array(
					'post_type'   => 'page',
					'post_status' => 'publish',
					'numberposts' => 200, // phpcs:ignore WordPress.WP.PostsPerPage.posts_per_page_numberposts -- every page a bubble may leave out.
					'orderby'     => 'title',
					'order'       => 'ASC',
				)
			)
		);
		return rest_ensure_response(
			array(
				'settings' => Engenty_Settings::all(),
				'roles'    => $roles,
				'pages'    => $pages,
			)
		);
	}

	/**
	 * Saves what changed; the access section gives or takes the capability per role.
	 *
	 * @param WP_REST_Request $request JSON patch.
	 * @return WP_REST_Response
	 */
	public static function save_settings( WP_REST_Request $request ) {
		$in    = (array) $request->get_json_params();
		$patch = array();
		if ( isset( $in['mode'] ) && in_array( $in['mode'], array( 'inline', 'modal' ), true ) ) {
			$patch['mode'] = $in['mode'];
		}
		if ( isset( $in['label'] ) ) {
			$patch['label'] = sanitize_text_field( (string) $in['label'] );
		}
		if ( isset( $in['bubble'] ) && is_array( $in['bubble'] ) ) {
			$b               = $in['bubble'];
			$patch['bubble'] = array_filter(
				array(
					'token'   => isset( $b['token'] ) ? sanitize_text_field( (string) $b['token'] ) : null,
					'title'   => isset( $b['title'] ) ? sanitize_text_field( (string) $b['title'] ) : null,
					'label'   => isset( $b['label'] ) ? sanitize_text_field( (string) $b['label'] ) : null,
					'text'    => isset( $b['text'] ) ? sanitize_text_field( (string) $b['text'] ) : null,
					'color'   => isset( $b['color'] ) ? (string) sanitize_hex_color( (string) $b['color'] ) : null,
					'exclude' => isset( $b['exclude'] ) ? (array) $b['exclude'] : null,
				),
				static function ( $v ) {
					return null !== $v;
				}
			);
			if ( ! empty( $b['token'] ) ) {
				$patch['setup'] = array( 'placed' => true );
			}
		}
		if ( isset( $in['setup'] ) && is_array( $in['setup'] ) ) {
			$patch['setup'] = array_merge(
				$patch['setup'] ?? array(),
				array_map( 'boolval', array_intersect_key( $in['setup'], Engenty_Settings::defaults()['setup'] ) )
			);
		}
		if ( isset( $in['access']['roles'] ) ) {
			$roles                    = array_unique( array_merge( array( 'administrator' ), array_map( 'sanitize_key', (array) $in['access']['roles'] ) ) );
			$patch['access']['roles'] = $roles;
			foreach ( wp_roles()->role_objects as $slug => $role ) {
				if ( in_array( $slug, $roles, true ) ) {
					$role->add_cap( ENGENTY_RESULTS_CAP );
				} else {
					$role->remove_cap( ENGENTY_RESULTS_CAP );
				}
			}
		}
		return rest_ensure_response( array( 'settings' => Engenty_Settings::update( $patch ) ) );
	}

	/** What the site says about itself, for the admin to review. */
	public static function site() {
		return rest_ensure_response( Engenty_Site_Reader::found() );
	}

	/**
	 * Sends the admin's choice to engenty.ai: the space reads the site.
	 *
	 * @param WP_REST_Request $request The choice.
	 * @return WP_REST_Response|WP_Error
	 */
	public static function read_site( WP_REST_Request $request ) {
		$payload = Engenty_Site_Reader::payload( (array) $request->get_json_params() );
		$space   = $request->get_param( 'spaceId' );
		if ( $space ) {
			$payload['spaceId'] = sanitize_text_field( (string) $space );
		}
		return self::answer( Engenty_Client::call( 'POST', '/space/site', $payload, 60 ) );
	}

	/**
	 * How reading the site goes; once done the setup step is ticked.
	 *
	 * @param WP_REST_Request $request `job`.
	 * @return WP_REST_Response|WP_Error
	 */
	public static function site_job( WP_REST_Request $request ) {
		$job = Engenty_Client::call( 'GET', '/space/site/' . rawurlencode( (string) $request['job'] ) );
		if ( ! is_wp_error( $job ) && 'done' === ( $job['status'] ?? '' ) ) {
			Engenty_Settings::update( array( 'setup' => array( 'site' => true ) ) );
		}
		return self::answer( $job );
	}

	/**
	 * The space's own details.
	 *
	 * @param WP_REST_Request $request `space`.
	 * @return WP_REST_Response|WP_Error
	 */
	public static function space( WP_REST_Request $request ) {
		return self::answer( Engenty_Client::call( 'GET', '/space' . self::query( $request, array( 'space' ) ) ) );
	}

	/**
	 * The wizards; `fresh` drops the cache.
	 *
	 * @param WP_REST_Request $request The request.
	 * @return WP_REST_Response|WP_Error
	 */
	public static function wizards( WP_REST_Request $request ) {
		$list = Engenty_Client::wizards( (bool) $request->get_param( 'fresh' ) );
		return is_wp_error( $list ) ? $list : rest_ensure_response( array( 'wizards' => $list ) );
	}

	/**
	 * A new wizard from a template, published.
	 *
	 * @param WP_REST_Request $request `starterId`.
	 * @return WP_REST_Response|WP_Error
	 */
	public static function create_wizard( WP_REST_Request $request ) {
		$res = Engenty_Client::call(
			'POST',
			'/wizards',
			array(
				'starterId' => sanitize_text_field( (string) $request->get_param( 'starterId' ) ),
				'lang'      => substr( get_locale(), 0, 2 ),
				'publish'   => true,
			),
			60
		);
		if ( ! is_wp_error( $res ) ) {
			delete_transient( 'engenty_wizards_list' );
			Engenty_Settings::update( array( 'setup' => array( 'wizard' => true ) ) );
		}
		return self::answer( $res );
	}

	/**
	 * Templates to start from.
	 *
	 * @param WP_REST_Request $request `q`.
	 * @return WP_REST_Response|WP_Error
	 */
	public static function templates( WP_REST_Request $request ) {
		$query = self::query( $request, array( 'q' ) );
		$lang  = substr( get_locale(), 0, 2 );
		return self::answer( Engenty_Client::call( 'GET', '/templates' . ( $query ? $query . '&' : '?' ) . 'lang=' . rawurlencode( $lang ) ) );
	}

	/**
	 * A draft page with the wizard's block: placed in one click, published by the admin.
	 *
	 * @param WP_REST_Request $request `token`, `title`, `mode`.
	 * @return WP_REST_Response|WP_Error
	 */
	public static function create_page( WP_REST_Request $request ) {
		$token = sanitize_text_field( (string) $request->get_param( 'token' ) );
		$mode  = in_array( $request->get_param( 'mode' ), array( 'inline', 'modal' ), true ) ? $request->get_param( 'mode' ) : 'inline';
		if ( '' === $token ) {
			return new WP_Error( 'engenty_invalid', __( 'Welcher Wizard?', 'engenty-wizards' ), array( 'status' => 400 ) );
		}
		$block = sprintf(
			'<!-- wp:engenty/wizard %s /-->',
			wp_json_encode(
				array(
					'token' => $token,
					'mode'  => $mode,
				)
			)
		);
		$id    = wp_insert_post(
			array(
				'post_type'    => 'page',
				'post_status'  => 'draft',
				'post_title'   => sanitize_text_field( (string) $request->get_param( 'title' ) ),
				'post_content' => $block,
			),
			true
		);
		if ( is_wp_error( $id ) ) {
			return $id;
		}
		Engenty_Settings::update( array( 'setup' => array( 'placed' => true ) ) );
		return rest_ensure_response(
			array(
				'id'      => $id,
				'editUrl' => get_edit_post_link( $id, 'raw' ),
				'preview' => get_preview_post_link( $id ),
			)
		);
	}

	/**
	 * What visitors left.
	 *
	 * @param WP_REST_Request $request Filters.
	 * @return WP_REST_Response|WP_Error
	 */
	public static function runs( WP_REST_Request $request ) {
		return self::answer( Engenty_Client::call( 'GET', '/runs' . self::query( $request, array( 'space', 'wizard', 'status', 'q', 'days', 'page' ) ) ) );
	}

	/**
	 * One result.
	 *
	 * @param WP_REST_Request $request `id`.
	 * @return WP_REST_Response|WP_Error
	 */
	public static function run( WP_REST_Request $request ) {
		return self::answer( Engenty_Client::call( 'GET', '/runs/' . rawurlencode( (string) $request['id'] ) ) );
	}

	/**
	 * The leads of the contacts plugin (Pro).
	 *
	 * @param WP_REST_Request $request Filters.
	 * @return WP_REST_Response|WP_Error
	 */
	public static function contacts( WP_REST_Request $request ) {
		return self::answer( Engenty_Client::call( 'GET', '/plugins/contacts/' . self::query( $request, array( 'q', 'type', 'role', 'wizard', 'sort', 'order', 'page' ) ) ) );
	}

	/** Totals, roles and the wizards that brought contacts. */
	public static function contacts_overview() {
		return self::answer( Engenty_Client::call( 'GET', '/plugins/contacts/overview' ) );
	}

	/**
	 * One contact.
	 *
	 * @param WP_REST_Request $request `id`.
	 * @return WP_REST_Response|WP_Error
	 */
	public static function contact( WP_REST_Request $request ) {
		return self::answer( Engenty_Client::call( 'GET', '/plugins/contacts/contact/' . rawurlencode( (string) $request['id'] ) ) );
	}

	/**
	 * The bookings of the appointments plugin (Pro), of the account's first space or the one named.
	 *
	 * @param WP_REST_Request $request `filter`, `q`, `space`.
	 * @return WP_REST_Response|WP_Error
	 */
	public static function appointments( WP_REST_Request $request ) {
		$space = (string) $request->get_param( 'space' );
		if ( '' === $space ) {
			$me = Engenty_Client::me();
			if ( is_wp_error( $me ) ) {
				return $me;
			}
			$space = (string) ( $me['spaces'][0]['id'] ?? '' );
		}
		$query = array( 'space' => $space );
		foreach ( array( 'filter', 'q' ) as $name ) {
			if ( $request->get_param( $name ) ) {
				$query[ $name ] = sanitize_text_field( (string) $request->get_param( $name ) );
			}
		}
		return self::answer( Engenty_Client::call( 'GET', '/plugins/appointments/bookings?' . http_build_query( $query ) ) );
	}
}
