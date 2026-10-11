<?php
/**
 * A standalone step's output as a file: html, md, txt, csv, json — made here, nothing leaves the site.
 *
 * @package Engenty_Wizards
 */

defined( 'ABSPATH' ) || exit;

/**
 * What the result step offers of a text or JSON output. A document a step wrote is its own
 * HTML file. A PDF of a written output the runner makes in the browser; the HTML made here is
 * the page to print, and a document's PDF is the browser's print of its HTML.
 */
class Engenty_Downloads {

	/**
	 * The file for a format, or why not.
	 *
	 * @param array  $run    The run.
	 * @param array  $w      The wizard.
	 * @param array  $step   The step.
	 * @param array  $output Its output.
	 * @param string $format html | md | txt | csv | json.
	 * @return array|WP_Error `{ text, mime, name }` or `{ path, mime, name }`.
	 */
	public static function make( array $run, array $w, array $step, array $output, $format ) {
		$base = sanitize_file_name( $w['title'] . ' – ' . $step['title'] );
		if ( 'generate' === $step['type'] ) {
			foreach ( (array) ( $output['assets'] ?? array() ) as $a ) {
				if ( 'text/html' === ( $a['mime'] ?? '' ) && 'html' === $format ) {
					$path = Engenty_Runs::asset_path( $run['id'], $a['id'] );
					if ( $path ) {
						return array(
							'path' => $path,
							'mime' => 'text/html',
							'name' => $base . '.html',
						);
					}
				}
			}
			return new WP_Error( 'engenty_not_found', __( 'This format does not exist here.', 'engenty-wizards' ), array( 'status' => 404 ) );
		}
		if ( 'surface' === $step['type'] ) {
			return array(
				'text' => (string) wp_json_encode( $output['surface']['data'] ?? new stdClass(), JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE ),
				'mime' => 'application/json',
				'name' => $base . '.json',
			);
		}
		$json = $output['json'] ?? null;
		$text = (string) ( $output['text'] ?? '' );
		switch ( $format ) {
			case 'pdf':
				return new WP_Error( 'engenty_not_found', __( 'The PDF is made in the browser, not on this site.', 'engenty-wizards' ), array( 'status' => 404 ) );
			case 'json':
				if ( null === $json ) {
					break;
				}
				return array(
					'text' => (string) wp_json_encode( $json, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE ),
					'mime' => 'application/json',
					'name' => $base . '.json',
				);
			case 'csv':
				$rows = self::first_table( $json );
				if ( null === $rows ) {
					break;
				}
				return array(
					'text' => self::csv( $rows ),
					'mime' => 'text/csv',
					'name' => $base . '.csv',
				);
			case 'md':
				return array(
					'text' => null !== $json && '' === $text ? self::json_as_markdown( $step, $json ) : $text,
					'mime' => 'text/markdown',
					'name' => $base . '.md',
				);
			case 'txt':
				return array(
					'text' => '' !== $text ? $text : self::json_as_markdown( $step, $json ),
					'mime' => 'text/plain',
					'name' => $base . '.txt',
				);
			case 'html':
				$md = '' !== $text ? $text : self::json_as_markdown( $step, $json );
				return array(
					'text' => self::page( $step['title'], self::body( $step, $json, $md ) ),
					'mime' => 'text/html',
					'name' => $base . '.html',
				);
		}
		return new WP_Error( 'engenty_not_found', __( 'This format does not exist here.', 'engenty-wizards' ), array( 'status' => 404 ) );
	}

	/**
	 * The HTML of a text output: Markdown rendered, plain text in a paragraph.
	 *
	 * @param array  $step The step.
	 * @param mixed  $json Its structured output, if any.
	 * @param string $md  The text.
	 * @return string
	 */
	private static function body( array $step, $json, $md ) {
		$format = $step['output']['format'] ?? 'markdown';
		if ( 'markdown' === $format || null !== $json ) {
			return self::markdown( $md );
		}
		return '<p>' . nl2br( esc_html( $md ) ) . '</p>';
	}

	/**
	 * The first table in a structured output: a list of records.
	 *
	 * @param mixed $json The output.
	 * @return array|null
	 */
	private static function first_table( $json ) {
		if ( ! is_array( $json ) ) {
			return null;
		}
		foreach ( $json as $value ) {
			if ( is_array( $value ) && array_is_list( $value ) && isset( $value[0] ) && is_array( $value[0] ) ) {
				return $value;
			}
		}
		return null;
	}

