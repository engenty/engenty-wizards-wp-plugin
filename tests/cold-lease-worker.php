<?php
/** Disposable two-process cold-cache claim regression. */
$directory = getenv( 'ENGENTY_COLD_LEASE_DIRECTORY' );
$name = 'engenty_lock_' . hash( 'sha256', 'cold-claim-regression' );
add_filter( 'query', static function ( $query ) use ( $name, $directory ) {
	if ( str_starts_with( $query, 'INSERT' ) && str_contains( $query, $name ) ) {
		file_put_contents( $directory . '/ready', getmypid() . "\n", FILE_APPEND | LOCK_EX );
		$deadline = microtime( true ) + 10;
		do {
			$ready = file_exists( $directory . '/ready' ) ? file( $directory . '/ready' ) : array();
			if ( count( $ready ) >= 2 ) { return $query; }
			usleep( 10000 );
		} while ( microtime( true ) < $deadline );
		throw new RuntimeException( 'Both cold claimers did not reach the insertion barrier.' );
	}
	return $query;
} );
$won = Engenty_Storage::lock( 'cold-claim-regression' );
file_put_contents( $directory . '/result', $won ? "won\n" : "busy\n", FILE_APPEND | LOCK_EX );
if ( $won ) {
	usleep( 1500000 );
	Engenty_Storage::unlock( 'cold-claim-regression' );
}
