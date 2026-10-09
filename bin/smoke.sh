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

# --- standalone: a wizard that runs on the site itself, with a provider that answers canned ---
mu="$WP_PATH/wp-content/mu-plugins"
mkdir -p "$mu"
cp "$(dirname "$0")/fake-provider.php" "$mu/engenty-fake-provider.php"
$WP eval 'echo count(Engenty_Packages::bundled());' | grep -qv '^0$' || fail "no shipped wizards under wizards/"
token=$($WP eval '
$read = Engenty_Packages::read_bundled("web-faq");
$fit = array("fit" => "full");
foreach (Engenty_Packages::bundled() as $t) if ($t["id"] === "web-faq") $fit = $t["standalone"];
$row = Engenty_Packages::install((array) $read["definition"], $read["files"], $fit, "bundled", "web-faq");
if (is_wp_error($row)) { echo "ERR ", $row->get_error_message(); exit(1); }
echo $row["token"];')
echo "$token" | grep -qE '^[A-Za-z0-9]{22}$' || fail "the shipped wizard did not install: $token"
status=$($WP eval 'wp_set_current_user(1); $r = rest_do_request(new WP_REST_Request("GET", "/engenty/v1/status")); echo wp_json_encode($r->get_data()["local"]);')
echo "$status" | grep -q '"ready":true' || fail "the test provider is not seen as ready: $status"
# The browser's flow, one request each: start, the page, the thinking step, the result.
run=$($WP eval '
$req = new WP_REST_Request("POST", "/engenty/v1/local/wizards/'"$token"'/runs"); $req->set_header("content-type", "application/json"); $req->set_body(json_encode(["origin" => "http://localhost/test", "website" => ""]));
$res = rest_do_request($req); $d = $res->get_data(); if ($res->get_status() !== 200) { echo "ERR ", json_encode($d); exit(1); }
$id = $d["runId"]; $step = $d["view"]["step"]["id"];
$req = new WP_REST_Request("POST", "/engenty/v1/local/runs/$id/pages/$step"); $req->set_header("content-type", "application/json"); $req->set_body(json_encode(["values" => ["question" => "Habt ihr samstags offen?"]]));
$d = rest_do_request($req)->get_data(); if ($d["status"] !== "running") { echo "ERR after page: ", json_encode($d); exit(1); }
$req = new WP_REST_Request("POST", "/engenty/v1/local/runs/$id/steps/" . $d["step"]["id"]); $req->set_header("content-type", "application/json"); $req->set_body("{}");
$d = rest_do_request($req)->get_data(); echo $d["status"], " ", $id, " ", count($d["shown"]);')
echo "$run" | grep -q '^done ' || fail "the standalone run did not finish: $run"
runid=$(echo "$run" | cut -d' ' -f2)
report=$($WP eval 'wp_set_current_user(1); $r = rest_do_request(new WP_REST_Request("GET", "/engenty/v1/runs/'"$runid"'")); echo wp_json_encode($r->get_data());')
echo "$report" | grep -q '"local":true' || fail "Ergebnisse does not list the local run"
echo "$report" | grep -q 'Habt ihr samstags offen' || fail "the run's answers are missing"
tag=$($WP eval 'echo do_shortcode("[engenty_wizard id=\"'"$token"'\" mode=\"inline\"]");')
echo "$tag" | grep -q 'data-engenty-local="'"$token"'"' || fail "the shortcode does not render the runner for a standalone wizard"
echo "$tag" | grep -q 'instructions' && fail "a prompt leaked into the page"
# The seventh run of a visitor in an hour is refused.
sixth=$($WP eval '
for ($i = 0; $i < 7; $i++) { $req = new WP_REST_Request("POST", "/engenty/v1/local/wizards/'"$token"'/runs"); $req->set_header("content-type", "application/json"); $req->set_header("x-engenty-visitor", "limits"); $req->set_body(json_encode(["origin" => "x", "website" => ""])); $status = rest_do_request($req)->get_status(); }
echo $status;')
[ "$sixth" = "429" ] || fail "the seventh run in an hour was not refused ($sixth)"
rm -f "$mu/engenty-fake-provider.php"
echo "standalone ok"
