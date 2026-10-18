#!/bin/sh
# Brings the open repository's runner package into vendor-runner/ and the templates that run on a
# site into wizards/, from a release of https://github.com/engenty/wizards:
#   sh bin/sync-runner.sh v0.8.0
# Every release publishes runner.tgz (the package @engenty-wizards/runner as built: dist/, LICENSE,
# README.md, package.json) and templates.tgz (templates/ with index.json and the .wizard files).
# vendor-runner/ gets dist/ and LICENSE, no source maps; vendor-runner/VERSION keeps the tag.
# For work against unreleased code, a checkout of the open repository, built there:
#   sh bin/sync-runner.sh --from ../engenty-wizards
set -eu
cd "$(dirname "$0")/.."

REPO="engenty/wizards"
RELEASES="https://github.com/$REPO/releases"

usage() {
	cat >&2 <<EOF
usage: sh bin/sync-runner.sh <tag>            a release of $REPO, e.g. v0.8.0
       sh bin/sync-runner.sh --from <path>    a checkout of the open repository beside this one
EOF
	exit 2
}

# The runner package: the contents of its dist/ and its LICENSE, nothing else.
take_runner() { # take_runner <dist> <LICENSE>
	rm -rf vendor-runner && mkdir -p vendor-runner
	cp -R "$1/." vendor-runner/
	cp "$2" vendor-runner/LICENSE
	find vendor-runner -name '*.map' -delete
}

# The templates whose standalone fit is not "no", and index.json with those entries only.
take_templates() { # take_templates <folder with index.json>
	node - "$1" <<'JS'
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
}

# A release asset into a file: curl; gh as the alternative where curl cannot get it.
fetch() { # fetch <tag> <asset> <into>
	if command -v curl >/dev/null 2>&1 && curl -fsSL -o "$3" "$RELEASES/download/$1/$2"; then
		return 0
	fi
	if command -v gh >/dev/null 2>&1; then
		echo "curl did not get $2 from $RELEASES/download/$1/; trying gh release download" >&2
		gh release download "$1" -R "$REPO" -p "$2" -O "$3" --clobber && return 0
	fi
	echo "could not download $RELEASES/download/$1/$2" >&2
	exit 1
}

[ $# -ge 1 ] || usage
case "$1" in
--from)
	# Unreleased work: the open repository beside this one, built there if it is not.
	OPEN="${2:?--from needs the path of the checkout}"
	[ -d "$OPEN/packages/runner" ] || { echo "$OPEN is not a checkout of the open repository" >&2; exit 1; }
	[ -d "$OPEN/packages/runner/dist" ] || (cd "$OPEN" && pnpm --filter @engenty-wizards/runner build)
	take_runner "$OPEN/packages/runner/dist" "$OPEN/packages/runner/LICENSE"
	if [ -d "$OPEN/dist/templates" ]; then take_templates "$OPEN/dist/templates"; fi
	(git -C "$OPEN" describe --tags --always --dirty 2>/dev/null || echo local) > vendor-runner/VERSION
	;;
-*)
	usage
	;;
*)
	TAG="$1"
	TMP="$(mktemp -d)"
	trap 'rm -rf "$TMP"' EXIT INT TERM
	fetch "$TAG" runner.tgz "$TMP/runner.tgz"
	fetch "$TAG" templates.tgz "$TMP/templates.tgz"
	mkdir -p "$TMP/runner" "$TMP/templates"
	tar -xzf "$TMP/runner.tgz" -C "$TMP/runner"
	tar -xzf "$TMP/templates.tgz" -C "$TMP/templates"
	[ -d "$TMP/runner/dist" ] && [ -f "$TMP/runner/LICENSE" ] || { echo "runner.tgz of $TAG holds no dist/ and LICENSE" >&2; exit 1; }
	[ -f "$TMP/templates/templates/index.json" ] || { echo "templates.tgz of $TAG holds no templates/index.json" >&2; exit 1; }
	take_runner "$TMP/runner/dist" "$TMP/runner/LICENSE"
	take_templates "$TMP/templates/templates"
	echo "$TAG" > vendor-runner/VERSION
	;;
esac
echo "vendor-runner/ at $(cat vendor-runner/VERSION)"
