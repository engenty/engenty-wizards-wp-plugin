#!/bin/sh
# Checks the plugin inside a real WordPress, without a connection to engenty.ai:
#   WP_PATH=/path/to/wordpress sh bin/smoke.sh
# The plugin must be installed there (a link to this folder will do).
set -eu
WP="wp --path=${WP_PATH:?WP_PATH is the WordPress folder}"
fail() { echo "FAIL: $1"; exit 1; }

$WP plugin is-active engenty-wizards || fail "the plugin is not active"

routes=$($WP eval 'echo implode(" ", array_keys(rest_get_server()->get_routes("engenty/v1")));')
for r in status connect site wizards templates runs contacts appointments settings pages; do
	echo "$routes" | grep -q "/engenty/v1/$r" || fail "REST route $r is missing"
done

tag=$($WP eval 'echo do_shortcode("[engenty_wizard id=\"tok_1234567890ab\" mode=\"modal\" label=\"Los\"]");')
echo "$tag" | grep -q 'src="[^"]*/embed.js"' || fail "the shortcode writes no embed tag"
echo "$tag" | grep -q 'data-wizard="tok_1234567890ab"' || fail "the shortcode lost the token"
echo "$tag" | grep -q 'data-mode="modal"' || fail "the shortcode lost the mode"
echo "$tag" | grep -q 'data-source="wordpress"' || fail "the tag does not say wordpress"

inline=$($WP eval 'echo Engenty_Embed::tag("tok_1234567890ab", array("mode" => "inline", "label" => "x"));')
echo "$inline" | grep -q 'data-label' && fail "an inline tag carries a label"

$WP eval 'echo WP_Block_Type_Registry::get_instance()->is_registered("engenty/wizard") ? "" : "missing";' | grep -q missing && fail "the block is not registered"

md=$($WP eval 'echo Engenty_Site_Reader::markdown("<h2>Leistungen</h2><ul><li>Wallbox</li><li><a href=\"https://x.test/pv\">Photovoltaik</a></li></ul><script>bad()</script>");')
echo "$md" | grep -q '^## Leistungen' || fail "headings do not become Markdown"
echo "$md" | grep -q '^- Wallbox' || fail "lists do not become Markdown"
echo "$md" | grep -q '\[Photovoltaik\](https://x.test/pv)' || fail "links do not become Markdown"
echo "$md" | grep -q 'bad()' && fail "scripts are kept"

found=$($WP eval 'echo wp_json_encode(Engenty_Site_Reader::found());')
echo "$found" | grep -q '"pages"' || fail "the site reader finds no pages"

echo "ok"
