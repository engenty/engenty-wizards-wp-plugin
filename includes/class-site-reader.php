<?php
/**
 * What the site says about itself: the base data engenty.ai takes into the space.
 *
 * @package Engenty_Wizards
 */

defined( 'ABSPATH' ) || exit;

/**
 * Reads the site from inside WordPress, so it works on a site nobody outside can reach yet
 * (staging, a password, maintenance mode): name, tagline, logo, the theme's colours, contact
 * details, the shop's address and its pages as text. `found()` is what the admin reviews;
 * `payload()` is what goes to `POST /api/v1/space/site` after the admin's choice.
 */
class Engenty_Site_Reader {

	const MAX_PAGES = 40;
	const MAX_CHARS = 20000;
	const MAX_LOGO  = 2000000;

	/**
	 * What the admin reviews before anything leaves the site.
	 *
	 * @return array
	 */
	public static function found() {
		$pages = array_map(
			static function ( $page ) {
				return array(
					'key'     => $page['key'],
					'title'   => $page['title'],
					'url'     => $page['url'],
					'role'    => $page['role'],
					'chars'   => strlen( $page['markdown'] ),
					'excerpt' => self::excerpt( $page['markdown'] ),
					'checked' => 'privacy' !== $page['role'],
				);
			},
			self::pages()
		);
		$logo  = self::logo();
		return array(
			'url'      => home_url( '/' ),
			'name'     => wp_specialchars_decode( get_bloginfo( 'name' ), ENT_QUOTES ),
			'tagline'  => wp_specialchars_decode( get_bloginfo( 'description' ), ENT_QUOTES ),
			'language' => get_locale(),
			'logo'     => $logo ? array(
				'name' => $logo['name'],
				'url'  => $logo['url'],
			) : null,
			'colors'   => self::colors(),
			'facts'    => self::facts(),
			'pages'    => $pages,
			'shop'     => class_exists( 'WooCommerce' ),
		);
	}

	/**
	 * What engenty.ai gets: the admin's choice of facts and pages, the pages' whole text.
	 *
	 * @param array $choice `name`, `tagline`, `facts` [{label, value}], `pages` [keys], `logo` bool, `colors` bool.
	 * @return array
	 */
	public static function payload( array $choice ) {
		$keys  = array_map( 'strval', (array) ( $choice['pages'] ?? array() ) );
		$pages = array_values(
			array_filter(
				self::pages(),
				static function ( $page ) use ( $keys ) {
					return in_array( $page['key'], $keys, true );
				}
			)
		);
		$facts = array();
		foreach ( (array) ( $choice['facts'] ?? array() ) as $fact ) {
			$label = sanitize_text_field( (string) ( $fact['label'] ?? '' ) );
			$value = sanitize_textarea_field( (string) ( $fact['value'] ?? '' ) );
			if ( '' !== $label && '' !== $value ) {
				$facts[] = array(
					'label' => mb_substr( $label, 0, 80 ),
					'value' => mb_substr( $value, 0, 4000 ),
				);
			}
		}
		$payload = array(
			'url'      => home_url( '/' ),
			'name'     => mb_substr( sanitize_text_field( (string) ( $choice['name'] ?? get_bloginfo( 'name' ) ) ), 0, 120 ),
			'tagline'  => mb_substr( sanitize_text_field( (string) ( $choice['tagline'] ?? get_bloginfo( 'description' ) ) ), 0, 500 ),
			'language' => get_locale(),
			'facts'    => array_slice( $facts, 0, 40 ),
			'colors'   => ! empty( $choice['colors'] ) ? self::colors() : array(),
			'pages'    => array_map(
				static function ( $page ) {
					return array(
						'key'      => $page['key'],
						'title'    => $page['title'],
						'url'      => $page['url'],
						'role'     => $page['role'],
						'markdown' => $page['markdown'],
					);
				},
				$pages
			),
		);
		if ( ! empty( $choice['logo'] ) ) {
			$logo = self::logo();
			if ( $logo && ! empty( $logo['data'] ) ) {
				$payload['logo'] = array(
					'name' => $logo['name'],
					'mime' => $logo['mime'],
					'data' => $logo['data'],
				);
			}
		}
		return $payload;
	}

