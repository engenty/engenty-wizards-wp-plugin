<?php
/**
 * The tag that puts a wizard on a page, and the ways to place it: shortcode, PHP, the bubble.
 *
 * @package Engenty_Wizards
 */

defined( 'ABSPATH' ) || exit;

/**
 * Every way renders the same `embed.js` tag of engenty.ai. Visitors' browsers talk to engenty.ai
 * directly from there (the wizard runs in a frame); nothing of a run passes through WordPress.
 */
class Engenty_Embed {

	const MODES = array( 'inline', 'modal', 'bubble' );

	/** Registers the shortcode and the bubble. */
	public static function init() {
		add_shortcode( 'engenty_wizard', array( __CLASS__, 'shortcode' ) );
		add_action( 'wp_footer', array( __CLASS__, 'bubble' ) );
	}

	/**
	 * A wizard's ID (the code the mobile app takes) as its link token; a token stays as it is.
	 *
	 * @param string $id Token or ID.
	 * @return string
	 */
	public static function token( $id ) {
		$id = trim( $id );
		if ( ! preg_match( '/^[A-Z0-9][A-Z0-9 -]{3,11}$/', $id ) ) {
			return $id;
		}
		$code = strtoupper( preg_replace( '/[\s-]/', '', $id ) );
		$key  = 'engenty_code_' . $code;
		$hit  = get_transient( $key );
		if ( is_string( $hit ) && '' !== $hit ) {
			return $hit;
		}
		$res  = wp_remote_get( Engenty_Connect::cloud() . '/api/public/codes/' . rawurlencode( $code ), array( 'timeout' => 8 ) );
		$body = is_wp_error( $res ) ? null : json_decode( (string) wp_remote_retrieve_body( $res ), true );
		if ( is_array( $body ) && ! empty( $body['token'] ) ) {
			set_transient( $key, (string) $body['token'], DAY_IN_SECONDS );
			return (string) $body['token'];
		}
		return $id;
	}

	/**
	 * The tag. Empty for a wizard that is not named.
	 *
	 * @param string $id   Token or ID.
	 * @param array  $args `mode`, `label`, `text`, `color`, `page`.
	 * @return string
	 */
	public static function tag( $id, array $args = array() ) {
		$settings = Engenty_Settings::all();
		$local    = strlen( trim( (string) $id ) ) === 22 ? Engenty_Packages::by_token( trim( (string) $id ) ) : null;
		if ( $local ) {
			return self::local_tag( $local, $args );
		}
		$token = self::token( $id );
		if ( '' === $token ) {
			return '';
		}
		$mode  = in_array( $args['mode'] ?? '', self::MODES, true ) ? $args['mode'] : $settings['mode'];
		$data  = array(
			'wizard' => $token,
			'mode'   => $mode,
			'label'  => (string) ( $args['label'] ?? '' ) !== '' ? (string) $args['label'] : $settings['label'],
			'text'   => (string) ( $args['text'] ?? '' ),
			'color'  => (string) ( $args['color'] ?? '' ),
			'page'   => (string) ( $args['page'] ?? '' ) !== '' ? (string) $args['page'] : self::current_page(),
			'source' => 'wordpress',
		);
		$attrs = '';
		foreach ( $data as $name => $value ) {
			if ( '' !== $value && ( 'inline' !== $mode || ! in_array( $name, array( 'label', 'text', 'color' ), true ) ) ) {
				$attrs .= sprintf( ' data-%s="%s"', $name, esc_attr( $value ) );
			}
		}
		// phpcs:ignore WordPress.WP.EnqueuedResources.NonEnqueuedScript -- one tag per wizard, where it stands.
		return sprintf( '<script async src="%s"%s></script>', esc_url( Engenty_Connect::cloud() . '/embed.js' ), $attrs );
	}

	/**
	 * A standalone wizard: a box the runner script draws into, in the page or behind a button.
	 * Its visitors talk to this site's REST routes; nothing leaves the site but the model call.
	 *
	 * @param array $w    The wizard's row.
	 * @param array $args `mode`, `label`, `text`, `color`, `page`.
	 * @return string
	 */
	public static function local_tag( array $w, array $args = array() ) {
		$settings = Engenty_Settings::all();
		$mode     = in_array( $args['mode'] ?? '', self::MODES, true ) ? $args['mode'] : $settings['mode'];
		self::enqueue_runner();
		$data  = array(
			'engenty-local' => $w['token'],
			'mode'          => $mode,
			'label'         => (string) ( $args['label'] ?? '' ) !== '' ? (string) $args['label'] : $settings['label'],
			'text'          => (string) ( $args['text'] ?? '' ),
			'color'         => (string) ( $args['color'] ?? '' ),
			'page'          => (string) ( $args['page'] ?? '' ) !== '' ? (string) $args['page'] : self::current_page(),
			'title'         => $w['title'],
		);
		$attrs = '';
		foreach ( $data as $name => $value ) {
			if ( '' !== $value ) {
				$attrs .= sprintf( ' data-%s="%s"', $name, esc_attr( $value ) );
			}
		}
		return sprintf( '<div class="engenty-runner engenty-runner--%s"%s></div>', esc_attr( $mode ), $attrs );
	}

