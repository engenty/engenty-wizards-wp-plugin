<?php
/**
 * Connecting the site to an engenty.ai account: sign up or sign in there, come back connected.
 *
 * @package Engenty_Wizards
 */

defined( 'ABSPATH' ) || exit;

/**
 * OAuth 2.1 with PKCE against the account server of engenty.ai, as an AI app connects:
 *
 *   1. The runtime names its account server (`/.well-known/oauth-protected-resource/api/mcp`).
 *   2. The site registers itself there once as a client (RFC 7591), with its own return address.
 *   3. The admin is sent to the sign-in, or with `prompt=create` to the sign-up; the account
 *      server asks for consent and comes back to `admin-post.php?action=engenty_connect`.
 *   4. The code becomes an access token and a refresh token, kept sealed in the auth option.
 *
 * The browser never sees a token. Refreshing happens on the server when a call needs it.
 */
class Engenty_Connect {

	const SCOPES = 'openid profile email offline_access wizards:read wizards:write wizards:publish runs:read';

	/** Hooks the return from the account server. */
	public static function init() {
		add_action( 'admin_post_engenty_connect', array( __CLASS__, 'callback' ) );
	}

	/**
	 * The runtime's address, without a trailing slash.
	 *
	 * @return string
	 */
	public static function cloud() {
		$auth = Engenty_Settings::auth();
		if ( ! empty( $auth['cloud'] ) ) {
			return untrailingslashit( (string) $auth['cloud'] );
		}
		return untrailingslashit( (string) apply_filters( 'engenty_wizards_cloud', ENGENTY_WIZARDS_CLOUD ) );
	}

	/**
	 * Connects by hand: a runtime's address and an API Key from its studio (Einbinden). For an own
	 * engenty server, or where signing in through the browser is not possible. The key is tried on
	 * `/api/v1/me` before it is kept.
	 *
	 * @param string $cloud The runtime's address.
	 * @param string $key   The API Key.
	 * @return array|WP_Error The account.
	 */
	public static function connect_key( $cloud, $key ) {
		$cloud = untrailingslashit( esc_url_raw( trim( $cloud ) ) );
		$key   = trim( $key );
		$host  = (string) wp_parse_url( $cloud, PHP_URL_HOST );
		$local = in_array( $host, array( 'localhost', '127.0.0.1', '[::1]' ), true ) || str_ends_with( $host, '.localhost' );
		if ( '' === $host || ( 'https' !== wp_parse_url( $cloud, PHP_URL_SCHEME ) && ! $local ) ) {
			return new WP_Error( 'engenty_cloud', __( 'The address must start with https://.', 'engenty-wizards' ), array( 'status' => 400 ) );
		}
		if ( ! str_starts_with( $key, 'wz_' ) ) {
			return new WP_Error( 'engenty_key', __( 'An engenty API key starts with wz_.', 'engenty-wizards' ), array( 'status' => 400 ) );
		}
		$res = wp_remote_get(
			$cloud . '/api/v1/me',
			array(
				'timeout' => 15,
				'headers' => array(
					'Authorization'   => 'Bearer ' . $key,
					'Accept'          => 'application/json',
					'Accept-Language' => Engenty_Client::lang(),
				),
			)
		);
		if ( is_wp_error( $res ) ) {
			return new WP_Error( 'engenty_unreachable', __( 'No engenty answers at this address.', 'engenty-wizards' ), array( 'status' => 502 ) );
		}
		$code = (int) wp_remote_retrieve_response_code( $res );
		$me   = json_decode( (string) wp_remote_retrieve_body( $res ), true );
		if ( 401 === $code || 403 === $code ) {
			return new WP_Error( 'engenty_key', __( 'This API key is not valid there.', 'engenty-wizards' ), array( 'status' => 400 ) );
		}
		if ( 200 !== $code || ! is_array( $me ) || empty( $me['urls'] ) ) {
			return new WP_Error( 'engenty_unreachable', __( 'No engenty answers at this address.', 'engenty-wizards' ), array( 'status' => 502 ) );
		}
		Engenty_Settings::forget_auth();
		Engenty_Settings::save_auth(
			array(
				'method'       => 'key',
				'cloud'        => $cloud,
				'api_key'      => $key,
				'connected_at' => time(),
			)
		);
		set_transient( 'engenty_wizards_me', $me, MINUTE_IN_SECONDS );
		return $me;
	}

