<?php
/**
 * Calls to the runtime's API with the site's access token.
 *
 * @package Engenty_Wizards
 */

defined( 'ABSPATH' ) || exit;

/**
 * `/api/v1` of engenty.ai, called from PHP only. A refused call comes back as a WP_Error with the
 * runtime's `code` (`plugin`, `read_only`, `no_credits`, `insufficient_scope`) so the admin app
 * can say what is missing and what would help.
 */
class Engenty_Client {

	/**
	 * Calls the runtime.
	 *
	 * @param string     $method HTTP method.
	 * @param string     $path   Below `/api/v1`, with its query.
	 * @param array|null $body   JSON body.
	 * @param int        $timeout Seconds.
	 * @return array|WP_Error The answer's JSON.
	 */
	public static function call( $method, $path, $body = null, $timeout = 20 ) {
		$res = self::request( $method, $path, $body, $timeout );
		if ( is_wp_error( $res ) ) {
			return $res;
		}
		$json = json_decode( (string) wp_remote_retrieve_body( $res ), true );
		return is_array( $json ) ? $json : array();
	}

	/**
	 * A call whose answer is a file, not JSON: the bytes, or the runtime's error.
	 *
	 * @param string $path    Below `/api/v1`.
	 * @param int    $timeout Seconds.
	 * @return string|WP_Error
	 */
	public static function fetch_raw( $path, $timeout = 60 ) {
		$res = self::request( 'GET', $path, null, $timeout );
		if ( is_wp_error( $res ) ) {
			return $res;
		}
		return (string) wp_remote_retrieve_body( $res );
	}

	/**
	 * One call with the site's token, once more after a refresh when the token went stale;
	 * an answer of 400 and up becomes a WP_Error with the runtime's code.
	 *
	 * @param string     $method  HTTP method.
	 * @param string     $path    Below `/api/v1`.
	 * @param array|null $body    JSON body.
	 * @param int        $timeout Seconds.
	 * @return array|WP_Error The response.
	 */
	private static function request( $method, $path, $body, $timeout ) {
		$token = Engenty_Connect::access_token();
		if ( is_wp_error( $token ) ) {
			return $token;
		}
		$res = self::send( $method, $path, $body, $token, $timeout );
		// The token went stale before its time (revoked and given again, the clock off): once more.
		if ( ! is_wp_error( $res ) && 401 === (int) wp_remote_retrieve_response_code( $res ) ) {
			if ( ! empty( Engenty_Settings::auth()['api_key'] ) ) {
				return new WP_Error( 'engenty_key', __( 'The API key no longer works. Connect the website again.', 'engenty-wizards' ), array( 'status' => 401 ) );
			}
			$token = Engenty_Connect::refresh();
			if ( is_wp_error( $token ) ) {
				return $token;
			}
			$res = self::send( $method, $path, $body, $token, $timeout );
		}
		if ( is_wp_error( $res ) ) {
			return new WP_Error( 'engenty_unreachable', __( 'engenty.ai cannot be reached right now.', 'engenty-wizards' ), array( 'status' => 502 ) );
		}
		$code = (int) wp_remote_retrieve_response_code( $res );
		if ( $code >= 400 ) {
			$json         = json_decode( (string) wp_remote_retrieve_body( $res ), true );
			$runtime_code = is_array( $json ) && is_string( $json['code'] ?? null ) ? $json['code'] : 'http_' . $code;
			$message      = is_array( $json ) && is_string( $json['error'] ?? null ) ? $json['error'] : __( 'engenty.ai refused the request.', 'engenty-wizards' );
			return new WP_Error(
				'engenty_' . $runtime_code,
				$message,
				array(
					'status' => $code,
					'code'   => $runtime_code,
					'plugin' => is_array( $json ) ? ( $json['plugin'] ?? null ) : null,
				)
			);
		}
		return $res;
	}

	/**
	 * One request.
	 *
	 * @param string     $method  HTTP method.
	 * @param string     $path    Below `/api/v1`.
	 * @param array|null $body    JSON body.
	 * @param string     $token   Access token.
	 * @param int        $timeout Seconds.
	 * @return array|WP_Error
	 */
	private static function send( $method, $path, $body, $token, $timeout ) {
		$args = array(
			'method'  => $method,
			'timeout' => $timeout,
			'headers' => array(
				'authorization' => 'Bearer ' . $token,
				'accept'        => 'application/json',
				'user-agent'    => 'engenty-wizards-wordpress/' . ENGENTY_WIZARDS_VERSION . '; ' . home_url( '/' ),
			),
		);
		if ( null !== $body ) {
			$args['headers']['content-type'] = 'application/json';
			$args['body']                    = wp_json_encode( $body );
		}
		return wp_remote_request( Engenty_Connect::cloud() . '/api/v1' . $path, $args );
	}

	/**
	 * Who the site is connected as and what the account has, cached for a minute.
	 *
	 * @param bool $fresh Ask again.
	 * @return array|WP_Error
	 */
	public static function me( $fresh = false ) {
		$cached = get_transient( 'engenty_wizards_me' );
		if ( ! $fresh && is_array( $cached ) ) {
			return $cached;
		}
		$me = self::call( 'GET', '/me' );
		if ( ! is_wp_error( $me ) ) {
			set_transient( 'engenty_wizards_me', $me, MINUTE_IN_SECONDS );
		}
		return $me;
	}

	/**
	 * The account's wizards, cached for five minutes: the block, the widget and the bubble read them.
	 *
	 * @param bool $fresh Ask again.
	 * @return array|WP_Error
	 */
	public static function wizards( $fresh = false ) {
		$cached = get_transient( 'engenty_wizards_list' );
		if ( ! $fresh && is_array( $cached ) ) {
			return $cached;
		}
		$res = self::call( 'GET', '/wizards' );
		if ( is_wp_error( $res ) ) {
			return $res;
		}
		$list = is_array( $res['wizards'] ?? null ) ? $res['wizards'] : array();
		set_transient( 'engenty_wizards_list', $list, 5 * MINUTE_IN_SECONDS );
		return $list;
	}
}