	/**
	 * The logo: the theme's custom logo, else the site icon. With its file as base64 for `payload`.
	 *
	 * @return array|null
	 */
	public static function logo() {
		$id = (int) get_theme_mod( 'custom_logo' );
		if ( ! $id ) {
			$id = (int) get_option( 'site_icon' );
		}
		if ( ! $id ) {
			return null;
		}
		$file = get_attached_file( $id );
		$mime = (string) get_post_mime_type( $id );
		if ( ! $file || ! is_readable( $file ) || ! str_starts_with( $mime, 'image/' ) || filesize( $file ) > self::MAX_LOGO ) {
			return null;
		}
		return array(
			'name' => wp_basename( $file ),
			'mime' => $mime,
			'url'  => (string) wp_get_attachment_url( $id ),
			'data' => base64_encode( (string) file_get_contents( $file ) ), // phpcs:ignore WordPress.PHP.DiscouragedPHPFunctions.obfuscation_base64_encode, WordPress.WP.AlternativeFunctions.file_get_contents_file_get_contents
		);
	}

	/**
	 * The theme's palette (theme.json), as #rrggbb, at most six.
	 *
	 * @return array
	 */
	public static function colors() {
		if ( ! function_exists( 'wp_get_global_settings' ) ) {
			return array();
		}
		$palette = wp_get_global_settings( array( 'color', 'palette' ) );
		$list    = array();
		foreach ( array( 'custom', 'theme' ) as $origin ) {
			if ( ! empty( $palette[ $origin ] ) && is_array( $palette[ $origin ] ) ) {
				$list = $palette[ $origin ];
				break;
			}
		}
		$colors = array();
		foreach ( $list as $entry ) {
			$hex = self::hex( (string) ( $entry['color'] ?? '' ) );
			if ( $hex && ! in_array( $hex, array_column( $colors, 'value' ), true ) ) {
				$colors[] = array(
					'name'  => mb_substr( (string) ( $entry['name'] ?? $entry['slug'] ?? $hex ), 0, 120 ),
					'value' => $hex,
				);
			}
		}
		// Coloured ones first: a palette usually starts with base and contrast.
		usort(
			$colors,
			static function ( $a, $b ) {
				return self::chroma( $b['value'] ) <=> self::chroma( $a['value'] );
			}
		);
		return array_slice( $colors, 0, 6 );
	}

	/**
	 * A CSS colour as #rrggbb, or null.
	 *
	 * @param string $value A colour.
	 * @return string|null
	 */
	private static function hex( $value ) {
		$v = strtolower( trim( $value ) );
		if ( preg_match( '/^#([0-9a-f])([0-9a-f])([0-9a-f])$/', $v, $m ) ) {
			return "#{$m[1]}{$m[1]}{$m[2]}{$m[2]}{$m[3]}{$m[3]}";
		}
		if ( preg_match( '/^#[0-9a-f]{6}$/', $v ) ) {
			return $v;
		}
		if ( preg_match( '/^#([0-9a-f]{6})[0-9a-f]{2}$/', $v, $m ) ) {
			return '#' . $m[1];
		}
		if ( preg_match( '/^rgba?\(\s*(\d{1,3})[\s,]+(\d{1,3})[\s,]+(\d{1,3})/', $v, $m ) ) {
			return sprintf( '#%02x%02x%02x', min( 255, (int) $m[1] ), min( 255, (int) $m[2] ), min( 255, (int) $m[3] ) );
		}
		return null;
	}

	/**
	 * How far a colour is from grey.
	 *
	 * @param string $hex #rrggbb.
	 * @return int
	 */
	private static function chroma( $hex ) {
		$rgb = array_map( 'hexdec', str_split( substr( $hex, 1 ), 2 ) );
		return max( $rgb ) - min( $rgb );
	}

