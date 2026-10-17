#!/bin/sh
# WP_PATH must point to a disposable WordPress with Wizards active.
set -eu
ROOT=$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)
OUT=$(mktemp)
trap 'rm -f "$OUT" "$OUT.ready"' EXIT
export ENGENTY_TEST_OUTPUT="$OUT" ENGENTY_TEST_MODE=lease
wp --path="$WP_PATH" eval-file "$ROOT/tests/concurrent-worker.php" &
a=$!
wp --path="$WP_PATH" eval-file "$ROOT/tests/concurrent-worker.php" &
b=$!
wait "$a"
wait "$b"
# Each PHP request has its own WordPress bootstrap and option cache.
[ "$(grep -c '^won$' "$OUT")" = 1 ]
[ "$(grep -c 'busy' "$OUT")" = 1 ]
: > "$OUT"
rm -f "$OUT.ready"
wp --path="$WP_PATH" eval 'global $wpdb; Engenty_Packages::create_tables(); $wpdb->query("DELETE FROM {$wpdb->prefix}engenty_upload_budgets"); $m=new ReflectionMethod(Engenty_Runs::class,"reserve_upload"); $m->setAccessible(true); Engenty_Storage::lock("upload-budgets"); for($i=0;$i<19;$i++) { if(!$m->invoke(null,array("id"=>"r_concurrent","visitor"=>"concurrent"),100))throw new Exception("Setup failed"); } Engenty_Storage::unlock("upload-budgets");'
export ENGENTY_TEST_MODE=budget
wp --path="$WP_PATH" eval-file "$ROOT/tests/concurrent-worker.php" &
a=$!
wp --path="$WP_PATH" eval-file "$ROOT/tests/concurrent-worker.php" &
b=$!
wait "$a"
wait "$b"
[ "$(grep -c '^allowed$' "$OUT")" = 1 ]
[ "$(grep -c '^denied$' "$OUT")" = 1 ]
wp --path="$WP_PATH" eval 'global $wpdb; $wpdb->query("DELETE FROM {$wpdb->prefix}engenty_upload_budgets");'
printf '%s\n' 'PASS: independent PHP workers arbitrate one lease and cannot cross the remaining upload quota.'
