<?php
/**
 * Portable owner-tagged leases for paid steps, refreshes and storage reservations.
 * Unique inserts and conditional ownership writes arbitrate across WordPress object caches.
 *
 * @package Engenty_Wizards
 */

defined( 'ABSPATH' ) || exit;

/** Atomic request coordination shared by the private asset store and runtime. */
class Engenty_Coordination {
	/**
	 * Request-owned leases; database uniqueness is the arbitration boundary.
	 *
	 * @var array
	 */
	private static $locks = array();

	/**
	 * Claims a lease atomically. Fifteen minutes exceeds one bounded provider request; renew between tool turns.
	 *
	 * @param string $key Operation identity.
	 * @return bool
	 */
	public static function lock( $key ) {
		global $wpdb;
		$name   = 'engenty_lock_' . hash( 'sha256', $key );
		$owner  = wp_generate_uuid4();
		$value  = ( time() + 900 ) . ':' . $owner;
		$errors = $wpdb->suppress_errors();
		// Plain INSERT relies on the unique option_name key; add_option can upsert a competing owner.
		// phpcs:ignore WordPress.DB.DirectDatabaseQuery -- atomic lease acquisition.
		$inserted = $wpdb->insert(
			$wpdb->options,
			array(
				'option_name'  => $name,
				'option_value' => $value,
				'autoload'     => 'no',
			)
		);
		$wpdb->suppress_errors( $errors );
		if ( 1 !== $inserted ) {
			// Read the database directly: persistent object caches cannot arbitrate leases.
			// phpcs:ignore WordPress.DB.DirectDatabaseQuery -- atomic lease coordination.
			$old = $wpdb->get_var( $wpdb->prepare( 'SELECT option_value FROM %i WHERE option_name = %s', $wpdb->options, $name ) );
			if ( ! $old || (int) $old >= time() ) {
				return false;
			}
			// phpcs:ignore WordPress.DB.DirectDatabaseQuery -- compare-and-swap expired ownership.
			$claimed = $wpdb->query( $wpdb->prepare( 'UPDATE %i SET option_value = %s WHERE option_name = %s AND option_value = %s', $wpdb->options, $value, $name, $old ) );
			if ( 1 !== $claimed ) {
				return false;
			}
		}
		self::$locks[ $key ] = $value;
		wp_cache_delete( $name, 'options' );
		register_shutdown_function( array( __CLASS__, 'unlock' ), $key );
		return true;
	}

	/**
	 * Cancellation invalidates any in-flight owner's next dispatch.
	 *
	 * @param string $key Operation identity.
	 */
	public static function revoke( $key ) {
		global $wpdb;
		$name = 'engenty_lock_' . hash( 'sha256', $key );
		// phpcs:ignore WordPress.DB.DirectDatabaseQuery -- cancellation revokes the execution lease.
		$wpdb->delete( $wpdb->options, array( 'option_name' => $name ) );
		wp_cache_delete( $name, 'options' );
	}

	/**
	 * Verifies request ownership directly in the database.
	 *
	 * @param string $key Operation identity.
	 * @return bool
	 */
	public static function owns( $key ) {
		global $wpdb;
		if ( ! isset( self::$locks[ $key ] ) ) {
			return false;
		}
		$name = 'engenty_lock_' . hash( 'sha256', $key );
		// phpcs:ignore WordPress.DB.DirectDatabaseQuery -- lease ownership must not use cached options.
		return self::$locks[ $key ] === $wpdb->get_var( $wpdb->prepare( 'SELECT option_value FROM %i WHERE option_name = %s', $wpdb->options, $name ) );
	}

	/**
	 * Renews held leases between bounded calls; a lost owner cannot resurrect its lease.
	 *
	 * @return bool
	 */
	public static function heartbeat() {
		global $wpdb;
		foreach ( self::$locks as $key => $old ) {
			$name = 'engenty_lock_' . hash( 'sha256', $key );
			if ( ! self::owns( $key ) ) {
				return false;
			}
			$new = ( time() + 900 ) . ':' . substr( $old, strpos( $old, ':' ) + 1 );
			if ( $new !== $old ) {
				// phpcs:ignore WordPress.DB.DirectDatabaseQuery -- ownership-conditional renewal.
				if ( 1 !== $wpdb->query( $wpdb->prepare( 'UPDATE %i SET option_value = %s WHERE option_name = %s AND option_value = %s', $wpdb->options, $new, $name, $old ) ) ) {
					return false;
				}
				self::$locks[ $key ] = $new;
			}
		}
		return true;
	}

	/**
	 * Only this request's owner token can release its lease.
	 *
	 * @param string $key Operation identity.
	 */
	public static function unlock( $key ) {
		global $wpdb;
		if ( ! isset( self::$locks[ $key ] ) ) {
			return;
		}
		$name = 'engenty_lock_' . hash( 'sha256', $key );
		// phpcs:ignore WordPress.DB.DirectDatabaseQuery -- owner-conditional deletion.
		$wpdb->query( $wpdb->prepare( 'DELETE FROM %i WHERE option_name = %s AND option_value = %s', $wpdb->options, $name, self::$locks[ $key ] ) );
		unset( self::$locks[ $key ] );
		wp_cache_delete( $name, 'options' );
	}
}
