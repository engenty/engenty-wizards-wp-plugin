#!/bin/sh
# Requires a served disposable WordPress, Chrome and Playwright (or PLAYWRIGHT_MODULE).
set -eu
ROOT=$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)
: "${WP_PATH:?Use a disposable WordPress installation}"
trap 'ENGENTY_SANDBOX_MODE=cleanup wp --path="$WP_PATH" eval-file "$ROOT/tests/sandbox-fixture.php"' EXIT
wp --path="$WP_PATH" eval-file "$ROOT/tests/sandbox-fixture.php"
node "$ROOT/tests/sandbox.cjs"