	/**
	 * The protected resource tokens are asked for: the runtime's API.
	 *
	 * @return string
	 */
	public static function resource() {
		return self::cloud() . '/api/mcp';
	}

	/**
	 * Where the account server sends the admin back to.
	 *
	 * @return string
	 */
	public static function redirect_uri() {
		return admin_url( 'admin-post.php?action=engenty_connect' );
	}

	/**
	 * A JSON answer of a GET or a form POST, or a WP_Error.
	 *
	 * @param string     $method GET or POST.
	 * @param string     $url    Where.
	 * @param array|null $form   Form fields, or null.
	 * @param array|null $json   JSON body, or null.
	 * @return array|WP_Error
	 */
	private static function request( $method, $url, $form = null, $json = null ) {
		$args = array(
			'method'  => $method,
			'timeout' => 20,
			'headers' => array(
				'accept'          => 'application/json',
				'accept-language' => Engenty_Client::lang(),
			),
		);
		if ( null !== $form ) {
			$args['body'] = $form;
		}
		if ( null !== $json ) {
			$args['headers']['content-type'] = 'application/json';
			$args['body']                    = wp_json_encode( $json );
		}
		$res = wp_remote_request( $url, $args );
		if ( is_wp_error( $res ) ) {
			return new WP_Error( 'engenty_unreachable', __( 'engenty.ai cannot be reached right now.', 'engenty-wizards' ), array( 'status' => 502 ) );
		}
		$code = (int) wp_remote_retrieve_response_code( $res );
		$body = json_decode( (string) wp_remote_retrieve_body( $res ), true );
		if ( $code >= 400 || ! is_array( $body ) ) {
			$message = is_array( $body ) ? ( $body['error_description'] ?? $body['message'] ?? $body['error'] ?? '' ) : '';
			return new WP_Error(
				is_array( $body ) && is_string( $body['error'] ?? null ) ? 'engenty_' . $body['error'] : 'engenty_http_' . $code,
				$message ? $message : __( 'engenty.ai refused the request.', 'engenty-wizards' ),
				array( 'status' => $code >= 400 ? $code : 502 )
			);
		}
		return $body;
	}

	/**
	 * The account server's endpoints, found from the runtime; kept with the connection.
	 *
	 * @return array|WP_Error
	 */
	private static function discover() {
		$auth = Engenty_Settings::auth();
		if ( ! empty( $auth['endpoints']['token'] ) && ( $auth['cloud'] ?? '' ) === self::cloud() ) {
			return $auth['endpoints'];
		}
		$meta = self::request( 'GET', self::cloud() . '/.well-known/oauth-protected-resource/api/mcp' );
		if ( is_wp_error( $meta ) ) {
			return $meta;
		}
		$issuer = untrailingslashit( (string) ( $meta['authorization_servers'][0] ?? '' ) );
		if ( ! $issuer ) {
			return new WP_Error( 'engenty_discovery', __( 'engenty.ai names no sign-in server.', 'engenty-wizards' ) );
		}
		$server = self::request( 'GET', $issuer . '/.well-known/oauth-authorization-server' );
		if ( is_wp_error( $server ) ) {
			$server = self::request( 'GET', $issuer . '/.well-known/openid-configuration' );
		}
		if ( is_wp_error( $server ) ) {
			return $server;
		}
		$endpoints = array(
			'issuer'    => $issuer,
			'authorize' => (string) ( $server['authorization_endpoint'] ?? '' ),
			'token'     => (string) ( $server['token_endpoint'] ?? '' ),
			'register'  => (string) ( $server['registration_endpoint'] ?? '' ),
			'revoke'    => (string) ( $server['revocation_endpoint'] ?? '' ),
		);
		if ( ! $endpoints['authorize'] || ! $endpoints['token'] ) {
			return new WP_Error( 'engenty_discovery', __( 'The sign-in server of engenty.ai answers incompletely.', 'engenty-wizards' ) );
		}
		Engenty_Settings::save_auth(
			array_merge(
				$auth,
				array(
					'cloud'     => self::cloud(),
					'endpoints' => $endpoints,
				)
			)
		);
		return $endpoints;
	}

