<?php
/**
 * The menu "engenty" in the admin, its pages and the notices that lead to the setup.
 *
 * @package Engenty_Wizards
 */

defined( 'ABSPATH' ) || exit;

/**
 * Each page is one `<div id="engenty-app">` the admin app (src/admin) draws into; the page's
 * slug says which view.
 */
class Engenty_Admin {

	const PAGES = array(
		'engenty'              => 'home',
		'engenty-wizards'      => 'wizards',
		'engenty-results'      => 'results',
		'engenty-contacts'     => 'contacts',
		'engenty-appointments' => 'appointments',
		'engenty-settings'     => 'settings',
	);

	/** Hooks the menu, the assets and the notices. */
	public static function init() {
		add_action( 'admin_menu', array( __CLASS__, 'menu' ) );
		add_action( 'admin_enqueue_scripts', array( __CLASS__, 'assets' ) );
		add_action( 'admin_notices', array( __CLASS__, 'notices' ) );
		add_action( 'admin_init', array( __CLASS__, 'after_activation' ) );
		add_action( 'wp_ajax_engenty_dismiss', array( __CLASS__, 'dismiss' ) );
		add_filter( 'plugin_action_links_' . plugin_basename( ENGENTY_WIZARDS_FILE ), array( __CLASS__, 'action_links' ) );
	}

	/**
	 * The engenty as the menu's icon.
	 *
	 * @return string
	 */
	private static function icon() {
		$svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path fill="#a7aaad" d="M10 1.5c4.7 0 8.5 3.6 8.5 8.2 0 4.8-3.8 8.8-8.5 8.8S1.5 14.5 1.5 9.7C1.5 5.1 5.3 1.5 10 1.5Zm-3 7a1.3 1.3 0 1 0 0 2.6 1.3 1.3 0 0 0 0-2.6Zm6 0a1.3 1.3 0 1 0 0 2.6 1.3 1.3 0 0 0 0-2.6Z"/></svg>';
		return 'data:image/svg+xml;base64,' . base64_encode( $svg ); // phpcs:ignore WordPress.PHP.DiscouragedPHPFunctions.obfuscation_base64_encode
	}

	/**
	 * What the account lacks, from the last answer of engenty.ai (no call on every admin page).
	 *
	 * @return array Plugin ids.
	 */
	private static function missing() {
		$me = get_transient( 'engenty_wizards_me' );
		return is_array( $me ) && is_array( $me['missing'] ?? null ) ? $me['missing'] : array();
	}

	/** The menu below "Kommentare". */
	public static function menu() {
		$render  = array( __CLASS__, 'render' );
		$missing = self::missing();
		$pro     = ' <span class="engenty-menu-pro">Pro</span>';
		add_menu_page( 'engenty', 'engenty', 'edit_posts', 'engenty', $render, self::icon(), 26 );
		add_submenu_page( 'engenty', __( 'Übersicht', 'engenty-wizards' ), __( 'Übersicht', 'engenty-wizards' ), 'edit_posts', 'engenty', $render );
		add_submenu_page( 'engenty', __( 'Wizards', 'engenty-wizards' ), __( 'Wizards', 'engenty-wizards' ), 'edit_posts', 'engenty-wizards', $render );
		add_submenu_page( 'engenty', __( 'Ergebnisse', 'engenty-wizards' ), __( 'Ergebnisse', 'engenty-wizards' ), ENGENTY_RESULTS_CAP, 'engenty-results', $render );
		add_submenu_page( 'engenty', __( 'Kontakte', 'engenty-wizards' ), __( 'Kontakte', 'engenty-wizards' ) . ( in_array( 'contacts', $missing, true ) ? $pro : '' ), ENGENTY_RESULTS_CAP, 'engenty-contacts', $render );
		add_submenu_page( 'engenty', __( 'Termine', 'engenty-wizards' ), __( 'Termine', 'engenty-wizards' ) . ( in_array( 'appointments', $missing, true ) ? $pro : '' ), ENGENTY_RESULTS_CAP, 'engenty-appointments', $render );
		add_submenu_page( 'engenty', __( 'Einstellungen', 'engenty-wizards' ), __( 'Einstellungen', 'engenty-wizards' ), 'manage_options', 'engenty-settings', $render );
	}

