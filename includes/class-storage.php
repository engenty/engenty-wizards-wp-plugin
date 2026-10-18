<?php
/**
 * Private assets stay in the database, never in the web server's document tree.
 * Owner-tagged leases serialize external work and cumulative upload reservations.
 *
 * @package Engenty_Wizards
 */

defined( 'ABSPATH' ) || exit;

/** Private blob storage and request coordination. */
class Engenty_Storage extends Engenty_Coordination {
	/** Creates the private asset and quota tables. */
	public static function create_tables() {
		global $wpdb;
		$charset = $wpdb->get_charset_collate();
		dbDelta(
			"CREATE TABLE {$wpdb->prefix}engenty_assets (
			owner varchar(48) NOT NULL,
			path varchar(200) NOT NULL,
			data longtext NOT NULL,
			meta text NOT NULL,
			PRIMARY KEY  (owner,path)
		) {$charset};"
		);
		dbDelta(
			"CREATE TABLE {$wpdb->prefix}engenty_upload_budgets (
			id varchar(64) NOT NULL,
			files int NOT NULL DEFAULT 0,
			bytes bigint NOT NULL DEFAULT 0,
			expires_at bigint NOT NULL DEFAULT 0,
			PRIMARY KEY  (id)
		) {$charset};"
		);
	}

	/**
	 * Keeps bytes privately; metadata never determines a filesystem extension.
	 *
	 * @param string $owner Owner identity.
	 * @param string $path Logical asset name.
	 * @param string $data Bytes.
	 * @param array  $meta Display metadata.
	 * @return bool
	 */
	public static function put( $owner, $path, $data, array $meta ) {
		$already_owned = self::owns( 'asset-budget' );
		if ( strlen( $data ) > 30000000 || ( ! $already_owned && ! self::lock( 'asset-budget' ) ) ) {
			return false;
		}
		try {
			return self::write_blob( $owner, $path, $data, $meta );
		} finally {
			if ( ! $already_owned ) {
				self::unlock( 'asset-budget' ); }
		}
	}

	/**
	 * Writes under a shared storage budget lease, bounding all retained blobs.
	 *
	 * @param string $owner Owner.
	 * @param string $path Logical name.
	 * @param string $data Bytes.
	 * @param array  $meta Metadata.
	 * @return bool
	 */
	private static function write_blob( $owner, $path, $data, array $meta ) {
		global $wpdb;
		// phpcs:ignore WordPress.DB.DirectDatabaseQuery -- own table; encoded-byte budget is conservative.
		$total = (int) $wpdb->get_var( 'SELECT COALESCE(SUM(LENGTH(data)), 0) FROM ' . $wpdb->prefix . 'engenty_assets' );
		// phpcs:ignore WordPress.DB.DirectDatabaseQuery -- own table.
		$owned = (int) $wpdb->get_var( $wpdb->prepare( 'SELECT COALESCE(SUM(LENGTH(data)), 0) FROM %i WHERE owner = %s', $wpdb->prefix . 'engenty_assets', $owner ) );
		// phpcs:ignore WordPress.DB.DirectDatabaseQuery -- replacement bytes must not be counted twice.
		$previous = (int) $wpdb->get_var( $wpdb->prepare( 'SELECT LENGTH(data) FROM %i WHERE owner = %s AND path = %s', $wpdb->prefix . 'engenty_assets', $owner, $path ) );
		$size     = 4 * (int) ceil( strlen( $data ) / 3 );
		if ( $total - $previous + $size > 1000000000 || $owned - $previous + $size > 100000000 ) {
			return false;
		}
		// phpcs:ignore WordPress.DB.DirectDatabaseQuery -- own table; base64 avoids binary connection encoding.
		return false !== $wpdb->replace(
			$wpdb->prefix . 'engenty_assets',
			array(
				'owner' => $owner,
				'path'  => $path,
				'data'  => base64_encode( $data ), // phpcs:ignore WordPress.PHP.DiscouragedPHPFunctions.obfuscation_base64_encode
				'meta'  => wp_json_encode( $meta ),
			)
		); // phpcs:ignore WordPress.PHP.DiscouragedPHPFunctions.obfuscation_base64_encode
	}

	/**
	 * Reads private bytes and metadata.
	 *
	 * @param string $owner Owner identity.
	 * @param string $path Logical asset name.
	 * @return array|null
	 */
	public static function get( $owner, $path ) {
		global $wpdb;
		// phpcs:ignore WordPress.DB.DirectDatabaseQuery -- own table.
		$row = $wpdb->get_row( $wpdb->prepare( 'SELECT data, meta FROM %i WHERE owner = %s AND path = %s', $wpdb->prefix . 'engenty_assets', $owner, $path ), ARRAY_A );
		if ( ! $row ) {
			return null;
		}
		return array(
			'data' => base64_decode( $row['data'], true ), // phpcs:ignore WordPress.PHP.DiscouragedPHPFunctions.obfuscation_base64_decode
			'meta' => json_decode( $row['meta'], true ),
		); // phpcs:ignore WordPress.PHP.DiscouragedPHPFunctions.obfuscation_base64_decode
	}

	/**
	 * The OS temporary directory must be outside the WordPress and uploads document trees.
	 *
	 * @return string|null
	 */
	private static function safe_temporary_directory() {
		$dir    = realpath( sys_get_temp_dir() );
		$upload = wp_upload_dir();
		foreach ( array( ABSPATH, $upload['basedir'], isset( $_SERVER['DOCUMENT_ROOT'] ) ? sanitize_text_field( wp_unslash( $_SERVER['DOCUMENT_ROOT'] ) ) : ABSPATH ) as $public ) {
			$root = realpath( $public );
			if ( $root && $dir && ( $dir === $root || str_starts_with( $dir, trailingslashit( $root ) ) ) ) {
				return null;
			}
		}
		return $dir ? $dir : null;
	}

	/**
	 * Materializes bytes only for local consumers, with an opaque extension and request cleanup.
	 *
	 * @param string $owner Owner identity.
	 * @param string $path Logical asset name.
	 * @return string|null
	 */
	public static function temporary_path( $owner, $path ) {
		$asset = self::get( $owner, $path );
		if ( ! $asset ) {
			return null;
		}
		$dir = self::safe_temporary_directory();
		if ( ! $dir ) {
			return null;
		}
		$tmp = tempnam( $dir, 'engenty-private-' ); // phpcs:ignore WordPress.WP.AlternativeFunctions.file_system_operations_tempnam
		if ( ! $tmp ) {
			return null;
		}
		register_shutdown_function( 'wp_delete_file', $tmp );
		if ( false === file_put_contents( $tmp, $asset['data'] ) ) { // phpcs:ignore WordPress.WP.AlternativeFunctions.file_system_operations_file_put_contents
			return null;
		}
		return $tmp;
	}

	/**
	 * Removes every asset of an owner.
	 *
	 * @param string $owner Owner identity.
	 */
	public static function remove( $owner ) {
		global $wpdb;
		// phpcs:ignore WordPress.DB.DirectDatabaseQuery -- own table.
		$wpdb->delete( $wpdb->prefix . 'engenty_assets', array( 'owner' => $owner ) );
		if ( str_starts_with( $owner, 'run:' ) ) {
			// phpcs:ignore WordPress.DB.DirectDatabaseQuery -- lifetime quota follows the run's retention, including keepDays=0.
			$wpdb->delete( $wpdb->prefix . 'engenty_upload_budgets', array( 'id' => hash( 'sha256', $owner ) ) );
		}
	}
}
