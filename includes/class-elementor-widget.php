<?php
/**
 * "engenty Wizard" in Elementor: the block's choices as controls.
 *
 * @package Engenty_Wizards
 */

defined( 'ABSPATH' ) || exit;

/**
 * The widget. Loaded only once Elementor registers widgets, so its base class is there.
 */
class Engenty_Elementor_Widget extends \Elementor\Widget_Base {

	/** Its id. */
	public function get_name() {
		return 'engenty-wizard';
	}

	/** Its name in the panel. */
	public function get_title() {
		return 'engenty Wizard';
	}

	/** Its icon in the panel. */
	public function get_icon() {
		return 'eicon-form-horizontal';
	}

	/** Where it is in the panel. */
	public function get_categories() {
		return array( 'general' );
	}

	/** What finds it. */
	public function get_keywords() {
		return array( 'engenty', 'wizard', 'formular', 'anfrage', 'ki', 'chat' );
	}

	/**
	 * The wizards to choose from, by token.
	 *
	 * @return array
	 */
	private function choices() {
		$list = Engenty_Settings::connected() ? Engenty_Client::wizards() : array();
		if ( is_wp_error( $list ) || ! $list ) {
			return array( '' => __( '— keine Wizards —', 'engenty-wizards' ) );
		}
		$choices = array( '' => __( '— Wizard wählen —', 'engenty-wizards' ) );
		foreach ( $list as $wizard ) {
			if ( ! empty( $wizard['token'] ) ) {
				$choices[ $wizard['token'] ] = $wizard['title'];
			}
		}
		return $choices;
	}

	/** The controls. */
	protected function register_controls() {
		$this->start_controls_section( 'wizard', array( 'label' => 'engenty' ) );
		if ( ! Engenty_Settings::connected() ) {
			$this->add_control(
				'connect',
				array(
					'type' => \Elementor\Controls_Manager::RAW_HTML,
					'raw'  => sprintf(
						'<p>%s</p><p><a class="elementor-button elementor-button-success" target="_blank" href="%s">%s</a></p>',
						esc_html__( 'Verbinde die Website kostenlos mit engenty.ai, dann stehen deine Wizards hier zur Wahl.', 'engenty-wizards' ),
						esc_url( admin_url( 'admin.php?page=engenty' ) ),
						esc_html__( 'Kostenlos verbinden', 'engenty-wizards' )
					),
				)
			);
		}
		$this->add_control(
			'token',
			array(
				'label'   => __( 'Wizard', 'engenty-wizards' ),
				'type'    => \Elementor\Controls_Manager::SELECT,
				'options' => $this->choices(),
				'default' => '',
			)
		);
		$this->add_control(
			'mode',
			array(
				'label'   => __( 'Darstellung', 'engenty-wizards' ),
				'type'    => \Elementor\Controls_Manager::SELECT,
				'options' => array(
					'inline' => __( 'Im Text', 'engenty-wizards' ),
					'modal'  => __( 'Button + Fenster', 'engenty-wizards' ),
					'bubble' => __( 'Blase unten rechts', 'engenty-wizards' ),
				),
				'default' => 'inline',
			)
		);
		$this->add_control(
			'label',
			array(
				'label'     => __( 'Beschriftung', 'engenty-wizards' ),
				'type'      => \Elementor\Controls_Manager::TEXT,
				'default'   => '',
				'condition' => array( 'mode!' => 'inline' ),
			)
		);
		$this->add_control(
			'text',
			array(
				'label'     => __( 'Zeile neben der Blase', 'engenty-wizards' ),
				'type'      => \Elementor\Controls_Manager::TEXT,
				'default'   => '',
				'condition' => array( 'mode' => 'bubble' ),
			)
		);
		$this->add_control(
			'color',
			array(
				'label'     => __( 'Farbe', 'engenty-wizards' ),
				'type'      => \Elementor\Controls_Manager::COLOR,
				'condition' => array( 'mode' => 'bubble' ),
			)
		);
		$this->end_controls_section();
	}

	/** On the page, and in Elementor's canvas. */
	protected function render() {
		$s = $this->get_settings_for_display();
		if ( empty( $s['token'] ) ) {
			if ( current_user_can( 'edit_posts' ) ) {
				echo Engenty_Embed::editor_hint( __( 'Wähle links einen Wizard.', 'engenty-wizards' ) ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
			}
			return;
		}
		$tag = Engenty_Embed::tag(
			$s['token'],
			array(
				'mode'  => $s['mode'],
				'label' => $s['label'],
				'text'  => $s['text'],
				'color' => $s['color'],
			)
		);
		echo $tag; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- built from escaped parts.
	}
}