	/** One page: the app draws into it. */
	public static function render() {
		// phpcs:ignore WordPress.Security.NonceVerification.Recommended -- only picks the view.
		$page = isset( $_GET['page'] ) ? sanitize_key( wp_unslash( $_GET['page'] ) ) : 'engenty';
		printf(
			'<div class="wrap engenty-wrap"><div id="engenty-app" data-view="%s"><p class="engenty-loading">%s</p></div></div>',
			esc_attr( self::PAGES[ $page ] ?? 'home' ),
			esc_html__( 'engenty lädt …', 'engenty-wizards' )
		);
	}

	/**
	 * The admin app on its pages; the menu's Pro mark everywhere.
	 */
	public static function assets() {
		wp_add_inline_style( 'wp-admin', '.engenty-menu-pro{display:inline-block;margin-left:4px;padding:0 5px;border-radius:4px;background:#e0531b;color:#fff;font-size:9px;font-weight:600;line-height:16px;vertical-align:1px}' );
		// phpcs:ignore WordPress.Security.NonceVerification.Recommended -- only picks the view.
		$page = isset( $_GET['page'] ) ? sanitize_key( wp_unslash( $_GET['page'] ) ) : '';
		if ( ! isset( self::PAGES[ $page ] ) ) {
			return;
		}
		$asset = ENGENTY_WIZARDS_DIR . 'build/admin.asset.php';
		$meta  = file_exists( $asset ) ? require $asset : array(
			'dependencies' => array( 'wp-element', 'wp-api-fetch', 'wp-components', 'wp-i18n' ),
			'version'      => ENGENTY_WIZARDS_VERSION,
		);
		wp_enqueue_style( 'engenty-fonts', 'https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600&family=Space+Grotesk:wght@500;600&display=swap', array(), null ); // phpcs:ignore WordPress.WP.EnqueuedResourceParameters.MissingVersion
		wp_enqueue_style( 'wp-components' );
		wp_enqueue_style( 'engenty-admin', ENGENTY_WIZARDS_URL . 'build/admin.css', array( 'wp-components' ), $meta['version'] );
		wp_enqueue_script( 'engenty-admin', ENGENTY_WIZARDS_URL . 'build/admin.js', $meta['dependencies'], $meta['version'], true );
		// phpcs:disable WordPress.Security.NonceVerification.Recommended -- flags of the return from engenty.ai, only shown.
		$boot = array(
			'view'      => self::PAGES[ $page ],
			'admin'     => admin_url( 'admin.php' ),
			'pluginUrl' => ENGENTY_WIZARDS_URL,
			'version'   => ENGENTY_WIZARDS_VERSION,
			'connected' => isset( $_GET['engenty_connected'] ),
			'error'     => isset( $_GET['engenty_error'] ) ? sanitize_key( wp_unslash( $_GET['engenty_error'] ) ) : null,
		);
		// phpcs:enable
		wp_add_inline_script( 'engenty-admin', 'window.engentyWizards = ' . wp_json_encode( $boot ) . ';', 'before' );
		wp_set_script_translations( 'engenty-admin', 'engenty-wizards', ENGENTY_WIZARDS_DIR . 'languages' );
	}

	/** After activation the setup opens once. */
	public static function after_activation() {
		if ( ! get_transient( 'engenty_wizards_activated' ) ) {
			return;
		}
		delete_transient( 'engenty_wizards_activated' );
		// phpcs:ignore WordPress.Security.NonceVerification.Recommended -- several plugins activated at once: no redirect.
		if ( wp_doing_ajax() || isset( $_GET['activate-multi'] ) || ! current_user_can( 'manage_options' ) || Engenty_Settings::connected() ) {
			return;
		}
		wp_safe_redirect( admin_url( 'admin.php?page=engenty' ) );
		exit;
	}

	/**
	 * Setup and settings beside "Deaktivieren" in the list of plugins.
	 *
	 * @param array $links The links.
	 * @return array
	 */
	public static function action_links( $links ) {
		$first = Engenty_Settings::connected()
			? sprintf( '<a href="%s">%s</a>', esc_url( admin_url( 'admin.php?page=engenty-settings' ) ), esc_html__( 'Einstellungen', 'engenty-wizards' ) )
			: sprintf( '<a href="%s" style="font-weight:600;color:#e0531b">%s</a>', esc_url( admin_url( 'admin.php?page=engenty' ) ), esc_html__( 'Kostenlos verbinden', 'engenty-wizards' ) );
		array_unshift( $links, $first );
		return $links;
	}

