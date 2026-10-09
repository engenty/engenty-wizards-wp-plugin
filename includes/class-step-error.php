<?php
/**
 * A step that could not finish.
 *
 * @package Engenty_Wizards
 */

defined( 'ABSPATH' ) || exit;

/**
 * Its message is the run's error, retried by the visitor.
 */
class Engenty_Step_Error extends Exception {

	/**
	 * The HTTP status the cause suggests.
	 *
	 * @var int
	 */
	public $status = 502;
}
