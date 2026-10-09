#!/bin/sh
# Takes the runner package as built from the open repository beside this one (or from a release's
# runner.tgz) into vendor-runner/, and the templates that run on a site into wizards/.
#   sh bin/sync-runner.sh [path-to-engenty-wizards]
set -eu
cd "$(dirname "$0")/.."
OPEN="${1:-../engenty-wizards}"
[ -d "$OPEN/packages/runner/dist" ] || (cd "$OPEN" && pnpm --filter @engenty-wizards/runner build)
rm -rf vendor-runner && mkdir -p vendor-runner
cp -R "$OPEN/packages/runner/dist/." vendor-runner/
cp "$OPEN/packages/runner/LICENSE" vendor-runner/LICENSE
find vendor-runner -name '*.map' -delete
if [ -d "$OPEN/dist/templates" ]; then
	node - "$OPEN/dist/templates" <<'JS'
const { readFileSync, writeFileSync, copyFileSync, mkdirSync, readdirSync, unlinkSync } = require("node:fs");
const { join } = require("node:path");
const from = process.argv[2];
const index = JSON.parse(readFileSync(join(from, "index.json"), "utf8"));
mkdirSync("wizards", { recursive: true });
for (const f of readdirSync("wizards")) if (f.endsWith(".wizard")) unlinkSync(join("wizards", f));
const keep = index.templates.filter((t) => t.standalone && t.standalone.fit !== "no");
for (const t of keep) copyFileSync(join(from, t.file), join("wizards", t.file));
writeFileSync("wizards/index.json", JSON.stringify({ ...index, templates: keep }, null, 2) + "\n");
console.log(`${keep.length} templates into wizards/`);
JS
fi
echo "vendor-runner/ synced"
