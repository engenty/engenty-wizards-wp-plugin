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
$wpdb->query( "DROP TABLE IF EXISTS {$wpdb->prefix}engenty_wizards, {$wpdb->prefix}engenty_runs, {$wpdb->prefix}engenty_assets, {$wpdb->prefix}engenty_upload_budgets" );
// phpcs:ignore WordPress.DB.DirectDatabaseQuery -- the codes' cache has one entry per wizard ID.
$wpdb->query( "DELETE FROM {$wpdb->options} WHERE option_name LIKE '_transient_engenty_code_%' OR option_name LIKE '_transient_timeout_engenty_code_%'" );

// phpcs:ignore WordPress.DB.DirectDatabaseQuery -- request leases are plugin-owned, never autoloaded.
$wpdb->query( $wpdb->prepare( 'DELETE FROM %i WHERE option_name LIKE %s', $wpdb->options, $wpdb->esc_like( 'engenty_lock_' ) . '%' ) );
