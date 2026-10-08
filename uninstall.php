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
global $wpdb;
// phpcs:ignore WordPress.DB.DirectDatabaseQuery -- the codes' cache has one entry per wizard ID.
$wpdb->query( "DELETE FROM {$wpdb->options} WHERE option_name LIKE '_transient_engenty_code_%' OR option_name LIKE '_transient_timeout_engenty_code_%'" );
