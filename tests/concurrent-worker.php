<?php
/** Disposable multi-process lease/quota regression worker. */
$mode = getenv( 'ENGENTY_TEST_MODE' );
$out = getenv( 'ENGENTY_TEST_OUTPUT' );
$key = 'concurrency-regression';
file_put_contents( $out . '.ready', getmypid() . "\n", FILE_APPEND | LOCK_EX );
$deadline = microtime( true ) + 20;
while ( count( file( $out . '.ready' ) ) < 2 ) { if ( microtime( true ) > $deadline ) { throw new RuntimeException( 'Worker barrier timed out' ); } usleep( 10000 ); }
if ( 'lease' === $mode ) {
	$owns = Engenty_Storage::lock( $key );
	file_put_contents( $out, $owns ? "won\n" : "busy\n", FILE_APPEND | LOCK_EX );
	if ( $owns ) { usleep( 1500000 ); Engenty_Storage::unlock( $key ); }
} elseif ( 'budget' === $mode ) {
	for ( $i = 0; $i < 100 && ! Engenty_Storage::lock( 'upload-budgets' ); ++$i ) { usleep( 20000 ); }
	if ( ! Engenty_Storage::owns( 'upload-budgets' ) ) { throw new RuntimeException( 'Could not acquire quota lease' ); }
	try {
		$method = new ReflectionMethod( Engenty_Runs::class, 'reserve_upload' ); $method->setAccessible( true );
		$allowed = $method->invoke( null, array( 'id' => 'r_concurrent', 'visitor' => 'concurrent' ), 100 );
		file_put_contents( $out, $allowed ? "allowed\n" : "denied\n", FILE_APPEND | LOCK_EX );
	} finally { Engenty_Storage::unlock( 'upload-budgets' ); }
}
