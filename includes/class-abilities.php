<?php
/**
 * What a wizard may do while it thinks on this site, as WordPress abilities: read a public web page,
 * call a public HTTP API. The AI Client hands them to the model as functions (`using_abilities`);
 * `Engenty_Think` runs the calls and feeds the answers back. They answer only while a step thinks.
 *
 * @package engenty-wizards
 */

defined( 'ABSPATH' ) || exit;

/**
 * The two abilities and their guard.
 */
class Engenty_Abilities {

	const CATEGORY = 'engenty-wizards';

	const FETCH = 'engenty-wizards/web-fetch';

	const HTTP = 'engenty-wizards/http';

	/** What a page may hand the model (tools/index.ts web_fetch clips the same way). */
	const FETCH_CHARS = 20000;

	/** What an API answer may hand the model (tools/index.ts http_request). */
	const HTTP_CHARS = 8000;

	/**
	 * Open while a step thinks: outside of that the abilities refuse, so nothing else on the
	 * site fetches through them.
	 *
	 * @var bool
	 */
	public static $open = false;

	/**
	 * Hooks the registration.
	 */
	public static function init() {
		add_action( 'wp_abilities_api_categories_init', array( __CLASS__, 'register_category' ) );
		add_action( 'wp_abilities_api_init', array( __CLASS__, 'register' ) );
	}

	/**
	 * Whether this WordPress has the Abilities API and the AI Client that calls them.
	 *
	 * @return bool
	 */
	public static function supported() {
		return function_exists( 'wp_register_ability' ) && class_exists( 'WP_AI_Client_Ability_Function_Resolver' );
	}

	/**
	 * The category the abilities sit in.
	 */
	public static function register_category() {
		if ( ! function_exists( 'wp_register_ability_category' ) ) {
			return;
		}
		wp_register_ability_category(
			self::CATEGORY,
			array(
				'label'       => __( 'engenty Wizards', 'engenty-wizards' ),
				'description' => __( 'Was ein Wizard darf, während er auf dieser Website denkt.', 'engenty-wizards' ),
			)
		);
	}

	/**
	 * The abilities themselves; not in the REST API, only the model reaches them.
	 */
	public static function register() {
		if ( ! function_exists( 'wp_register_ability' ) ) {
			return;
		}
		wp_register_ability(
			self::FETCH,
			array(
				'label'               => __( 'Webseite lesen', 'engenty-wizards' ),
				'description'         => 'Fetch a public web page or file and return its readable text (Markdown).',
				'category'            => self::CATEGORY,
				'input_schema'        => array(
					'type'       => 'object',
					'properties' => array(
						'url' => array(
							'type'        => 'string',
							'description' => 'Absolute http(s) URL',
						),
					),
					'required'   => array( 'url' ),
				),
				'execute_callback'    => array( __CLASS__, 'fetch' ),
				'permission_callback' => array( __CLASS__, 'allowed' ),
				'meta'                => array( 'show_in_rest' => false ),
			)
		);
		wp_register_ability(
			self::HTTP,
			array(
				'label'               => __( 'API aufrufen', 'engenty-wizards' ),
				'description'         => 'Call a public HTTP API. Use for REST endpoints the instructions name.',
				'category'            => self::CATEGORY,
				'input_schema'        => array(
					'type'       => 'object',
					'properties' => array(
						'method'  => array(
							'type' => 'string',
							'enum' => array( 'GET', 'POST', 'PUT', 'PATCH', 'DELETE' ),
						),
						'url'     => array( 'type' => 'string' ),
						'headers' => array(
							'type'                 => 'object',
							'additionalProperties' => array( 'type' => 'string' ),
						),
						'json'    => array( 'description' => 'JSON body' ),
					),
					'required'   => array( 'url' ),
				),
				'execute_callback'    => array( __CLASS__, 'http' ),
				'permission_callback' => array( __CLASS__, 'allowed' ),
				'meta'                => array( 'show_in_rest' => false ),
			)
		);
	}

	/**
	 * Only while a step thinks.
	 *
	 * @return bool
	 */
	public static function allowed() {
		return self::$open;
	}