	/**
	 * The site's client id at the account server; registered on first use.
	 *
	 * @param array $endpoints From `discover`.
	 * @return string|WP_Error
	 */
	private static function client_id( array $endpoints ) {
		$auth = Engenty_Settings::auth();
		if ( ! empty( $auth['client_id'] ) && ( $auth['redirect_uri'] ?? '' ) === self::redirect_uri() ) {
			return $auth['client_id'];
		}
		if ( ! $endpoints['register'] ) {
			return new WP_Error( 'engenty_discovery', __( 'The sign-in server accepts no new applications.', 'engenty-wizards' ) );
		}
		$name   = wp_specialchars_decode( get_bloginfo( 'name' ), ENT_QUOTES );
		$client = self::request(
			'POST',
			$endpoints['register'],
			null,
			array(
				'client_name'                => sprintf( 'WordPress · %s', $name ? $name : wp_parse_url( home_url(), PHP_URL_HOST ) ),
				'client_uri'                 => home_url( '/' ),
				'redirect_uris'              => array( self::redirect_uri() ),
				'grant_types'                => array( 'authorization_code', 'refresh_token' ),
				'response_types'             => array( 'code' ),
				'token_endpoint_auth_method' => 'none',
				'scope'                      => self::SCOPES,
			)
		);
		if ( is_wp_error( $client ) ) {
			return $client;
		}
		if ( empty( $client['client_id'] ) ) {
			return new WP_Error( 'engenty_register', __( 'The website could not be registered with engenty.ai.', 'engenty-wizards' ) );
		}
		Engenty_Settings::save_auth(
			array_merge(
				Engenty_Settings::auth(),
				array(
					'client_id'    => (string) $client['client_id'],
					'redirect_uri' => self::redirect_uri(),
				)
			)
		);
		return (string) $client['client_id'];
	}

	/**
	 * The address the admin is sent to: the account server's sign-in, or its sign-up.
	 *
	 * @param bool $signup With `prompt=create`: the page offers a new account first.
	 * @return string|WP_Error
	 */
	public static function start( $signup ) {
		// The account server sends the admin back only over HTTPS; http only to this machine.
		$back = wp_parse_url( self::redirect_uri() );
		$host = strtolower( (string) ( $back['host'] ?? '' ) );
		if ( 'https' !== ( $back['scheme'] ?? '' ) && ! in_array( $host, array( 'localhost', '127.0.0.1', '[::1]' ), true ) && ! str_ends_with( $host, '.localhost' ) ) {
			return new WP_Error(
				'engenty_https',
				__( 'The WordPress admin runs without HTTPS. engenty.ai connects only websites with https:// – switch the website address under Settings → General to https (your host helps with the certificate).', 'engenty-wizards' ),
				array( 'status' => 400 )
			);
		}
		$endpoints = self::discover();
		if ( is_wp_error( $endpoints ) ) {
			return $endpoints;
		}
		$client_id = self::client_id( $endpoints );
		if ( is_wp_error( $client_id ) ) {
			return $client_id;
		}
		$state    = wp_generate_password( 32, false );
		$verifier = wp_generate_password( 64, false );
		set_transient(
			'engenty_connect_' . $state,
			array(
				'user'     => get_current_user_id(),
				'verifier' => $verifier,
			),
			20 * MINUTE_IN_SECONDS
		);
		$challenge = rtrim( strtr( base64_encode( hash( 'sha256', $verifier, true ) ), '+/', '-_' ), '=' ); // phpcs:ignore WordPress.PHP.DiscouragedPHPFunctions.obfuscation_base64_encode
		$user      = wp_get_current_user();
		$query     = array(
			'response_type'         => 'code',
			'client_id'             => $client_id,
			'redirect_uri'          => self::redirect_uri(),
			'scope'                 => self::SCOPES,
			'state'                 => $state,
			'code_challenge'        => $challenge,
			'code_challenge_method' => 'S256',
			'resource'              => self::resource(),
		);
		if ( $signup ) {
			$query['prompt'] = 'create';
		}
		if ( $user && $user->user_email ) {
			$query['login_hint'] = $user->user_email;
		}
		return $endpoints['authorize'] . ( str_contains( $endpoints['authorize'], '?' ) ? '&' : '?' ) . http_build_query( $query, '', '&', PHP_QUERY_RFC3986 );
	}

