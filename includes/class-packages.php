<?php
/**
 * Wizards that run on this site by themselves: kept as packages in a table of WordPress, their
 * workspace files in private database storage.
 *
 * @package Engenty_Wizards
 */

defined( 'ABSPATH' ) || exit;

/**
 * A standalone wizard comes as a `.wizard` package: shipped with the plugin (`wizards/`),
 * pulled from the studio, or uploaded by the admin. The table keeps the definition with its
 * prompts; what a visitor's browser gets is the definition without them (`public_step`).
 */
class Engenty_Packages {

	const TABLE_VERSION = 2;

	/** Known step types: a definition naming another was written for a newer runner. */
	const STEP_TYPES = array( 'page', 'agent', 'generate', 'widget', 'surface', 'film', 'review', 'result' );

	/** A package may be this large (the workspace's 25 MB with room for the manifest). */
	const MAX_BYTES = 30000000;

	/** Hooks the tables. */
	public static function init() {
		add_action( 'init', array( __CLASS__, 'ensure_tables' ), 5 );
	}

	/**
	 * The wizards table.
	 *
	 * @return string
	 */
	public static function table() {
		global $wpdb;
		return $wpdb->prefix . 'engenty_wizards';
	}

	/**
	 * The runs table.
	 *
	 * @return string
	 */
	public static function runs_table() {
		global $wpdb;
		return $wpdb->prefix . 'engenty_runs';
	}

	/** Makes or updates the tables once per table version. */
	public static function ensure_tables() {
		if ( (int) get_option( 'engenty_wizards_tables', 0 ) >= self::TABLE_VERSION ) {
			return;
		}
		self::create_tables();
		update_option( 'engenty_wizards_tables', self::TABLE_VERSION, true );
	}