	/**
	 * A public page as Markdown: `{ status, url, content }`, or `{ error }` the model reads.
	 *
	 * @param array|null $input `{ url }`.
	 * @return array
	 */
	public static function fetch( $input ) {
		$url = self::public_url( (string) ( $input['url'] ?? '' ) );
		if ( is_wp_error( $url ) ) {
			return array( 'error' => $url->get_error_message() );
		}
		$res = wp_safe_remote_get(
			$url,
			array(
				'timeout'             => 20,
				'redirection'         => 3,
				'limit_response_size' => 2 * MB_IN_BYTES,
				'user-agent'          => 'Mozilla/5.0 (compatible; engenty-wizards/' . ENGENTY_WIZARDS_VERSION . ')',
			)
		);
		if ( is_wp_error( $res ) ) {
			return array( 'error' => $res->get_error_message() );
		}
		$type = (string) wp_remote_retrieve_header( $res, 'content-type' );
		$body = (string) wp_remote_retrieve_body( $res );
		$text = false !== stripos( $type, 'html' ) ? Engenty_Site_Reader::markdown( $body ) : $body;
		return array(
			'status'  => (int) wp_remote_retrieve_response_code( $res ),
			'url'     => $url,
			'content' => self::clip( $text, self::FETCH_CHARS ),
		);
	}

	/**
	 * One call of a public API: `{ status, body }`, or `{ error }`.
	 *
	 * @param array|null $input `{ method, url, headers, json }`.
	 * @return array
	 */
	public static function http( $input ) {
		$url = self::public_url( (string) ( $input['url'] ?? '' ) );
		if ( is_wp_error( $url ) ) {
			return array( 'error' => $url->get_error_message() );
		}
		$method  = strtoupper( (string) ( $input['method'] ?? 'GET' ) );
		$headers = array();
		foreach ( (array) ( $input['headers'] ?? array() ) as $name => $value ) {
			$name = preg_replace( '/[^A-Za-z0-9-]/', '', (string) $name );
			if ( '' !== $name && ! in_array( strtolower( $name ), array( 'host', 'cookie', 'content-length' ), true ) ) {
				$headers[ $name ] = (string) $value;
			}
		}
		$args = array(
			'method'              => in_array( $method, array( 'GET', 'POST', 'PUT', 'PATCH', 'DELETE' ), true ) ? $method : 'GET',
			'timeout'             => 30,
			'redirection'         => 3,
			'limit_response_size' => 2 * MB_IN_BYTES,
			'headers'             => $headers,
		);
		if ( array_key_exists( 'json', (array) $input ) && null !== $input['json'] ) {
			$args['headers']['content-type'] = 'application/json';
			$args['body']                    = wp_json_encode( $input['json'] );
		}
		$res = wp_safe_remote_request( $url, $args );
		if ( is_wp_error( $res ) ) {
			return array( 'error' => $res->get_error_message() );
		}
		return array(
			'status' => (int) wp_remote_retrieve_response_code( $res ),
			'body'   => self::clip( (string) wp_remote_retrieve_body( $res ), self::HTTP_CHARS ),
		);
	}

	/**
	 * A URL a wizard may reach: http(s), public (tools/net-guard.ts assertPublicUrl; WordPress's
	 * own check refuses private and loopback addresses, `wp_safe_remote_*` checks again after redirects).
	 *
	 * @param string $raw The URL.
	 * @return string|WP_Error
	 */
	private static function public_url( $raw ) {
		$raw = trim( $raw );
		if ( ! preg_match( '#^https?://#i', $raw ) ) {
			return new WP_Error( 'engenty_url', 'Only http and https URLs are allowed.' );
		}
		$host = strtolower( (string) wp_parse_url( $raw, PHP_URL_HOST ) );
		if ( '' === $host || 'localhost' === $host || str_ends_with( $host, '.localhost' ) || str_ends_with( $host, '.local' ) ) {
			return new WP_Error( 'engenty_url', 'Private addresses are not reachable from a wizard.' );
		}
		$url = wp_http_validate_url( $raw );
		if ( ! $url ) {
			return new WP_Error( 'engenty_url', 'Private addresses are not reachable from a wizard.' );
		}
		return $url;
	}

	/**
	 * Text cut to a limit, with the cut named (tools/shared.ts clip).
	 *
	 * @param string $text  The text.
	 * @param int    $limit Characters.
	 * @return string
	 */
	private static function clip( $text, $limit ) {
		if ( mb_strlen( $text ) <= $limit ) {
			return $text;
		}
		return mb_substr( $text, 0, $limit ) . "\n…[truncated " . ( mb_strlen( $text ) - $limit ) . ' chars]';
	}
}
