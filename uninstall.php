<?php
/**
 * Deleting the plugin removes what it kept: settings, the connection, caches and the capability.
 * The account on engenty.ai and its wizards stay.
 *
 * @package Engenty_Wizards
 */

defined( 'WP_UNINSTALL_PLUGIN' ) || exit;

delete_option( 'engenty_wizards' );
delete_option( 'engenty_wizards_auth' );
delete_transient( 'engenty_wizards_me' );
delete_transient( 'engenty_wizards_list' );
delete_metadata( 'user', 0, 'engenty_dismissed', '', true );
foreach ( wp_roles()->role_objects as $engenty_role ) {
	$engenty_role->remove_cap( 'engenty_results' );
}
delete_option( 'engenty_wizards_tables' );
delete_transient( 'engenty_wizards_provider' );
delete_transient( 'engenty_wizards_local' );
wp_clear_scheduled_hook( 'engenty_wizards_daily' );
global $wpdb;
// phpcs:ignore WordPress.DB.DirectDatabaseQuery -- the plugin's own tables.
$wpdb->query( "DROP TABLE IF EXISTS {$wpdb->prefix}engenty_wizards, {$wpdb->prefix}engenty_runs" );
$engenty_upload = wp_upload_dir();
$engenty_dir    = trailingslashit( $engenty_upload['basedir'] ) . 'engenty-wizards';
if ( is_dir( $engenty_dir ) ) {
	$engenty_walk = new RecursiveIteratorIterator( new RecursiveDirectoryIterator( $engenty_dir, FilesystemIterator::SKIP_DOTS ), RecursiveIteratorIterator::CHILD_FIRST );
	foreach ( $engenty_walk as $engenty_entry ) {
		if ( $engenty_entry->isDir() ) {
			rmdir( $engenty_entry->getPathname() ); // phpcs:ignore WordPress.WP.AlternativeFunctions.file_system_operations_rmdir
		} else {
			wp_delete_file( $engenty_entry->getPathname() );
		}
	}
	rmdir( $engenty_dir ); // phpcs:ignore WordPress.WP.AlternativeFunctions.file_system_operations_rmdir
}
// phpcs:ignore WordPress.DB.DirectDatabaseQuery -- the codes' cache has one entry per wizard ID.
$wpdb->query( "DELETE FROM {$wpdb->options} WHERE option_name LIKE '_transient_engenty_code_%' OR option_name LIKE '_transient_timeout_engenty_code_%'" );