	/** The account server sent the admin back: the code becomes the tokens. */
	public static function callback() {
		if ( ! current_user_can( 'manage_options' ) ) {
			wp_die( esc_html__( 'You are not allowed to connect the website.', 'engenty-wizards' ), 403 );
		}
		// phpcs:disable WordPress.Security.NonceVerification.Recommended -- the OAuth state stands in for the nonce.
		$state = isset( $_GET['state'] ) ? sanitize_text_field( wp_unslash( $_GET['state'] ) ) : '';
		$code  = isset( $_GET['code'] ) ? sanitize_text_field( wp_unslash( $_GET['code'] ) ) : '';
		$error = isset( $_GET['error'] ) ? sanitize_key( wp_unslash( $_GET['error'] ) ) : '';
		// phpcs:enable
		$back = admin_url( 'admin.php?page=engenty' );
		$flow = $state ? get_transient( 'engenty_connect_' . $state ) : false;
		if ( $state ) {
			delete_transient( 'engenty_connect_' . $state );
		}
		if ( $error ) {
			wp_safe_redirect( add_query_arg( 'engenty_error', 'access_denied' === $error ? 'denied' : 'failed', $back ) );
			exit;
		}
		if ( ! is_array( $flow ) || get_current_user_id() !== (int) $flow['user'] || ! $code ) {
			wp_safe_redirect( add_query_arg( 'engenty_error', 'expired', $back ) );
			exit;
		}
		$auth   = Engenty_Settings::auth();
		$tokens = self::request(
			'POST',
			$auth['endpoints']['token'] ?? '',
			array(
				'grant_type'    => 'authorization_code',
				'code'          => $code,
				'redirect_uri'  => self::redirect_uri(),
				'client_id'     => $auth['client_id'] ?? '',
				'code_verifier' => $flow['verifier'],
				'resource'      => self::resource(),
			)
		);
		if ( is_wp_error( $tokens ) || empty( $tokens['access_token'] ) ) {
			wp_safe_redirect( add_query_arg( 'engenty_error', 'failed', $back ) );
			exit;
		}
		self::keep_tokens( $tokens );
		delete_transient( 'engenty_wizards_me' );
		delete_transient( 'engenty_wizards_list' );
		wp_safe_redirect( add_query_arg( 'engenty_connected', '1', $back ) );
		exit;
	}

	/**
	 * Keeps a token answer with the connection.
	 *
	 * @param array       $tokens The token endpoint's answer.
	 * @param string|null $expected Raw prior connection value.
	 * @return bool
	 */
	private static function keep_tokens( array $tokens, $expected = null ) {
		$auth                 = Engenty_Settings::auth( $expected );
		$auth['access_token'] = (string) $tokens['access_token'];
		$auth['expires_at']   = time() + (int) ( $tokens['expires_in'] ?? 3600 );
		$auth['connected_by'] = $auth['connected_by'] ?? get_current_user_id();
		$auth['connected_at'] = $auth['connected_at'] ?? time();
		if ( ! empty( $tokens['refresh_token'] ) ) {
			$auth['refresh_token'] = (string) $tokens['refresh_token'];
		}
		return Engenty_Settings::save_auth( $auth, $expected );
	}

	/**
	 * An access token that is valid for another minute, refreshed when it is not.
	 *
	 * @return string|WP_Error
	 */
	public static function access_token() {
		$auth = Engenty_Settings::auth();
		if ( ! empty( $auth['api_key'] ) ) {
			return $auth['api_key'];
		}
		if ( empty( $auth['access_token'] ) && empty( $auth['refresh_token'] ) ) {
			return new WP_Error( 'engenty_not_connected', __( 'The website is not connected to engenty.ai.', 'engenty-wizards' ), array( 'status' => 401 ) );
		}
		if ( ! empty( $auth['access_token'] ) && (int) ( $auth['expires_at'] ?? 0 ) > time() + 60 ) {
			return $auth['access_token'];
		}
		return self::refresh();
	}