	/** The runner bundle and its stylesheet, once per page. */
	public static function enqueue_runner() {
		$asset = ENGENTY_WIZARDS_DIR . 'build/runner.asset.php';
		$meta  = file_exists( $asset ) ? require $asset : array(
			'dependencies' => array( 'react', 'react-dom', 'react-jsx-runtime', 'wp-api-fetch' ),
			'version'      => ENGENTY_WIZARDS_VERSION,
		);
		wp_enqueue_style( 'engenty-runner-fonts', 'https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600&family=Space+Grotesk:wght@500;600&display=swap', array(), null ); // phpcs:ignore WordPress.WP.EnqueuedResourceParameters.MissingVersion
		wp_enqueue_style( 'engenty-runner', ENGENTY_WIZARDS_URL . 'build/runner.css', array(), $meta['version'] );
		wp_enqueue_script( 'engenty-runner', ENGENTY_WIZARDS_URL . 'build/runner.js', $meta['dependencies'], $meta['version'], true );
		wp_add_inline_script(
			'engenty-runner',
			'window.engentyRunner = ' . wp_json_encode(
				array(
					'rest'     => esc_url_raw( rest_url( 'engenty/v1' ) ),
					'lang'     => str_starts_with( get_locale(), 'de' ) ? 'de' : 'en',
					'provider' => Engenty_Think::provider()['name'] ?? null,
					'privacy'  => (string) get_privacy_policy_url(),
					'site'     => wp_specialchars_decode( get_bloginfo( 'name' ), ENT_QUOTES ),
				)
			) . ';',
			'before'
		);
	}

	/**
	 * The address of the page being shown, for the result's "started on".
	 *
	 * @return string
	 */
	private static function current_page() {
		if ( is_singular() ) {
			return (string) get_permalink();
		}
		global $wp;
		return home_url( isset( $wp->request ) ? $wp->request : '/' );
	}

	/**
	 * `[engenty_wizard id="TOKEN" mode="modal" label="Anfrage starten"]`.
	 *
	 * @param array|string $atts Shortcode attributes.
	 * @return string
	 */
	public static function shortcode( $atts ) {
		$atts = shortcode_atts(
			array(
				'id'    => '',
				'mode'  => '',
				'label' => '',
				'text'  => '',
				'color' => '',
			),
			$atts,
			'engenty_wizard'
		);
		if ( '' === $atts['id'] ) {
			return current_user_can( 'edit_posts' ) ? self::editor_hint( __( 'The shortcode lacks id="…": the ID or the link token of the wizard.', 'engenty-wizards' ) ) : '';
		}
		return self::tag( $atts['id'], $atts );
	}

	/**
	 * A line only editors see where a wizard cannot show.
	 *
	 * @param string $text What is missing.
	 * @return string
	 */
	public static function editor_hint( $text ) {
		return sprintf(
			'<p class="engenty-wizard-hint" style="padding:12px 16px;border:1px dashed #e0531b;border-radius:10px;font-size:14px;color:#57534e">%s <a href="%s">%s</a></p>',
			esc_html( $text ),
			esc_url( admin_url( 'admin.php?page=engenty' ) ),
			esc_html__( 'Open engenty', 'engenty-wizards' )
		);
	}

	/** The bubble at the bottom right, on every page but the ones left out. */
	public static function bubble() {
		$bubble = Engenty_Settings::all()['bubble'];
		if ( empty( $bubble['token'] ) || is_admin() ) {
			return;
		}
		if ( is_singular() && in_array( get_queried_object_id(), array_map( 'intval', (array) $bubble['exclude'] ), true ) ) {
			return;
		}
		$tag = self::tag(
			$bubble['token'],
			array(
				'mode'  => 'bubble',
				'label' => $bubble['label'],
				'text'  => $bubble['text'],
				'color' => $bubble['color'],
			)
		);
		echo $tag; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- built from escaped parts.
	}
}