	/**
	 * A notice where the site is not connected, or the account runs out of credits. Not on the
	 * plugin's own pages, which say it themselves; a person can put each one away.
	 */
	public static function notices() {
		if ( ! current_user_can( 'manage_options' ) ) {
			return;
		}
		$screen = get_current_screen();
		if ( $screen && str_contains( (string) $screen->id, 'engenty' ) ) {
			return;
		}
		if ( ! in_array( $screen ? $screen->id : '', array( 'dashboard', 'plugins', 'edit-page', 'edit-post' ), true ) ) {
			return;
		}
		$dismissed = (array) get_user_meta( get_current_user_id(), 'engenty_dismissed', true );
		if ( ! Engenty_Settings::connected() ) {
			if ( in_array( 'connect', $dismissed, true ) ) {
				return;
			}
			self::notice(
				'connect',
				__( 'Eigene KI-Assistenten für deine Website', 'engenty-wizards' ),
				__( 'engenty liest deine Website und baut daraus Wizards für Anfragen, Angebote und Termine – als Block, Shortcode oder Chat-Blase. Kostenlos starten, keine Kreditkarte.', 'engenty-wizards' ),
				admin_url( 'admin.php?page=engenty' ),
				__( 'Kostenlos starten', 'engenty-wizards' )
			);
			return;
		}
		$me = get_transient( 'engenty_wizards_me' );
		if ( is_array( $me ) && isset( $me['tenant']['credits'] ) && null !== $me['tenant']['credits'] && (float) $me['tenant']['credits'] < 20 && ! in_array( 'credits', $dismissed, true ) && ! empty( $me['urls']['billing'] ) ) {
			self::notice(
				'credits',
				__( 'Das Guthaben bei engenty geht zur Neige', 'engenty-wizards' ),
				__( 'Ohne Guthaben starten deine Wizards auf der Website nicht mehr. Lade auf – oder nimm Pro mit monatlichen Credits.', 'engenty-wizards' ),
				$me['urls']['billing'],
				__( 'Guthaben aufladen', 'engenty-wizards' )
			);
		}
	}

	/**
	 * One notice with a button and a way to put it away.
	 *
	 * @param string $id     What can be put away.
	 * @param string $title  The line.
	 * @param string $text   What it says.
	 * @param string $url    Where the button goes.
	 * @param string $button The button.
	 */
	private static function notice( $id, $title, $text, $url, $button ) {
		$nonce = wp_create_nonce( 'engenty_dismiss' );
		printf(
			'<div class="notice notice-info is-dismissible engenty-notice" data-engenty-notice="%1$s" style="border-left-color:#e0531b;display:flex;gap:16px;align-items:center;padding:12px 16px"><div style="flex:1"><p style="margin:0 0 4px;font-size:14px"><strong>%2$s</strong></p><p style="margin:0">%3$s</p></div><p style="margin:0"><a class="button button-primary" style="background:#e0531b;border-color:#e0531b" href="%4$s"%7$s>%5$s</a></p></div><script>document.addEventListener("click",function(e){var n=e.target.closest("[data-engenty-notice=\'%1$s\'] .notice-dismiss");if(n){fetch(ajaxurl,{method:"POST",credentials:"same-origin",headers:{"content-type":"application/x-www-form-urlencoded"},body:"action=engenty_dismiss&id=%1$s&_ajax_nonce=%6$s"});}});</script>',
			esc_attr( $id ),
			esc_html( $title ),
			esc_html( $text ),
			esc_url( $url ),
			esc_html( $button ),
			esc_attr( $nonce ),
			str_starts_with( $url, admin_url() ) ? '' : ' target="_blank" rel="noopener"'
		);
	}

	/** Puts a notice away for the person. */
	public static function dismiss() {
		check_ajax_referer( 'engenty_dismiss' );
		$id        = isset( $_POST['id'] ) ? sanitize_key( wp_unslash( $_POST['id'] ) ) : '';
		$dismissed = (array) get_user_meta( get_current_user_id(), 'engenty_dismissed', true );
		if ( $id && ! in_array( $id, $dismissed, true ) ) {
			$dismissed[] = $id;
			update_user_meta( get_current_user_id(), 'engenty_dismissed', array_values( array_filter( $dismissed ) ) );
		}
		wp_send_json_success();
	}
}
