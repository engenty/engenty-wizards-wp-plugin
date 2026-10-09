<?php
/**
 * What WordPress keeps: the settings of the site, and the connection to engenty.ai.
 *
 * @package Engenty_Wizards
 */

defined( 'ABSPATH' ) || exit;

/**
 * Two options. `engenty_wizards` holds what the admin chose (the bubble, the defaults, the setup's
 * progress). `engenty_wizards_auth` holds the connection: the OAuth client, the endpoints and the
 * tokens, the tokens sealed with the site's own salt. Neither ever reaches a browser.
 */
class Engenty_Settings {

	const OPTION      = 'engenty_wizards';
	const AUTH_OPTION = 'engenty_wizards_auth';

	/**
	 * The settings with their defaults.
	 *
	 * @return array
	 */
	public static function all() {
		$saved = get_option( self::OPTION, array() );
		return array_replace_recursive( self::defaults(), is_array( $saved ) ? $saved : array() );
	}

	/**
	 * What a new site starts with.
	 *
	 * @return array
	 */
	public static function defaults() {
		return array(
			'mode'   => 'modal',
			'label'  => __( 'Jetzt starten', 'engenty-wizards' ),
			'bubble' => array(
				'token'   => '',
				'title'   => '',
				'label'   => __( 'Fragen? Wir helfen.', 'engenty-wizards' ),
				'text'    => '',
				'color'   => '',
				'exclude' => array(),
			),
			'setup'  => array(
				'site'   => false,
				'wizard' => false,
				'placed' => false,
				'done'   => false,
			),
			'access' => array(
				'roles' => array( 'administrator', 'editor' ),
			),
		);
	}

	/**
	 * Merges `$patch` into the settings and keeps them.
	 *
	 * @param array $patch What changed.
	 * @return array The settings now.
	 */
	public static function update( array $patch ) {
		$next = array_replace_recursive( self::all(), $patch );
		// A list is replaced, not merged by index.
		if ( isset( $patch['bubble']['exclude'] ) ) {
			$next['bubble']['exclude'] = array_values( array_map( 'absint', (array) $patch['bubble']['exclude'] ) );
		}
		if ( isset( $patch['access']['roles'] ) ) {
			$next['access']['roles'] = array_values( array_map( 'sanitize_key', (array) $patch['access']['roles'] ) );
		}
		update_option( self::OPTION, $next, true );
		return $next;
	}

	/**
	 * The connection as kept, the tokens unsealed.
	 *
	 * @return array
	 */
	public static function auth() {
		$saved = get_option( self::AUTH_OPTION, array() );
		if ( ! is_array( $saved ) ) {
			return array();
		}
		foreach ( array( 'access_token', 'refresh_token', 'api_key' ) as $key ) {
			if ( ! empty( $saved[ $key ] ) ) {
				$saved[ $key ] = self::unseal( $saved[ $key ] );
			}
		}
		return $saved;
	}

	/**
	 * Keeps the connection; the tokens sealed.
	 *
	 * @param array $auth The whole connection.
	 */
	public static function save_auth( array $auth ) {
		foreach ( array( 'access_token', 'refresh_token', 'api_key' ) as $key ) {
			if ( ! empty( $auth[ $key ] ) ) {
				$auth[ $key ] = self::seal( $auth[ $key ] );
			}
		}
		update_option( self::AUTH_OPTION, $auth, false );
	}

	/** Forgets the connection: the tokens, the client and what was cached from the account. */
	public static function forget_auth() {
		delete_option( self::AUTH_OPTION );
		delete_transient( 'engenty_wizards_me' );
		delete_transient( 'engenty_wizards_list' );
	}

	/**
	 * Whether the site is connected to an account.
	 *
	 * @return bool
	 */
	public static function connected() {
		$auth = self::auth();
		return ! empty( $auth['refresh_token'] ) || ! empty( $auth['access_token'] ) || ! empty( $auth['api_key'] );
	}

	/**
	 * The key the tokens are sealed with: the site's own salt, never stored beside them.
	 *
	 * @return string
	 */
	private static function key() {
		return hash( 'sha256', 'engenty-wizards:' . wp_salt( 'auth' ), true );
	}

	/**
	 * Seals a secret with AES-256-GCM where OpenSSL is there.
	 *
	 * @param string $plain The secret.
	 * @return string
	 */
	private static function seal( $plain ) {
		if ( ! function_exists( 'openssl_encrypt' ) ) {
			return 'plain:' . base64_encode( $plain ); // phpcs:ignore WordPress.PHP.DiscouragedPHPFunctions.obfuscation_base64_encode
		}
		$iv     = random_bytes( 12 );
		$tag    = '';
		$sealed = openssl_encrypt( $plain, 'aes-256-gcm', self::key(), OPENSSL_RAW_DATA, $iv, $tag );
		return 'gcm:' . base64_encode( $iv . $tag . $sealed ); // phpcs:ignore WordPress.PHP.DiscouragedPHPFunctions.obfuscation_base64_encode
	}

	/**
	 * Opens what `seal` made; an empty string when the salt changed since.
	 *
	 * @param string $sealed The sealed secret.
	 * @return string
	 */
	private static function unseal( $sealed ) {
		if ( str_starts_with( $sealed, 'plain:' ) ) {
			return (string) base64_decode( substr( $sealed, 6 ) ); // phpcs:ignore WordPress.PHP.DiscouragedPHPFunctions.obfuscation_base64_decode
		}
		if ( ! str_starts_with( $sealed, 'gcm:' ) || ! function_exists( 'openssl_decrypt' ) ) {
			return '';
		}
		$raw = base64_decode( substr( $sealed, 4 ) ); // phpcs:ignore WordPress.PHP.DiscouragedPHPFunctions.obfuscation_base64_decode
		if ( strlen( $raw ) < 29 ) {
			return '';
		}
		$plain = openssl_decrypt( substr( $raw, 28 ), 'aes-256-gcm', self::key(), OPENSSL_RAW_DATA, substr( $raw, 0, 12 ), substr( $raw, 12, 16 ) );
		return false === $plain ? '' : $plain;
	}
}