	/**
	 * Records as CSV with a header of every key.
	 *
	 * @param array $rows The records.
	 * @return string
	 */
	private static function csv( array $rows ) {
		$cols = array();
		foreach ( $rows as $r ) {
			foreach ( array_keys( (array) $r ) as $k ) {
				$cols[ $k ] = true;
			}
		}
		$cols = array_keys( $cols );
		$out  = fopen( 'php://temp', 'r+' ); // phpcs:ignore WordPress.WP.AlternativeFunctions.file_system_operations_fopen -- memory only.
		fputcsv( $out, $cols, ';', '"', '' );
		foreach ( $rows as $r ) {
			$line = array();
			foreach ( $cols as $c ) {
				$v      = ( (array) $r )[ $c ] ?? '';
				$line[] = is_array( $v ) ? wp_json_encode( $v, JSON_UNESCAPED_UNICODE ) : (string) ( is_bool( $v ) ? ( $v ? 'true' : 'false' ) : $v );
			}
			fputcsv( $out, $line, ';', '"', '' );
		}
		rewind( $out );
		$csv = (string) stream_get_contents( $out );
		fclose( $out ); // phpcs:ignore WordPress.WP.AlternativeFunctions.file_system_operations_fclose -- memory only.
		return "\xEF\xBB\xBF" . $csv;
	}

	/**
	 * A structured output as Markdown: a heading per field, lists and tables as such.
	 *
	 * @param array $step The step.
	 * @param mixed $json The output.
	 * @return string
	 */
	public static function json_as_markdown( array $step, $json ) {
		if ( ! is_array( $json ) ) {
			return Engenty_Think::stringify( $json );
		}
		$labels = array();
		foreach ( (array) ( $step['output']['fields'] ?? array() ) as $f ) {
			$labels[ $f['id'] ] = $f['description'] ?? $f['id'];
		}
		$parts = array();
		foreach ( $json as $key => $value ) {
			$title = $labels[ $key ] ?? $key;
			if ( is_bool( $value ) ) {
				$parts[] = "## {$title}\n\n" . ( $value ? 'Ja' : 'Nein' );
			} elseif ( is_scalar( $value ) || null === $value ) {
				$parts[] = "## {$title}\n\n" . (string) $value;
			} elseif ( is_array( $value ) && array_is_list( $value ) && isset( $value[0] ) && is_array( $value[0] ) ) {
				$cols = array();
				foreach ( $value as $r ) {
					foreach ( array_keys( (array) $r ) as $k ) {
						$cols[ $k ] = true;
					}
				}
				$cols  = array_keys( $cols );
				$lines = array( '| ' . implode( ' | ', $cols ) . ' |', '|' . str_repeat( ' --- |', count( $cols ) ) );
				foreach ( $value as $r ) {
					$cells = array();
					foreach ( $cols as $c ) {
						$v       = ( (array) $r )[ $c ] ?? '';
						$cells[] = str_replace( '|', '\|', Engenty_Think::stringify( $v ) );
					}
					$lines[] = '| ' . implode( ' | ', $cells ) . ' |';
				}
				$parts[] = "## {$title}\n\n" . implode( "\n", $lines );
			} elseif ( is_array( $value ) && array_is_list( $value ) ) {
				$parts[] = "## {$title}\n\n" . implode(
					"\n",
					array_map(
						static function ( $x ) {
							return '- ' . Engenty_Think::stringify( $x );
						},
						$value
					)
				);
			} else {
				$parts[] = "## {$title}\n\n```json\n" . wp_json_encode( $value, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE ) . "\n```";
			}
		}
		return implode( "\n\n", $parts );
	}

