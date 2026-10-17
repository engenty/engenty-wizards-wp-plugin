#!/bin/sh
# Force independent WordPress requests to reach their first lease insert together.
set -eu
ROOT=$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)
ENGENTY_COLD_LEASE_DIRECTORY=$(mktemp -d)
export ENGENTY_COLD_LEASE_DIRECTORY
trap 'rm -rf "$ENGENTY_COLD_LEASE_DIRECTORY"' EXIT
wp --path="$WP_PATH" eval 'global $wpdb; $name="engenty_lock_".hash("sha256","cold-claim-regression"); $wpdb->delete($wpdb->options,array("option_name"=>$name)); wp_cache_delete($name,"options");'
wp --path="$WP_PATH" eval-file "$ROOT/tests/cold-lease-worker.php" &
a=$!
wp --path="$WP_PATH" eval-file "$ROOT/tests/cold-lease-worker.php" &
b=$!
wait "$a"
wait "$b"
[ "$(grep -c '^won$' "$ENGENTY_COLD_LEASE_DIRECTORY/result")" = 1 ]
[ "$(grep -c '^busy$' "$ENGENTY_COLD_LEASE_DIRECTORY/result")" = 1 ]
printf '%s\n' 'PASS: simultaneous cold-cache inserts produce exactly one lease owner.'
