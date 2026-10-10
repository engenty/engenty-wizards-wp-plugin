#!/bin/sh
# engenty-wizards.zip: what WordPress installs, built files included, sources of the build left out.
set -eu
cd "$(dirname "$0")/.."
[ -f build/app.js ] || npm run build
rm -rf dist && mkdir -p dist/engenty-wizards
cp -R engenty-wizards.php uninstall.php readme.txt LICENSE includes blocks build languages wizards dist/engenty-wizards/
mkdir -p dist/engenty-wizards/vendor-runner && cp vendor-runner/LICENSE dist/engenty-wizards/vendor-runner/
find dist -name '.*' -type f -delete
rm -f engenty-wizards.zip
(cd dist && zip -qr ../engenty-wizards.zip engenty-wizards)
rm -rf dist
echo "engenty-wizards.zip"
