<?php
/**
 * Plugin Name:       engenty wizards
 * Plugin URI:        https://engenty.ai/wordpress-plugins/engenty-wizards
 * Description:       Your own AI assistants on your website: as a block, a shortcode, an Elementor widget or a bubble on every page. With an engenty.ai account, or on the site itself with its AI provider.
 * Version:           0.3.1
 * Requires at least: 6.6
 * Requires PHP:      8.1
 * Author:            engenty
 * Author URI:        https://engenty.ai
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       engenty-wizards
 * Domain Path:       /languages
 *
 * @package Engenty_Wizards
 */

defined( 'ABSPATH' ) || exit;

define( 'ENGENTY_WIZARDS_VERSION', '0.3.1' );
define( 'ENGENTY_WIZARDS_FILE', __FILE__ );
define( 'ENGENTY_WIZARDS_DIR', plugin_dir_path( __FILE__ ) );
define( 'ENGENTY_WIZARDS_URL', plugin_dir_url( __FILE__ ) );

/*
 * Where the wizards run. Always engenty.ai; a developer of this plugin points it at a runtime on
 * their machine with `define( 'ENGENTY_WIZARDS_CLOUD', 'http://localhost:18891' );` in wp-config.php.
 */
if ( ! defined( 'ENGENTY_WIZARDS_CLOUD' ) ) {
	define( 'ENGENTY_WIZARDS_CLOUD', 'https://engenty.ai' );
}

/** Who reads results, contacts and bookings; given to administrators and editors on activation. */
const ENGENTY_RESULTS_CAP = 'engenty_results';

require_once ENGENTY_WIZARDS_DIR . 'includes/class-settings.php';
require_once ENGENTY_WIZARDS_DIR . 'includes/class-connect.php';
require_once ENGENTY_WIZARDS_DIR . 'includes/class-client.php';
require_once ENGENTY_WIZARDS_DIR . 'includes/class-site-reader.php';
require_once ENGENTY_WIZARDS_DIR . 'includes/class-packages.php';
require_once ENGENTY_WIZARDS_DIR . 'includes/class-abilities.php';
require_once ENGENTY_WIZARDS_DIR . 'includes/class-think.php';
require_once ENGENTY_WIZARDS_DIR . 'includes/class-step-error.php';
require_once ENGENTY_WIZARDS_DIR . 'includes/class-runs.php';
require_once ENGENTY_WIZARDS_DIR . 'includes/class-downloads.php';
require_once ENGENTY_WIZARDS_DIR . 'includes/class-embed.php';
require_once ENGENTY_WIZARDS_DIR . 'includes/class-rest.php';
require_once ENGENTY_WIZARDS_DIR . 'includes/class-admin.php';
require_once ENGENTY_WIZARDS_DIR . 'includes/class-block.php';
require_once ENGENTY_WIZARDS_DIR . 'includes/class-elementor.php';

/**
 * The tag that shows a wizard: echoes it where it is called.
 *
 * @param string $id   The wizard's link token or its ID (the code the mobile app takes).
 * @param array  $args `mode` (inline, modal, bubble), `label`, `text`, `color`.
 */
function engenty_wizard( $id, $args = array() ) {
	echo Engenty_Embed::tag( (string) $id, (array) $args ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- built from escaped parts.
}

register_activation_hook(
	__FILE__,
	static function () {
		foreach ( array( 'administrator', 'editor' ) as $name ) {
			$role = get_role( $name );
			if ( $role ) {
				$role->add_cap( ENGENTY_RESULTS_CAP );
			}
		}
		Engenty_Packages::create_tables();
		update_option( 'engenty_wizards_tables', Engenty_Packages::TABLE_VERSION, true );
		// The setup opens once after activation.
		set_transient( 'engenty_wizards_activated', 1, 60 );
	}
);

add_action(
	'plugins_loaded',
	static function () {
		// The plugin's own translations in languages/ (the scripts' through wp_set_script_translations); wordpress.org's language packs take over where they exist.
		load_plugin_textdomain( 'engenty-wizards', false, dirname( plugin_basename( __FILE__ ) ) . '/languages' );
		Engenty_Connect::init();
		Engenty_Packages::init();
		Engenty_Abilities::init();
		Engenty_Runs::init();
		Engenty_Embed::init();
		Engenty_Rest::init();
		Engenty_Admin::init();
		Engenty_Block::init();
		Engenty_Elementor::init();
	}
);
