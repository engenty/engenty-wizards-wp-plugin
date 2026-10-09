<?php
/**
 * Plugin Name: engenty wizards – a provider that answers canned (the smoke test only)
 *
 * Answers every step of a standalone wizard without a model: JSON that fits the schema asked
 * for, a short text, or a small document. For the smoke test and for developing the flow. The
 * photos attached and the abilities offered come along (`$photos`, `$abilities`); how many photos
 * the last step saw is kept in the option `engenty_fake_photos` for the smoke test.
 */
add_filter(
	'engenty_wizards_answer',
	static function ( $answer, $system, $prompt, $schema, $photos = array(), $abilities = array() ) {
		update_option( 'engenty_fake_photos', count( $photos ), false );
		if ( is_array( $schema ) ) {
			return wp_json_encode( engenty_fake_fill( $schema ) );
		}
		if ( str_contains( $system, 'Return ONLY the HTML' ) ) {
			return '<!doctype html><html><head><meta charset="utf-8"><title>Test</title></head><body><h1>Angebot (Test)</h1><p>Ein Dokument, das die Test-KI geschrieben hat.</p></body></html>';
		}
		return "## Einschätzung (Test)\n\nDas ist eine Antwort der Test-KI. Sie hat gelesen:\n\n" . mb_substr( $prompt, 0, 200 );
	},
	10,
	6
);

if ( ! function_exists( 'engenty_fake_fill' ) ) {
	/** A value that fits a JSON schema. */
	function engenty_fake_fill( array $schema ) {
	$type = $schema['type'] ?? 'string';
	if ( is_array( $type ) ) {
		$type = $type[0];
	}
	if ( isset( $schema['enum'] ) ) {
		return $schema['enum'][0];
	}
	switch ( $type ) {
		case 'object':
			$out = array();
			foreach ( (array) ( $schema['properties'] ?? array() ) as $key => $sub ) {
				$out[ $key ] = engenty_fake_fill( (array) $sub );
			}
			return (object) $out;
		case 'array':
			return array( engenty_fake_fill( (array) ( $schema['items'] ?? array( 'type' => 'string' ) ) ), engenty_fake_fill( (array) ( $schema['items'] ?? array( 'type' => 'string' ) ) ) );
		case 'boolean':
			return true;
		case 'number':
		case 'integer':
			return 1200;
		case 'null':
			return null;
		default:
			return 'Testwert';
	}
	}
}

add_filter(
	'engenty_wizards_provider',
	static function ( $out ) {
		return array_merge( $out, array( 'ready' => true, 'name' => 'Test-KI', 'model' => 'canned-1', 'images' => true, 'note' => null ) );
	}
);
