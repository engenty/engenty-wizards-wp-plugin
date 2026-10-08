#!/bin/sh
# engenty-wizards.zip: what WordPress installs, built files included, sources of the build left out.
set -eu
cd "$(dirname "$0")/.."
[ -f build/admin.js ] || npm run build
rm -rf dist && mkdir -p dist/engenty-wizards
cp -R engenty-wizards.php uninstall.php readme.txt LICENSE includes blocks build languages dist/engenty-wizards/
rm -f engenty-wizards.zip
(cd dist && zip -qr ../engenty-wizards.zip engenty-wizards)
rm -rf dist
echo "engenty-wizards.zip"