	/**
	 * A small Markdown to HTML: headings, paragraphs, lists, tables, bold, italics, links, code.
	 *
	 * @param string $md The Markdown.
	 * @return string
	 */
	public static function markdown( $md ) {
		$lines = preg_split( '/\r?\n/', $md );
		$html  = array();
		$list  = null;
		$table = array();
		$para  = array();
		$code  = false;
		$flush = static function () use ( &$html, &$list, &$table, &$para ) {
			if ( $para ) {
				$html[] = '<p>' . self::inline( implode( ' ', $para ) ) . '</p>';
				$para   = array();
			}
			if ( $list ) {
				$html[] = '</' . $list . '>';
				$list   = null;
			}
			if ( $table ) {
				$rows = array_values(
					array_filter(
						$table,
						static function ( $r ) {
							return ! preg_match( '/^\|?\s*:?-{2,}/', $r );
						}
					)
				);
				$out  = '<table>';
				foreach ( $rows as $i => $r ) {
					$cells = array_map( 'trim', explode( '|', trim( $r, '| ' ) ) );
					$tag   = 0 === $i ? 'th' : 'td';
					$out  .= '<tr>' . implode(
						'',
						array_map(
							static function ( $c ) use ( $tag ) {
								return "<{$tag}>" . self::inline( $c ) . "</{$tag}>";
							},
							$cells
						)
					) . '</tr>';
				}
				$html[] = $out . '</table>';
				$table  = array();
			}
		};
		foreach ( $lines as $line ) {
			if ( str_starts_with( trim( $line ), '```' ) ) {
				$flush();
				$code   = ! $code;
				$html[] = $code ? '<pre><code>' : '</code></pre>';
				continue;
			}
			if ( $code ) {
				$html[] = esc_html( $line );
				continue;
			}
			if ( preg_match( '/^(#{1,6})\s+(.*)$/', $line, $m ) ) {
				$flush();
				$n      = strlen( $m[1] );
				$html[] = "<h{$n}>" . self::inline( $m[2] ) . "</h{$n}>";
				continue;
			}
			if ( preg_match( '/^\s*[-*]\s+(.*)$/', $line, $m ) ) {
				if ( 'ul' !== $list ) {
					$flush();
					$list   = 'ul';
					$html[] = '<ul>';
				}
				$html[] = '<li>' . self::inline( $m[1] ) . '</li>';
				continue;
			}
			if ( preg_match( '/^\s*\d+[.)]\s+(.*)$/', $line, $m ) ) {
				if ( 'ol' !== $list ) {
					$flush();
					$list   = 'ol';
					$html[] = '<ol>';
				}
				$html[] = '<li>' . self::inline( $m[1] ) . '</li>';
				continue;
			}
			if ( str_starts_with( trim( $line ), '|' ) ) {
				if ( $para || $list ) {
					$flush();
				}
				$table[] = $line;
				continue;
			}
			if ( '' === trim( $line ) ) {
				$flush();
				continue;
			}
			if ( $list || $table ) {
				$flush();
			}
			$para[] = trim( $line );
		}
		$flush();
		return implode( "\n", $html );
	}

	/**
	 * Inline Markdown: code, bold, italics, links; everything else escaped.
	 *
	 * @param string $text The text.
	 * @return string
	 */
	private static function inline( $text ) {
		$out = esc_html( $text );
		$out = preg_replace( '/`([^`]+)`/', '<code>$1</code>', $out );
		$out = preg_replace( '/\*\*([^*]+)\*\*/', '<strong>$1</strong>', $out );
		$out = preg_replace( '/(?<![*\w])\*([^*]+)\*(?![*\w])/', '<em>$1</em>', $out );
		$out = preg_replace_callback(
			'/\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/',
			static function ( $m ) {
				return '<a href="' . esc_url( html_entity_decode( $m[2] ) ) . '">' . $m[1] . '</a>';
			},
			$out
		);
		return $out;
	}

	/**
	 * A page around a result: the site's name, the title, a calm style, and the browser's print
	 * dialog — where "Save as PDF" lives on every system. Opened in a tab of its own, the dialog
	 * comes up by itself; a button stays for a second go and is not printed.
	 *
	 * @param string $title The title.
	 * @param string $body  The body's HTML.
	 * @return string
	 */
	private static function page( $title, $body ) {
		$site  = esc_html( wp_specialchars_decode( get_bloginfo( 'name' ), ENT_QUOTES ) );
		$print = esc_html__( 'Print or save as PDF', 'engenty-wizards' );
		return '<!doctype html><html lang="' . esc_attr( substr( get_locale(), 0, 2 ) ) . '"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>' . esc_html( $title ) . ' · ' . $site . '</title>'
			. '<style>body{max-width:760px;margin:40px auto;padding:0 24px;font:16px/1.6 -apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;color:#282623}h1,h2,h3{line-height:1.25}table{border-collapse:collapse;width:100%}th,td{border-bottom:1px solid #dbd9d6;padding:6px 8px;text-align:left}code{background:#eae7e4;padding:1px 4px;border-radius:4px}pre{overflow:auto;background:#f7f5f2;padding:12px;border-radius:8px}.foot{margin-top:40px;color:#81807e;font-size:13px}'
			. '.print{position:fixed;top:16px;right:16px;border:0;border-radius:999px;background:#282623;color:#fff;font:600 14px/1 -apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;padding:12px 18px;cursor:pointer}'
			. '@page{size:A4;margin:18mm 16mm}@media print{body{max-width:none;margin:0;padding:0;font-size:12pt}.print{display:none}a{color:inherit;text-decoration:none}tr,li,pre{break-inside:avoid}h1,h2,h3{break-after:avoid}}</style></head>'
			. '<body><button type="button" class="print" onclick="window.print()">' . $print . '</button><h1>' . esc_html( $title ) . '</h1>' . $body . '<p class="foot">' . $site . ' · ' . esc_html( date_i18n( get_option( 'date_format' ) ) ) . '</p>'
			. '<script>addEventListener("load",function(){setTimeout(function(){window.print()},300)})</script></body></html>';
	}
}
