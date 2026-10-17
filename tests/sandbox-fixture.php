<?php
/** Private HTML fixture used only by sandbox.sh on disposable WordPress. */
$run = Engenty_Runs::load( 'r_browser' );
if ( $run ) {
	Engenty_Packages::remove( $run['wizard_id'] );
}
if ( 'cleanup' === getenv( 'ENGENTY_SANDBOX_MODE' ) ) {
	return;
}
$definition = array(
	'title' => 'Browser sandbox regression',
	'steps' => array(
		array( 'id' => 'page', 'type' => 'page', 'title' => 'Page', 'fields' => array() ),
		array( 'id' => 'result', 'type' => 'result', 'title' => 'Result', 'show' => array() ),
	),
);
$wizard = Engenty_Packages::install( $definition, array(), array( 'fit' => 'full' ), 'upload', 'browser-sandbox-test' );
if ( is_wp_error( $wizard ) ) {
	throw new RuntimeException( $wizard->get_error_message() );
}
global $wpdb;
$now = current_time( 'mysql', true );
$saved = $wpdb->insert( Engenty_Packages::runs_table(), array(
	'id' => 'r_browser', 'wizard_id' => $wizard['id'], 'status' => 'done', 'cursor_id' => 'result',
	'state' => '{}', 'origin' => '', 'visitor' => 'browser-sandbox', 'calls' => 0, 'error' => '',
	'started_at' => $now, 'updated_at' => $now,
) );
if ( ! $saved || ! Engenty_Storage::put( 'run:r_browser', 'd_test.html', '<html><script>parent.document.body.remove()</script></html>', array( 'name' => 'test.html', 'mime' => 'text/html' ) ) ) {
	Engenty_Packages::remove( $wizard['id'] );
	throw new RuntimeException( 'Could not create sandbox fixture.' );
}