	/**
	 * A new access token from the refresh token. Requests at the same moment share one refresh: the
	 * account server takes each refresh token only once.
	 *
	 * @return string|WP_Error
	 */
	public static function refresh() {
		if ( ! Engenty_Storage::lock( 'oauth-refresh' ) ) {
			return new WP_Error( 'engenty_refresh_busy', __( 'The connection is being refreshed. Please retry shortly.', 'engenty-wizards' ), array( 'status' => 503 ) );
		}
		try {
			wp_cache_delete( Engenty_Settings::AUTH_OPTION, 'options' );
			$expected = Engenty_Settings::raw_auth();
			if ( null === $expected ) {
				return new WP_Error( 'engenty_not_connected', __( 'The connection to engenty.ai has expired. Please connect again.', 'engenty-wizards' ), array( 'status' => 401 ) );
			}
			$auth = Engenty_Settings::auth( $expected );
			if ( ! empty( $auth['access_token'] ) && (int) ( $auth['expires_at'] ?? 0 ) > time() + 60 ) {
				return $auth['access_token'];
			}
			if ( empty( $auth['refresh_token'] ) || empty( $auth['endpoints']['token'] ) ) {
				return new WP_Error( 'engenty_not_connected', __( 'The connection to engenty.ai has expired. Please connect again.', 'engenty-wizards' ), array( 'status' => 401 ) );
			}
			$tokens = self::request(
				'POST',
				$auth['endpoints']['token'],
				array(
					'grant_type'    => 'refresh_token',
					'refresh_token' => $auth['refresh_token'],
					'client_id'     => $auth['client_id'] ?? '',
					'resource'      => self::resource(),
				)
			);
			wp_cache_delete( Engenty_Settings::AUTH_OPTION, 'options' );
			if ( ! Engenty_Storage::owns( 'oauth-refresh' ) ) {
				return new WP_Error( 'engenty_refresh_busy', __( 'The connection is being refreshed. Please retry shortly.', 'engenty-wizards' ), array( 'status' => 503 ) );
			}
			$current = Engenty_Settings::auth();
			// A disconnect/reconnect while HTTP was pending invalidates this response.
			if ( ( $current['refresh_token'] ?? '' ) !== $auth['refresh_token'] ) {
				return self::access_token();
			}
			if ( is_wp_error( $tokens ) || empty( $tokens['access_token'] ) ) {
				$status = is_wp_error( $tokens ) ? (int) ( $tokens->get_error_data()['status'] ?? 0 ) : 0;
				if ( 400 === $status || 401 === $status ) {
					$current['access_token'] = '';
					unset( $current['refresh_token'] );
					if ( ! Engenty_Settings::save_auth( $current, $expected ) ) {
						return self::access_token();
					}
					return new WP_Error( 'engenty_not_connected', __( 'The connection to engenty.ai was cut. Please connect again.', 'engenty-wizards' ), array( 'status' => 401 ) );
				}
				return is_wp_error( $tokens ) ? $tokens : new WP_Error( 'engenty_refresh', __( 'engenty.ai cannot be reached right now.', 'engenty-wizards' ), array( 'status' => 502 ) );
			}
			if ( ! self::keep_tokens( $tokens, $expected ) ) {
				return self::access_token();
			}
			return (string) $tokens['access_token'];
		} finally {
			Engenty_Storage::unlock( 'oauth-refresh' );
		}
	}

	/** Disconnects: the refresh token is revoked at the account server, the connection forgotten. */
	public static function disconnect() {
		$auth = Engenty_Settings::auth();
		if ( ! empty( $auth['refresh_token'] ) && ! empty( $auth['endpoints']['revoke'] ) ) {
			wp_remote_post(
				$auth['endpoints']['revoke'],
				array(
					'timeout' => 10,
					'body'    => array(
						'token'           => $auth['refresh_token'],
						'token_type_hint' => 'refresh_token',
						'client_id'       => $auth['client_id'] ?? '',
					),
				)
			);
		}
		Engenty_Settings::forget_auth();
	}
}
