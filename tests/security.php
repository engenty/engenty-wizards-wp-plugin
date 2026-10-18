<?php
/** Run only on disposable WordPress: wp eval-file tests/security.php. */
function engenty_check( $condition, $message ) {
	$GLOBALS['engenty_assertions'] = ( $GLOBALS['engenty_assertions'] ?? 0 ) + 1;
	if ( ! $condition ) { throw new RuntimeException( $message ); }
}
function engenty_request( $id, $step = '' ) {
	$r = new WP_REST_Request( 'POST' ); $r['id'] = $id; $r['step'] = $step; return $r;
}
global $wpdb;
Engenty_Packages::create_tables();
$def = array( 'title' => 'Security regression', 'steps' => array(
	array( 'id' => 'photo', 'type' => 'page', 'title' => 'Photo', 'fields' => array( array( 'id' => 'image', 'kind' => 'image', 'label' => 'Photo' ) ) ),
	array( 'id' => 'answer', 'type' => 'agent', 'title' => 'Answer', 'instructions' => 'Hello', 'tools' => array(), 'output' => array( 'format' => 'markdown' ) ),
	array( 'id' => 'done', 'type' => 'result', 'title' => 'Result', 'show' => array( 'answer' ) ),
) );
$fit = array( 'fit' => 'full', 'notes' => array() );
foreach ( array( 'payload.php', 'nested/payload.PHP', 'payload.phtml', 'payload.phar', 'payload.php.jpg/attack.php', 'payload.html', 'payload.svg' ) as $path ) {
	$result = Engenty_Packages::install( $def, array( array( 'path' => $path, 'data' => base64_encode( '<?php echo 1;' ), 'mime' => 'text/plain' ) ), $fit, 'upload', 'test' );
	engenty_check( is_wp_error( $result ), 'Executable package allowed: ' . $path );
}
$wizard = Engenty_Packages::install( $def, array( array( 'path' => 'notes.txt', 'data' => base64_encode( 'original' ), 'mime' => 'application/x-php' ) ), $fit, 'upload', 'regression' );
engenty_check( ! is_wp_error( $wizard ), 'Fixture wizard failed' );
$id = 'r_security';
$state = array( 'values' => new stdClass(), 'outputs' => new stdClass(), 'history' => array(), 'notes' => new stdClass(), 'pages' => new stdClass(), 'loops' => new stdClass(), 'decisions' => new stdClass() );
$now = current_time( 'mysql', true );
$wpdb->replace( Engenty_Packages::runs_table(), array( 'id' => $id, 'wizard_id' => $wizard['id'], 'status' => 'running', 'cursor_id' => 'answer', 'state' => wp_json_encode( $state ), 'origin' => '', 'visitor' => 'regression', 'calls' => 0, 'error' => '', 'started_at' => $now, 'updated_at' => $now ) );
try {
	// Failed replacement rolls back the old private assets.
	add_option( 'engenty_lock_' . hash( 'sha256', 'asset-budget' ), ( time() + 900 ) . ':foreign', '', false );
	$failed = Engenty_Packages::install( $def, array( array( 'path' => 'notes.txt', 'data' => base64_encode( 'replacement' ) ) ), $fit, 'upload', 'regression', $wizard['id'] );
	delete_option( 'engenty_lock_' . hash( 'sha256', 'asset-budget' ) );
	engenty_check( is_wp_error( $failed ), 'Storage failure not surfaced' );
	engenty_check( 'original' === Engenty_Storage::get( 'wizard:' . $wizard['id'], 'notes.txt' )['data'], 'Failed replacement lost old assets' );
	engenty_check( Engenty_Storage::put( 'run:' . $id, 'd_test.html', '<script>parent.document.body.remove()</script>', array( 'name' => 'test.html', 'mime' => 'text/html' ) ), 'Private HTML write failed' );
	$path = Engenty_Runs::asset_path( $id, 'd_test.html' );
	engenty_check( $path && ! str_starts_with( $path, ABSPATH ) && ! str_ends_with( $path, '.html' ), 'HTML materialized publicly' );
	$upload = wp_upload_dir();
	engenty_check( ! file_exists( $upload['basedir'] . '/engenty-wizards/runs/' . $id . '/d_test.html' ), 'Static HTML exists' );
	engenty_check( Engenty_Storage::lock( 'regression-owner' ), 'Lease acquisition failed' );
	engenty_check( ! Engenty_Storage::lock( 'regression-owner' ), 'Duplicate lease acquired' );
	Engenty_Storage::unlock( 'regression-owner' );
	$called = 0;
	$hook = function () use ( &$called, $id ) {
		++$called;
		$duplicate = Engenty_Runs::run_step( engenty_request( $id, 'answer' ) );
		engenty_check( 409 === $duplicate->get_status(), 'Concurrent step not rejected' );
		Engenty_Runs::cancel( engenty_request( $id ) );
		engenty_check( ! Engenty_Storage::heartbeat(), 'Cancellation allowed another dispatch' );
		engenty_check( ! Engenty_Runs::record_call(), 'Cancelled run accepted a paid call reservation' );
		return 'Answer after cancellation';
	};
	add_filter( 'engenty_wizards_answer', $hook );
	Engenty_Runs::run_step( engenty_request( $id, 'answer' ) );
	remove_filter( 'engenty_wizards_answer', $hook );
	$run = Engenty_Runs::load( $id );
	engenty_check( 1 === $called && 1 === $run['calls'], 'Paid call accounting incorrect' );
	engenty_check( 'cancelled' === $run['status'] && empty( $run['state']['outputs'] ), 'Late completion overwrote cancellation' );
	foreach ( array( 'done', 'cancelled', 'failed', 'running' ) as $status ) {
		$wpdb->update( Engenty_Packages::runs_table(), array( 'status' => $status, 'cursor_id' => 'photo' ), array( 'id' => $id ) );
		engenty_check( 409 === Engenty_Runs::upload( engenty_request( $id ) )->get_status(), 'Terminal/noninteractive uploads accepted' );
	}
	$reserve = new ReflectionMethod( Engenty_Runs::class, 'reserve_upload' ); $reserve->setAccessible( true );
	$wpdb->query( 'DELETE FROM ' . $wpdb->prefix . 'engenty_upload_budgets' );
	engenty_check( Engenty_Storage::lock( 'upload-budgets' ), 'Budget lock failed' );
	for ( $i = 0; $i < 20; ++$i ) { engenty_check( $reserve->invoke( null, $run, 100 ), 'Early quota rejection' ); }
	engenty_check( ! $reserve->invoke( null, $run, 100 ), 'Cumulative run quota exceeded' );
	Engenty_Storage::unlock( 'upload-budgets' );
	// Refresh duplicate requests return retryable errors, never consume one-use tokens twice.
	engenty_check( Engenty_Storage::lock( 'oauth-refresh' ), 'Refresh lock failed' );
	engenty_check( 'engenty_refresh_busy' === Engenty_Connect::refresh()->get_error_code(), 'Duplicate refresh attempted' );
	Engenty_Storage::unlock( 'oauth-refresh' );
	// An actual second-write failure rolls back both partial new assets and the definition.
	$writes = 0;
	$reject_second = function ( $sql ) use ( &$writes ) {
		if ( str_contains( $sql, 'engenty_assets' ) && preg_match( '/^REPLACE /i', trim( $sql ) ) ) {
			++$writes;
			if ( 2 === $writes ) { return 'INSERT INTO engenty_nonexistent_test_table VALUES (1)'; }
		}
		return $sql;
	};
	add_filter( 'query', $reject_second );
	$errors = $wpdb->suppress_errors();
	try {
		$replacement = Engenty_Packages::install( $def, array( array( 'path' => 'first.txt', 'data' => base64_encode( 'first' ) ), array( 'path' => 'second.txt', 'data' => base64_encode( 'second' ) ) ), $fit, 'upload', 'regression', $wizard['id'] );
	} finally { remove_filter( 'query', $reject_second ); $wpdb->suppress_errors( $errors ); }
	engenty_check( 2 === $writes && is_wp_error( $replacement ), 'Second write failure not exercised' );
	engenty_check( 'original' === Engenty_Storage::get( 'wizard:' . $wizard['id'], 'notes.txt' )['data'] && ! Engenty_Storage::get( 'wizard:' . $wizard['id'], 'first.txt' ), 'Partial replacement survived rollback' );
	// Both visitor and site budgets bound many independent run tokens.
	$wpdb->query( 'DELETE FROM ' . $wpdb->prefix . 'engenty_upload_budgets' );
	Engenty_Storage::lock( 'upload-budgets' );
	for ( $i = 0; $i < 40; ++$i ) { engenty_check( $reserve->invoke( null, array( 'id' => 'r_v' . $i, 'visitor' => 'quota-visitor' ), 100 ), 'Visitor budget rejected early' ); }
	engenty_check( ! $reserve->invoke( null, array( 'id' => 'r_next', 'visitor' => 'quota-visitor' ), 100 ), 'Visitor daily quota bypassed' );
	$wpdb->replace( $wpdb->prefix . 'engenty_upload_budgets', array( 'id' => hash( 'sha256', 'site:' . gmdate( 'Y-m-d' ) ), 'files' => 500, 'bytes' => 50000, 'expires_at' => time() + DAY_IN_SECONDS ) );
	engenty_check( ! $reserve->invoke( null, array( 'id' => 'r_site', 'visitor' => 'other' ), 100 ), 'Site daily quota bypassed' );
	Engenty_Storage::unlock( 'upload-budgets' );
	// A stale owner cannot delete a successor's lease; expired ownership can be replaced.
	$lease_name = 'engenty_lock_' . hash( 'sha256', 'owner-test' );
	engenty_check( Engenty_Storage::lock( 'owner-test' ), 'Owner fixture failed' );
	$wpdb->update( $wpdb->options, array( 'option_value' => ( time() + 900 ) . ':successor' ), array( 'option_name' => $lease_name ) );
	Engenty_Storage::unlock( 'owner-test' );
	engenty_check( str_contains( $wpdb->get_var( $wpdb->prepare( 'SELECT option_value FROM %i WHERE option_name=%s', $wpdb->options, $lease_name ) ), ':successor' ), 'Stale owner released successor' );
	$wpdb->update( $wpdb->options, array( 'option_value' => ( time() - 1 ) . ':expired' ), array( 'option_name' => $lease_name ) );
	engenty_check( Engenty_Storage::lock( 'owner-test' ), 'Expired lease not recoverable' );
	Engenty_Storage::unlock( 'owner-test' );
	// A response rejected after reconnect cannot clear the newer connection.
	$previous_auth = Engenty_Settings::auth();
	$fixture = array( 'access_token' => 'expired', 'refresh_token' => 'old-refresh', 'expires_at' => 0, 'endpoints' => array( 'token' => 'https://oauth.invalid/token' ) );
	Engenty_Settings::save_auth( $fixture );
	$http = function ( $pre, $args, $url ) use ( $fixture ) {
		if ( 'https://oauth.invalid/token' !== $url ) { return $pre; }
		usleep( 3200000 );
		engenty_check( 'engenty_refresh_busy' === Engenty_Connect::refresh()->get_error_code(), 'Slow refresh permitted duplicate request' );
		$fixture['access_token'] = 'new-access'; $fixture['refresh_token'] = 'new-refresh'; $fixture['expires_at'] = time() + 3600;
		Engenty_Settings::save_auth( $fixture );
		return array( 'response' => array( 'code' => 400 ), 'body' => '{"error":"invalid_grant"}' );
	};
	add_filter( 'pre_http_request', $http, 10, 3 );
	try {
		engenty_check( 'new-access' === Engenty_Connect::refresh(), 'Stale rejection disconnected newer credentials' );
		engenty_check( 'new-refresh' === Engenty_Settings::auth()['refresh_token'], 'New refresh token erased' );
	} finally { remove_filter( 'pre_http_request', $http ); Engenty_Settings::save_auth( $previous_auth ); }
	// Change the connection precisely between comparison and persistence, for both outcomes.
	foreach ( array( 200, 400 ) as $http_status ) {
		Engenty_Settings::save_auth( $fixture );
		$reply = function ( $pre, $args, $url ) use ( $http_status ) {
			return 'https://oauth.invalid/token' === $url ? array( 'response' => array( 'code' => $http_status ), 'body' => 200 === $http_status ? '{"access_token":"stale-access","refresh_token":"stale-refresh"}' : '{"error":"invalid_grant"}' ) : $pre;
		};
		$intercepted = false;
		$replace_auth = null;
		$replace_auth = function ( $sql ) use ( &$replace_auth, &$intercepted, $fixture ) {
			if ( ! $intercepted && str_starts_with( trim( $sql ), 'UPDATE' ) && str_contains( $sql, Engenty_Settings::AUTH_OPTION ) ) {
				$intercepted = true; remove_filter( 'query', $replace_auth );
				$fixture['access_token'] = 'cas-winner'; $fixture['refresh_token'] = 'cas-refresh'; $fixture['expires_at'] = time() + 3600;
				Engenty_Settings::save_auth( $fixture );
			}
			return $sql;
		};
		add_filter( 'pre_http_request', $reply, 10, 3 ); add_filter( 'query', $replace_auth );
		try {
			engenty_check( 'cas-winner' === Engenty_Connect::refresh(), 'CAS did not preserve competing connection' );
			engenty_check( $intercepted && 'cas-refresh' === Engenty_Settings::auth()['refresh_token'], 'Exact persistence race not exercised' );
		} finally { remove_filter( 'query', $replace_auth ); remove_filter( 'pre_http_request', $reply ); Engenty_Settings::save_auth( $previous_auth ); }
	}
	WP_CLI::success( $GLOBALS['engenty_assertions'] . ' assertions passed. Private storage, import validation, replacement rollback, terminal uploads, quotas, lease arbitration, cancellation accounting and refresh contention passed.' );
} finally {
	Engenty_Storage::unlock( 'asset-budget' ); Engenty_Storage::unlock( 'upload-budgets' ); Engenty_Storage::unlock( 'oauth-refresh' );
	Engenty_Packages::remove( $wizard['id'] );
	$wpdb->query( 'DELETE FROM ' . $wpdb->prefix . 'engenty_upload_budgets' );
}
