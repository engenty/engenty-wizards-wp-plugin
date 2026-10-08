<?php
/**
 * The block `engenty/wizard`.
 *
 * @package Engenty_Wizards
 */

defined( 'ABSPATH' ) || exit;

/**
 * A dynamic block: the editor (src/block) picks the wizard and the way it shows, `render.php`
 * writes the tag on the page.
 */
class Engenty_Block {

	/** Registers the block. */
	public static function init() {
		add_action( 'init', array( __CLASS__, 'register' ) );
	}

	/** From blocks/wizard/block.json. */
	public static function register() {
		register_block_type( ENGENTY_WIZARDS_DIR . 'blocks/wizard' );
		wp_add_inline_script(
			'engenty-wizard-editor-script',
			'window.engentyWizards = Object.assign(window.engentyWizards || {}, ' . wp_json_encode(
				array(
					'connected' => Engenty_Settings::connected(),
					'setup'     => admin_url( 'admin.php?page=engenty' ),
					'wizards'   => admin_url( 'admin.php?page=engenty-wizards' ),
				)
			) . ');',
			'before'
		);
	}
}