	/**
	 * What the site states plainly: the shop's address and e-mail, an e-mail and a phone number
	 * from the imprint or the contact page. `checked`: proposed for sending.
	 *
	 * @return array
	 */
	public static function facts() {
		$facts = array();
		$add   = static function ( $label, $value, $checked = true ) use ( &$facts ) {
			$value = trim( (string) $value );
			if ( '' !== $value && ! in_array( $label, array_column( $facts, 'label' ), true ) ) {
				$facts[] = array(
					'label'   => $label,
					'value'   => $value,
					'checked' => $checked,
				);
			}
		};
		if ( class_exists( 'WooCommerce' ) ) {
			$street  = trim( get_option( 'woocommerce_store_address', '' ) . ' ' . get_option( 'woocommerce_store_address_2', '' ) );
			$city    = trim( get_option( 'woocommerce_store_postcode', '' ) . ' ' . get_option( 'woocommerce_store_city', '' ) );
			$country = (string) get_option( 'woocommerce_default_country', '' );
			$add( __( 'Address', 'engenty-wizards' ), implode( ', ', array_filter( array( $street, $city, strtok( $country, ':' ) ) ) ) );
			$add( __( 'Email', 'engenty-wizards' ), get_option( 'woocommerce_email_from_address', '' ) );
			$add( __( 'Currency', 'engenty-wizards' ), get_option( 'woocommerce_currency', '' ) );
		}
		foreach ( self::pages() as $page ) {
			if ( ! in_array( $page['role'], array( 'imprint', 'contact' ), true ) ) {
				continue;
			}
			if ( preg_match( '/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i', $page['markdown'], $m ) ) {
				$add( __( 'Email', 'engenty-wizards' ), $m[0] );
			}
			if ( preg_match( '/(?:Tel(?:efon)?\.?|Phone|Fon)\s*:?\s*(\+?[\d][\d \/().-]{6,}\d)/iu', $page['markdown'], $m ) ) {
				$add( __( 'Phone', 'engenty-wizards' ), $m[1] );
			}
		}
		// The admin's address is often a person's own: offered, not proposed.
		$add( __( 'Email', 'engenty-wizards' ), get_option( 'admin_email', '' ), false );
		return $facts;
	}

	/**
	 * The published pages as Markdown, the front page first, at most forty; with the shop's
	 * products as one more page where WooCommerce runs.
	 *
	 * @return array
	 */
	public static function pages() {
		static $pages = null;
		if ( null !== $pages ) {
			return $pages;
		}
		$front   = (int) get_option( 'page_on_front' );
		$privacy = (int) get_option( 'wp_page_for_privacy_policy' );
		$posts   = get_posts(
			array(
				'post_type'        => 'page',
				'post_status'      => 'publish',
				'numberposts'      => self::MAX_PAGES,
				'orderby'          => array(
					'menu_order' => 'ASC',
					'date'       => 'ASC',
				),
				'has_password'     => false,
				'suppress_filters' => false,
			)
		);
		usort(
			$posts,
			static function ( $a, $b ) use ( $front ) {
				return (int) ( $b->ID === $front ) <=> (int) ( $a->ID === $front );
			}
		);
		$pages = array();
		foreach ( $posts as $post ) {
			$markdown = self::markdown( (string) $post->post_content );
			if ( '' === trim( $markdown ) ) {
				continue;
			}
			$pages[] = array(
				'key'      => 'page:' . $post->ID,
				'title'    => wp_specialchars_decode( get_the_title( $post ), ENT_QUOTES ),
				'url'      => (string) get_permalink( $post ),
				'role'     => $post->ID === $front ? 'front' : ( $post->ID === $privacy ? 'privacy' : self::role( $post ) ),
				'markdown' => mb_substr( $markdown, 0, self::MAX_CHARS ),
			);
		}
		$products = self::products();
		if ( $products ) {
			$pages[] = $products;
		}
		return $pages;
	}

	/**
	 * What a page is to the site, by its slug and title.
	 *
	 * @param WP_Post $post The page.
	 * @return string
	 */
	private static function role( $post ) {
		$name = strtolower( $post->post_name . ' ' . $post->post_title );
		$map  = array(
			'imprint' => '/impressum|imprint|legal-notice|mentions-legales|colofon/',
			'privacy' => '/datenschutz|privacy|privacidad|confidentialite/',
			'contact' => '/kontakt|contact|anfahrt/',
			'about'   => '/ueber-uns|uber-uns|über uns|about|team|wir-sind|unternehmen/',
		);
		foreach ( $map as $role => $pattern ) {
			if ( preg_match( $pattern, $name ) ) {
				return $role;
			}
		}
		return 'page';
	}