	/** `dbDelta` on both tables. */
	public static function create_tables() {
		global $wpdb;
		require_once ABSPATH . 'wp-admin/includes/upgrade.php';
		$charset = $wpdb->get_charset_collate();
		Engenty_Storage::create_tables();
		$wizards = self::table();
		$runs    = self::runs_table();
		dbDelta(
			"CREATE TABLE {$wizards} (
				id varchar(16) NOT NULL,
				title text NOT NULL,
				description text NOT NULL,
				avatar varchar(20) NOT NULL DEFAULT 'round',
				token varchar(22) NOT NULL,
				definition longtext NOT NULL,
				files longtext NOT NULL,
				fit varchar(8) NOT NULL DEFAULT 'full',
				notes longtext NOT NULL,
				source varchar(10) NOT NULL DEFAULT 'upload',
				source_ref varchar(190) NOT NULL DEFAULT '',
				status varchar(10) NOT NULL DEFAULT 'live',
				steps int NOT NULL DEFAULT 0,
				installed_at datetime NOT NULL,
				updated_at datetime NOT NULL,
				PRIMARY KEY  (id),
				UNIQUE KEY token (token)
			) {$charset};"
		);
		dbDelta(
			"CREATE TABLE {$runs} (
				id varchar(24) NOT NULL,
				wizard_id varchar(16) NOT NULL,
				status varchar(16) NOT NULL DEFAULT 'waiting_input',
				cursor_id varchar(48) NOT NULL DEFAULT '',
				state longtext NOT NULL,
				origin text NOT NULL,
				visitor varchar(40) NOT NULL DEFAULT '',
				calls int NOT NULL DEFAULT 0,
				error text NOT NULL,
				started_at datetime NOT NULL,
				updated_at datetime NOT NULL,
				finished_at datetime NULL,
				PRIMARY KEY  (id),
				KEY wizard_id (wizard_id),
				KEY visitor (visitor, started_at),
				KEY started (started_at)
			) {$charset};"
		);
	}

	/**
	 * A new id: `w_` and ten letters and digits.
	 *
	 * @return string
	 */
	private static function new_id() {
		return 'w_' . strtolower( wp_generate_password( 10, false ) );
	}

	/**
	 * A new link token, as the runtime's: 22 letters and digits.
	 *
	 * @return string
	 */
	private static function new_token() {
		return wp_generate_password( 22, false );
	}

	// --- the table ------------------------------------------------------------------------

	/**
	 * Every standalone wizard, newest first.
	 *
	 * @return array Rows as `self::row` shapes them.
	 */
	public static function all() {
		global $wpdb;
		$table = self::table();
		// phpcs:ignore WordPress.DB.DirectDatabaseQuery -- own table.
		$rows = $wpdb->get_results( $wpdb->prepare( 'SELECT * FROM %i ORDER BY installed_at DESC', $table ), ARRAY_A );
		return array_map( array( __CLASS__, 'row' ), $rows ? $rows : array() );
	}

	/**
	 * One wizard by id.
	 *
	 * @param string $id The id.
	 * @return array|null
	 */
	public static function get( $id ) {
		global $wpdb;
		$table = self::table();
		// phpcs:ignore WordPress.DB.DirectDatabaseQuery -- own table.
		$row = $wpdb->get_row( $wpdb->prepare( 'SELECT * FROM %i WHERE id = %s', $table, $id ), ARRAY_A );
		return $row ? self::row( $row ) : null;
	}

	/**
	 * One wizard by its link token.
	 *
	 * @param string $token The token.
	 * @return array|null
	 */
	public static function by_token( $token ) {
		global $wpdb;
		$table = self::table();
		// phpcs:ignore WordPress.DB.DirectDatabaseQuery -- own table.
		$row = $wpdb->get_row( $wpdb->prepare( 'SELECT * FROM %i WHERE token = %s', $table, $token ), ARRAY_A );
		return $row ? self::row( $row ) : null;
	}

	/**
	 * A JSON column read, or a fallback where it is empty or broken.
	 *
	 * @param string $json     The column.
	 * @param mixed  $fallback What stands in.
	 * @return mixed
	 */
	public static function json_or( $json, $fallback ) {
		$read = json_decode( (string) $json, true );
		return $read ? $read : $fallback;
	}

	/**
	 * A mime type, or the one for anything.
	 *
	 * @param string|false $mime What WordPress found.
	 * @return string
	 */
	public static function mime_or( $mime ) {
		return $mime ? (string) $mime : 'application/octet-stream';
	}

	/**
	 * A row with its JSON columns read.
	 *
	 * @param array $row The database row.
	 * @return array
	 */
	private static function row( array $row ) {
		$row['definition'] = self::json_or( $row['definition'], array() );
		$row['files']      = self::json_or( $row['files'], array() );
		$row['notes']      = self::json_or( $row['notes'], array() );
		$row['steps']      = (int) $row['steps'];
		return $row;
	}

	/**
	 * A wizard as the admin app and the block list it, beside the account's wizards.
	 *
	 * @param array $w A row.
	 * @return array
	 */
	public static function summary( array $w ) {
		return array(
			'id'                => $w['id'],
			'local'             => true,
			'title'             => $w['title'],
			'description'       => $w['description'],
			'avatar'            => $w['avatar'],
			'published'         => true,
			'token'             => $w['token'],
			'code'              => null,
			'shareUrl'          => null,
			'iconUrl'           => null,
			'available'         => 'live' === $w['status'],
			'unavailableReason' => 'live' === $w['status'] ? null : __( 'Paused', 'engenty-wizards' ),
			'plugins'           => array(),
			'standalone'        => array(
				'fit'      => $w['fit'],
				'notes'    => $w['notes']['notes'] ?? array(),
				'missing'  => $w['notes']['missing'] ?? array(),
				'optional' => $w['notes']['optional'] ?? array(),
				'needs'    => $w['notes']['needs'] ?? array(),
				'without'  => $w['notes']['without'] ?? array(),
			),
			'source'            => $w['source'],
			'sourceRef'         => $w['source_ref'],
			'cloudId'           => 'studio' === $w['source'] ? $w['source_ref'] : null,
			'steps'             => $w['steps'],
			'studioUrl'         => null,
			'updatedAt'         => mysql2date( 'c', $w['updated_at'], false ),
		);
	}

	// --- importing ------------------------------------------------------------------------

	/**
	 * Checks a definition's shape as far as PHP can: a title, steps with ids, titles and known
	 * types, a result last. The admin app ran the whole schema and the standalone check before.
	 *
	 * @param mixed $definition The definition.
	 * @return true|WP_Error
	 */
	public static function check_definition( $definition ) {
		if ( ! is_array( $definition ) || '' === trim( (string) ( $definition['title'] ?? '' ) ) || empty( $definition['steps'] ) || ! is_array( $definition['steps'] ) ) {
			return new WP_Error( 'engenty_invalid', __( 'This is not a wizard: title or steps are missing.', 'engenty-wizards' ), array( 'status' => 400 ) );
		}
		if ( isset( $definition['version'] ) && (int) $definition['version'] > 1 ) {
			return new WP_Error( 'engenty_invalid', __( 'This wizard comes from a newer version.', 'engenty-wizards' ), array( 'status' => 400 ) );
		}
		$ids = array();
		foreach ( $definition['steps'] as $step ) {
			if ( ! is_array( $step ) || ! preg_match( '/^[a-zA-Z][a-zA-Z0-9_]{0,40}$/', (string) ( $step['id'] ?? '' ) ) || '' === (string) ( $step['title'] ?? '' ) ) {
				return new WP_Error( 'engenty_invalid', __( 'A step has no valid ID or no title.', 'engenty-wizards' ), array( 'status' => 400 ) );
			}
			if ( ! in_array( $step['type'] ?? '', self::STEP_TYPES, true ) ) {
				return new WP_Error( 'engenty_invalid', sprintf( /* translators: %s: step type */ __( 'The step type “%s” is not known here.', 'engenty-wizards' ), (string) ( $step['type'] ?? '' ) ), array( 'status' => 400 ) );
			}
			if ( isset( $ids[ $step['id'] ] ) ) {
				return new WP_Error( 'engenty_invalid', __( 'Two steps carry the same ID.', 'engenty-wizards' ), array( 'status' => 400 ) );
			}
			$ids[ $step['id'] ] = true;
		}
		$last = end( $definition['steps'] );
		if ( 'result' !== ( $last['type'] ?? '' ) ) {
			return new WP_Error( 'engenty_invalid', __( 'The last step must be the result.', 'engenty-wizards' ), array( 'status' => 400 ) );
		}
		return true;
	}

	/**
	 * Keeps a checked package as a wizard: the row and the files.
	 *
	 * @param array  $definition The definition with its prompts.
	 * @param array  $files      `[{ path, data (base64), mime }]`.
	 * @param array  $fit        The standalone check's answer (fit, notes, missing, optional, needs, without).
	 * @param string $source     bundled | studio | upload.
	 * @param string $source_ref The shipped file's id, the studio wizard's id, or the file name.
	 * @param string $replace    An existing row's id to replace (a shipped wizard updated).
	 * @return array|WP_Error The row.
	 */
	public static function install( array $definition, array $files, array $fit, $source, $source_ref, $replace = '' ) {
		global $wpdb;
		if ( ! Engenty_Storage::lock( 'package-install' ) ) {
			return new WP_Error( 'engenty_busy', __( 'A package is being installed. Please retry shortly.', 'engenty-wizards' ), array( 'status' => 409 ) );
		}
		// Acquire before the transaction's first snapshot, so cumulative storage reads are current.
		if ( ! Engenty_Storage::lock( 'asset-budget' ) ) {
			Engenty_Storage::unlock( 'package-install' );
			return new WP_Error( 'engenty_busy', __( 'Private storage is busy. Please retry shortly.', 'engenty-wizards' ), array( 'status' => 409 ) );
		}
		// phpcs:ignore WordPress.DB.DirectDatabaseQuery -- own tables, atomic package replacement.
		$wpdb->query( 'START TRANSACTION' );
		try {
			$result = self::install_package( $definition, $files, $fit, $source, $source_ref, $replace );
			// phpcs:ignore WordPress.DB.DirectDatabaseQuery, WordPress.DB.PreparedSQL.NotPrepared -- restore old package on any validation/storage failure.
			$wpdb->query( is_wp_error( $result ) ? 'ROLLBACK' : 'COMMIT' );
			return $result;
		} finally {
			// phpcs:ignore WordPress.DB.DirectDatabaseQuery -- harmless after commit, cleans up thrown exceptions.
			$wpdb->query( 'ROLLBACK' );
			Engenty_Storage::unlock( 'asset-budget' );
			Engenty_Storage::unlock( 'package-install' );
		}
	}

	/**
	 * Installs a package within the caller's transaction.
	 *
	 * @param array  $definition Definition.
	 * @param array  $files Files.
	 * @param array  $fit Fit.
	 * @param string $source Source.
	 * @param string $source_ref Source reference.
	 * @param string $replace Existing id.
	 * @return array|WP_Error
	 */
	private static function install_package( array $definition, array $files, array $fit, $source, $source_ref, $replace ) {
		global $wpdb;
		$ok = self::check_definition( $definition );
		if ( is_wp_error( $ok ) ) {
			return $ok;
		}
		if ( 'no' === ( $fit['fit'] ?? '' ) ) {
			return new WP_Error( 'engenty_fit', __( 'This wizard needs an engenty account – it does not run on this website.', 'engenty-wizards' ), array( 'status' => 400 ) );
		}
		$total     = 0;
		$validated = array();
		foreach ( $files as $f ) {
			$path = self::clean_path( (string) ( $f['path'] ?? '' ) );
			$ext  = strtolower( pathinfo( (string) $path, PATHINFO_EXTENSION ) );
			// Only passive workspace formats: MIME claims cannot authorize code or HTML.
			if ( null === $path || ! in_array( $ext, array( 'md', 'txt', 'csv', 'json', 'pdf', 'jpg', 'jpeg', 'png', 'gif', 'webp' ), true ) ) {
				return new WP_Error( 'engenty_file_type', __( 'This package contains an unsupported file type.', 'engenty-wizards' ), array( 'status' => 415 ) );
			}
			$data = base64_decode( (string) ( $f['data'] ?? '' ), true ); // phpcs:ignore WordPress.PHP.DiscouragedPHPFunctions.obfuscation_base64_decode
			if ( false === $data ) {
				return new WP_Error( 'engenty_file_data', __( 'This package contains invalid file data.', 'engenty-wizards' ), array( 'status' => 400 ) );
			}
			$total += strlen( $data );
			if ( $total > self::MAX_BYTES || count( $files ) > 200 ) {
				return new WP_Error( 'engenty_too_large', __( 'The package is larger than 30 MB.', 'engenty-wizards' ), array( 'status' => 413 ) );
			}
			$validated[] = array(
				'path' => $path,
				'data' => $data,
				'mime' => self::mime_or( wp_check_filetype( $path )['type'] ),
			);
		}
		$existing = $replace ? self::get( $replace ) : null;
		$id       = $existing ? $existing['id'] : self::new_id();
		$token    = $existing ? $existing['token'] : self::new_token();
		Engenty_Storage::remove( 'wizard:' . $id );
		$kept = array();
		foreach ( $validated as $f ) {
			if ( ! Engenty_Storage::put( 'wizard:' . $id, $f['path'], $f['data'], array( 'mime' => $f['mime'] ) ) ) {
				return new WP_Error( 'engenty_io', __( 'The file could not be saved.', 'engenty-wizards' ), array( 'status' => 500 ) );
			}
			$kept[] = array(
				'path' => $f['path'],
				'mime' => $f['mime'],
				'size' => strlen( $f['data'] ),
			);
		}
		$now  = current_time( 'mysql', true );
		$data = array(
			'id'           => $id,
			'title'        => mb_substr( sanitize_text_field( (string) $definition['title'] ), 0, 200 ),
			'description'  => mb_substr( sanitize_textarea_field( (string) ( $definition['description'] ?? '' ) ), 0, 2000 ),
			'avatar'       => '' !== sanitize_key( (string) ( $definition['avatar'] ?? 'round' ) ) ? sanitize_key( (string) ( $definition['avatar'] ?? 'round' ) ) : 'round',
			'token'        => $token,
			'definition'   => wp_json_encode( $definition ),
			'files'        => wp_json_encode( $kept ),
			'fit'          => in_array( $fit['fit'] ?? '', array( 'full', 'less' ), true ) ? $fit['fit'] : 'less',
			'notes'        => wp_json_encode(
				array(
					'notes'    => array_values( (array) ( $fit['notes'] ?? array() ) ),
					'missing'  => array_values( (array) ( $fit['missing'] ?? array() ) ),
					'optional' => array_values( (array) ( $fit['optional'] ?? array() ) ),
					'needs'    => array_values( (array) ( $fit['needs'] ?? array() ) ),
					'without'  => array_values( (array) ( $fit['without'] ?? array() ) ),
				)
			),
			'source'       => in_array( $source, array( 'bundled', 'studio', 'upload' ), true ) ? $source : 'upload',
			'source_ref'   => mb_substr( sanitize_text_field( (string) $source_ref ), 0, 190 ),
			'status'       => $existing ? $existing['status'] : 'live',
			'steps'        => count( $definition['steps'] ),
			'installed_at' => $existing ? $existing['installed_at'] : $now,
			'updated_at'   => $now,
		);
		// phpcs:ignore WordPress.DB.DirectDatabaseQuery -- own table.
		$written = $wpdb->replace( self::table(), $data );
		if ( false === $written ) {
			return new WP_Error( 'engenty_db', __( 'The wizard could not be saved.', 'engenty-wizards' ), array( 'status' => 500 ) );
		}
		delete_transient( 'engenty_wizards_local' );
		return self::get( $id );
	}

	/**
	 * The wizard on the site that stands in for an account wizard (pulled from the studio).
	 *
	 * @param string $cloud_id The account wizard's id.
	 * @return array|null
	 */
	public static function of_cloud( $cloud_id ) {
		foreach ( self::all() as $w ) {
			if ( 'studio' === $w['source'] && $w['source_ref'] === $cloud_id ) {
				return $w;
			}
		}
		return null;
	}

	/**
	 * Pulls an account wizard's published package with the site's key and installs it here, in
	 * the place of an earlier pull: the wizard then runs with the site's provider instead of the
	 * account. Its fit comes from the account's list (`standalone`), checked there.
	 *
	 * @param string $cloud_id The account wizard's id.
	 * @return array|WP_Error The row.
	 */
	public static function pull( $cloud_id ) {
		$list = Engenty_Client::wizards( true );
		if ( is_wp_error( $list ) ) {
			return $list;
		}
		$cloud = null;
		foreach ( $list as $w ) {
			if ( ( $w['id'] ?? '' ) === $cloud_id ) {
				$cloud = $w;
			}
		}
		if ( ! $cloud ) {
			return new WP_Error( 'engenty_not_found', __( 'This wizard does not exist in the account.', 'engenty-wizards' ), array( 'status' => 404 ) );
		}
		if ( empty( $cloud['published'] ) ) {
			return new WP_Error( 'engenty_draft', __( 'The wizard is not published yet.', 'engenty-wizards' ), array( 'status' => 409 ) );
		}
		$fit = (array) ( $cloud['standalone'] ?? array() );
		if ( 'no' === ( $fit['fit'] ?? 'no' ) ) {
			return new WP_Error( 'engenty_fit', __( 'This wizard needs an engenty account – it does not run on this website.', 'engenty-wizards' ), array( 'status' => 400 ) );
		}
		$bytes = Engenty_Client::fetch_raw( '/wizards/' . rawurlencode( $cloud_id ) . '/package' );
		if ( is_wp_error( $bytes ) ) {
			return $bytes;
		}
		if ( strlen( $bytes ) > self::MAX_BYTES ) {
			return new WP_Error( 'engenty_too_large', __( 'The package is larger than 30 MB.', 'engenty-wizards' ), array( 'status' => 413 ) );
		}
		$tmp = wp_tempnam( 'engenty-wizard' );
		file_put_contents( $tmp, $bytes ); // phpcs:ignore WordPress.WP.AlternativeFunctions.file_system_operations_file_put_contents -- a temporary file, read and deleted at once.
		$read = self::read_package( $tmp );
		wp_delete_file( $tmp );
		if ( is_wp_error( $read ) ) {
			return $read;
		}
		$existing = self::of_cloud( $cloud_id );
		return self::install( (array) $read['definition'], $read['files'], $fit, 'studio', $cloud_id, $existing ? $existing['id'] : '' );
	}

	/**
	 * Pauses or resumes a wizard.
	 *
	 * @param string $id     The wizard.
	 * @param bool   $paused Paused.
	 * @return array|null
	 */
	public static function set_paused( $id, $paused ) {
		global $wpdb;
		// phpcs:ignore WordPress.DB.DirectDatabaseQuery -- own table.
		$wpdb->update( self::table(), array( 'status' => $paused ? 'paused' : 'live' ), array( 'id' => $id ) );
		return self::get( $id );
	}

	/**
	 * Removes a wizard, its files and its runs.
	 *
	 * @param string $id The wizard.
	 */
	public static function remove( $id ) {
		global $wpdb;
		$w = self::get( $id );
		if ( ! $w ) {
			return;
		}
		Engenty_Runs::remove_of_wizard( $id );
		// phpcs:ignore WordPress.DB.DirectDatabaseQuery -- own table.
		$wpdb->delete( self::table(), array( 'id' => $id ) );
		Engenty_Storage::remove( 'wizard:' . $id );
	}

	/**
	 * A workspace path as the package names it, or null for one that may not be written.
	 *
	 * @param string $raw The path.
	 * @return string|null
	 */
	public static function clean_path( $raw ) {
		$path = trim( preg_replace( '#^\.?/+#', '', $raw ) );
		if ( '' === $path || strlen( $path ) > 200 || ! preg_match( '#^[A-Za-z0-9_-][A-Za-z0-9_.-]*(/[A-Za-z0-9_-][A-Za-z0-9_.-]*)*$#', $path ) ) {
			return null;
		}
		foreach ( explode( '/', $path ) as $part ) {
			if ( '..' === $part ) {
				return null;
			}
		}
		return $path;
	}

	// --- the shipped set ------------------------------------------------------------------

	/**
	 * The wizards that ship with the plugin (`wizards/index.json`), each with whether it is
	 * installed here already.
	 *
	 * @return array
	 */
	public static function bundled() {
		$index = ENGENTY_WIZARDS_DIR . 'wizards/index.json';
		if ( ! file_exists( $index ) ) {
			return array();
		}
		$data      = json_decode( (string) file_get_contents( $index ), true ); // phpcs:ignore WordPress.WP.AlternativeFunctions.file_get_contents_file_get_contents -- the plugin's own file.
		$installed = array();
		foreach ( self::all() as $w ) {
			if ( 'bundled' === $w['source'] ) {
				$installed[ $w['source_ref'] ] = $w['id'];
			}
		}
		$out = array();
		foreach ( (array) ( $data['templates'] ?? array() ) as $t ) {
			$id = sanitize_key( (string) ( $t['id'] ?? '' ) );
			if ( '' === $id || ! file_exists( ENGENTY_WIZARDS_DIR . 'wizards/' . $id . '.wizard' ) ) {
				continue;
			}
			$out[] = array(
				'id'           => $id,
				'title'        => (string) ( $t['title'] ?? $id ),
				'pitch'        => (string) ( $t['pitch'] ?? '' ),
				'language'     => (string) ( $t['language'] ?? 'de' ),
				'avatar'       => (string) ( $t['avatar'] ?? 'round' ),
				'useCases'     => array_values( (array) ( $t['useCases'] ?? array() ) ),
				'industries'   => array_values( (array) ( $t['industries'] ?? array() ) ),
				'formats'      => array_values( (array) ( $t['formats'] ?? array() ) ),
				'capabilities' => array_values( (array) ( $t['capabilities'] ?? array() ) ),
				'effort'       => (array) ( $t['effort'] ?? array() ),
				'costTier'     => (string) ( $t['costTier'] ?? 'low' ),
				'steps'        => (int) ( $t['steps'] ?? 0 ),
				'plan'         => (string) ( $t['plan'] ?? 'free' ),
				'plugins'      => array_values( (array) ( $t['plugins'] ?? array() ) ),
				'standalone'   => (array) ( $t['standalone'] ?? array( 'fit' => 'full' ) ),
				'installed'    => $installed[ $id ] ?? null,
			);
		}
		return $out;
	}

	/**
	 * Reads a shipped package: the definition and its files.
	 *
	 * @param string $id The shipped wizard's id.
	 * @return array|WP_Error `{ definition, files: [{ path, data (base64), mime }], outline }`.
	 */
	public static function read_bundled( $id ) {
		$id   = sanitize_key( $id );
		$file = ENGENTY_WIZARDS_DIR . 'wizards/' . $id . '.wizard';
		if ( '' === $id || ! file_exists( $file ) ) {
			return new WP_Error( 'engenty_not_found', __( 'This template does not exist.', 'engenty-wizards' ), array( 'status' => 404 ) );
		}
		return self::read_package( $file );
	}

	/**
	 * Opens a `.wizard` zip: `wizard.json` and the files under `files/`.
	 *
	 * @param string $file The zip's path.
	 * @return array|WP_Error
	 */
	public static function read_package( $file ) {
		$entries = array();
		if ( class_exists( 'ZipArchive' ) ) {
			$zip = new ZipArchive();
			if ( true !== $zip->open( $file ) ) {
				return new WP_Error( 'engenty_invalid', __( 'The wizard package cannot be opened.', 'engenty-wizards' ), array( 'status' => 400 ) );
			}
			for ( $i = 0; $i < $zip->numFiles; $i++ ) { // phpcs:ignore WordPress.NamingConventions.ValidVariableName.UsedPropertyNotSnakeCase
				$name = (string) $zip->getNameIndex( $i );
				if ( str_ends_with( $name, '/' ) ) {
					continue;
				}
				$entries[ $name ] = (string) $zip->getFromIndex( $i );
			}
			$zip->close();
		} else {
			require_once ABSPATH . 'wp-admin/includes/class-pclzip.php';
			$archive = new PclZip( $file );
			$list    = $archive->extract( PCLZIP_OPT_EXTRACT_AS_STRING );
			if ( ! is_array( $list ) ) {
				return new WP_Error( 'engenty_invalid', __( 'The wizard package cannot be opened.', 'engenty-wizards' ), array( 'status' => 400 ) );
			}
			foreach ( $list as $entry ) {
				if ( empty( $entry['folder'] ) ) {
					$entries[ (string) $entry['filename'] ] = (string) ( $entry['content'] ?? '' );
				}
			}
		}
		if ( ! isset( $entries['wizard.json'] ) ) {
			return new WP_Error( 'engenty_invalid', __( 'This is not a wizard package: wizard.json is missing.', 'engenty-wizards' ), array( 'status' => 400 ) );
		}
		$manifest   = json_decode( $entries['wizard.json'], true );
		$definition = is_array( $manifest ) && 'engenty-wizard' === ( $manifest['format'] ?? '' ) ? ( $manifest['definition'] ?? null ) : $manifest;
		$files      = array();
		foreach ( $entries as $name => $content ) {
			if ( str_starts_with( $name, 'files/' ) && ! str_starts_with( $name, '__MACOSX/' ) ) {
				$path = self::clean_path( substr( $name, 6 ) );
				if ( $path ) {
					$files[] = array(
						'path' => $path,
						'data' => base64_encode( $content ), // phpcs:ignore WordPress.PHP.DiscouragedPHPFunctions.obfuscation_base64_encode
						'mime' => self::mime_or( wp_check_filetype( $path )['type'] ),
					);
				}
			}
		}
		return array(
			'definition' => $definition,
			'files'      => $files,
		);
	}

	// --- what a visitor's browser gets ----------------------------------------------------

	/**
	 * A step without its prompts: what the browser draws, nothing it could read the wizard's
	 * instructions from. Decisions (`ask`, groups, candidates) are made on the server.
	 *
	 * @param array $step The step.
	 * @return array
	 */
	public static function public_step( array $step ) {
		unset( $step['next'], $step['instructions'], $step['call'], $step['prompt'], $step['brief'], $step['inputs'], $step['skills'], $step['kit'], $step['working'] );
		if ( isset( $step['options'] ) && is_array( $step['options'] ) ) {
			unset( $step['options']['style'] );
		}
		if ( isset( $step['fields'] ) && is_array( $step['fields'] ) ) {
			foreach ( $step['fields'] as &$field ) {
				unset( $field['ask'], $field['prefill'], $field['optionsFrom'] );
			}
			unset( $field );
		}
		if ( isset( $step['groups'] ) ) {
			$step['groups'] = array_map(
				static function ( $g ) {
					return array( 'id' => $g['id'] ?? '' );
				},
				(array) $step['groups']
			);
		}
		if ( isset( $step['candidates'] ) ) {
			unset( $step['candidates'] );
		}
		if ( isset( $step['output'] ) && is_array( $step['output'] ) ) {
			// The output fields' descriptions label the result; they are not prompts.
			unset( $step['output']['surface'] );
		}
		return $step;
	}
}
