<?php
/**
 * The block on the page: the wizard's tag.
 *
 * @package Engenty_Wizards
 *
 * @var array $attributes The block's attributes.
 */

defined( 'ABSPATH' ) || exit;

if ( empty( $attributes['token'] ) ) {
	echo current_user_can( 'edit_posts' ) ? Engenty_Embed::editor_hint( __( 'Im Block ist noch kein Wizard gewählt.', 'engenty-wizards' ) ) : ''; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
	return;
}
$engenty_tag = Engenty_Embed::tag(
	$attributes['token'],
	array(
		'mode'  => $attributes['mode'] ?? 'inline',
		'label' => $attributes['label'] ?? '',
		'text'  => $attributes['text'] ?? '',
		'color' => $attributes['color'] ?? '',
	)
);
// phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- the wrapper's attributes come escaped, the tag is built from escaped parts.
printf( '<div %s>%s</div>', get_block_wrapper_attributes(), $engenty_tag );