	/**
	 * The shop's products as one page: name, price, what it is, where it is.
	 *
	 * @return array|null
	 */
	private static function products() {
		if ( ! function_exists( 'wc_get_products' ) ) {
			return null;
		}
		$products = wc_get_products(
			array(
				'status' => 'publish',
				'limit'  => 60,
			)
		);
		if ( ! $products ) {
			return null;
		}
		$lines = array();
		foreach ( $products as $product ) {
			$price   = wp_strip_all_tags( html_entity_decode( (string) $product->get_price_html(), ENT_QUOTES ) );
			$short   = self::markdown( (string) $product->get_short_description() );
			$lines[] = sprintf( "## %s\n\n%s%s\n\n%s", $product->get_name(), $price ? "Preis: {$price}\n" : '', $product->get_permalink(), $short );
		}
		return array(
			'key'      => 'products',
			'title'    => __( 'Products', 'engenty-wizards' ),
			'url'      => function_exists( 'wc_get_page_permalink' ) ? (string) wc_get_page_permalink( 'shop' ) : home_url( '/' ),
			'role'     => 'product',
			'markdown' => mb_substr( implode( "\n\n", $lines ), 0, self::MAX_CHARS * 2 ),
		);
	}

	/**
	 * A page's content as Markdown: blocks rendered, shortcodes left out, the text kept with its
	 * headings, lists and links.
	 *
	 * @param string $content Post content.
	 * @return string
	 */
	public static function markdown( $content ) {
		$html = function_exists( 'do_blocks' ) ? do_blocks( $content ) : $content;
		$html = strip_shortcodes( $html );
		$html = preg_replace( '#<(script|style|noscript|svg|form|iframe)\b[^>]*>.*?</\1>#is', '', $html );
		$html = preg_replace_callback(
			'#<h([1-6])\b[^>]*>(.*?)</h\1>#is',
			static function ( $m ) {
				return "\n\n" . str_repeat( '#', (int) $m[1] ) . ' ' . trim( wp_strip_all_tags( $m[2] ) ) . "\n\n";
			},
			$html
		);
		$html = preg_replace_callback(
			'#<a\b[^>]*href=["\']([^"\']+)["\'][^>]*>(.*?)</a>#is',
			static function ( $m ) {
				$text = trim( wp_strip_all_tags( $m[2] ) );
				$href = $m[1];
				if ( '' === $text || str_starts_with( $href, '#' ) || str_starts_with( $href, 'javascript:' ) ) {
					return $text;
				}
				return $text === $href || 'mailto:' . $text === $href ? $text : "[{$text}]({$href})";
			},
			$html
		);
		$html = preg_replace( '#<li\b[^>]*>#i', "\n- ", $html );
		$html = preg_replace( '#<br\s*/?>#i', "\n", $html );
		$html = preg_replace( '#</(p|div|section|ul|ol|table|tr|blockquote|figure)>#i', "\n\n", $html );
		$html = preg_replace( '#</t[dh]>#i', ' | ', $html );
		$text = html_entity_decode( wp_strip_all_tags( $html ), ENT_QUOTES | ENT_HTML5, 'UTF-8' );
		$text = preg_replace( "/[ \t]+/", ' ', $text );
		$text = preg_replace( "/ *\n */", "\n", $text );
		$text = preg_replace( "/\n{3,}/", "\n\n", $text );
		return trim( $text );
	}

	/**
	 * The first words of a page for the review.
	 *
	 * @param string $markdown The page.
	 * @return string
	 */
	private static function excerpt( $markdown ) {
		$plain = trim( preg_replace( '/\s+/', ' ', preg_replace( '/^#+ /m', '', $markdown ) ) );
		return mb_strlen( $plain ) > 180 ? mb_substr( $plain, 0, 180 ) . '…' : $plain;
	}
}
