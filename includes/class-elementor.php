<?php
/**
 * The Elementor widget, where Elementor runs.
 *
 * @package Engenty_Wizards
 */

defined( 'ABSPATH' ) || exit;

/**
 * Registers "engenty Wizard" with Elementor; nothing happens without Elementor.
 */
class Engenty_Elementor {

	/** Hooks Elementor's registration. */
	public static function init() {
		add_action( 'elementor/widgets/register', array( __CLASS__, 'register' ) );
	}

	/**
	 * Registers the widget.
	 *
	 * @param \Elementor\Widgets_Manager $widgets Elementor's widgets.
	 */
	public static function register( $widgets ) {
		require_once ENGENTY_WIZARDS_DIR . 'includes/class-elementor-widget.php';
		$widgets->register( new Engenty_Elementor_Widget() );
	}
}
