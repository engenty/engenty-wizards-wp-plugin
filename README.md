# engenty wizards for WordPress

The WordPress plugin of [engenty wizards](https://engenty.ai): puts wizards on a WordPress site
(block, shortcode, Elementor widget, PHP, a bubble on every page) and shows results, contacts and
bookings in the admin. Two ways:

- **With an account** the wizards run on engenty.ai; the plugin is a client of its API (`/api/v1`)
  and its account server (OAuth with PKCE).
- **Without an account** (WordPress 7.0 or newer) a wizard runs on the site itself: the browser
  follows the flow and draws every page with the studio's runner, PHP keeps the prompts and the
  run and asks the site's AI provider (WordPress → Einstellungen → Connectors) once per thinking
  step through the AI Client; a step that reads a web page or calls a public API does so through
  the site's own abilities (`includes/class-abilities.php`, the loop in `class-think.php`).
  Wizards come with the plugin (`wizards/`) or as a `.wizard` package from the studio, or over
  from the account with "Run here"; results stay in WordPress.

GPLv2 or later. The runner's components come from the open repository's package
`@engenty-wizards/runner` (MIT), vendored as built under `vendor-runner/` from a release of
[engenty/wizards](https://github.com/engenty/wizards) (`vendor-runner/VERSION` names it).
[COPYRIGHTS.md](COPYRIGHTS.md) names the owner, the marks, what comes from elsewhere and the
development tooling.

## Layout

| Path | |
|---|---|
| `engenty-wizards.php` | Header, constants, `engenty_wizard()`, activation |
| `includes/class-connect.php` | OAuth: discovery, client registration, sign-up/sign-in, tokens, refresh, disconnect |
| `includes/class-client.php` | Calls to `/api/v1` with the access token |
| `includes/class-site-reader.php` | The site's base data and pages as Markdown |
| `includes/class-rest.php` | `engenty/v1`, what the admin app and the block call |
| `includes/class-admin.php` | Menu, pages, notices |
| `includes/class-embed.php` | The tag, the shortcode, the bubble |
| `includes/class-block.php`, `blocks/wizard/` | The block `engenty/wizard` |
| `includes/class-elementor*.php` | The Elementor widget |
| `includes/class-packages.php` | Standalone wizards: the table, the shipped set, imports, the definition without prompts |
| `includes/class-runs.php` | Standalone runs: the state, the public routes a visitor's browser calls, limits, the flow and the page reader ported from the runtime |
| `includes/class-think.php` | The one model call through the AI Client: templates, the system prompt, JSON schemas, decisions, documents |
| `includes/class-abilities.php` | What a thinking step may do on the site: read a public web page, call a public API, as WordPress abilities the model calls through the AI Client |
| `includes/class-downloads.php` | A result as html, md, txt, csv, json |
| `src/admin/` | The admin app (React through `@wordpress/element`) |
| `src/block/` | The block's editor |
| `src/runner/` | The runner on the site: mounts `@engenty-wizards/runner` on every standalone tag, `useLocalRun` drives a run over the site's routes |
| `vendor-runner/` | The runner package as built, from a release's `runner.tgz` (`bin/sync-runner.sh vX.Y.Z`); `VERSION` is that release's tag |
| `wizards/` | The templates that run on a site, from the same release's `templates.tgz`: the entries whose standalone fit is not "no", with their fit in `index.json` |

## Release

```bash
sh bin/sync-runner.sh v0.8.0       # the runner and the templates of that release of the open repository, before the version bump
sh bin/zip.sh                      # engenty-wizards.zip: what WordPress installs, top folder engenty-wizards/
wp plugin check <unzipped folder>  # the Plugin Check wordpress.org runs; the zip passes with no errors
```

`.wordpress-org/` holds the listing's icon, banners and screenshots (the SVN `assets/` folder on
wordpress.org, not part of the zip); the GitHub release on a `v*` tag attaches the zip.

## Develop

```bash
npm install
sh bin/sync-runner.sh v0.8.0               # the runner package and the templates from that release of github.com/engenty/wizards
sh bin/sync-runner.sh --from ../engenty-wizards   # unreleased work: a checkout of the open repository beside this one, built there
npm run build        # build/app.js (the admin app), build/block.js, build/runner.js
npm run start        # rebuild on change
sh bin/zip.sh        # engenty-wizards.zip with build/, wizards/
sh bin/smoke.sh      # against a WordPress with wp-cli; the standalone part answers with bin/fake-provider.php
```

Standalone wizards need a provider the AI Client answers with. In development without a key,
`bin/fake-provider.php` as an mu-plugin answers every step canned; the filter
`engenty_wizards_answer` is what it hooks.

Against a runtime on your machine, in `wp-config.php`:

```php
define( 'ENGENTY_WIZARDS_CLOUD', 'http://localhost:18891' );
```


## Private files and runtime limits

Package workspace files and run assets are database blobs, never static upload URLs.
Imports accept Markdown, text, CSV, JSON, PDF and raster image extensions; HTML,
SVG and executable formats are rejected regardless of declared MIME. Replacing a
package commits its definition and assets together.
The OS temporary directory must be outside WordPress, uploads and the document
root. Temporary opaque files for providers/downloads are removed at request end.
HTML responses carry an opaque-origin CSP sandbox and `nosniff`, including direct
endpoint navigation.

Uploads require an active input page with an image field selected by the flow.
Limits are 4 MB per file, 20 files/40 MB per run, 40 files/80 MB per visitor per UTC
day, and 500 files/1 GB per site per UTC day. Failed writes keep their upload
reservation. Retained encoded blobs are also capped at 100 MB per owner and 1 GB
per site. Daily budget rows expire; run budgets remain until their run is removed, including
when run retention is unlimited.

Request-owned database leases use unique inserts and owner-conditional renewal,
not object-cache locks. Paid steps renew between model and tool turns and reserve
call accounting before dispatch. Cancellation revokes the lease and conditional
state writes cannot restore an obsolete result. OAuth refresh holds its lease
through a full encrypted-option compare-and-swap; a concurrent reconnect wins.
Leases recover after fifteen minutes if a process is killed without shutdown.

Security regression tests mutate plugin tables and must run against a disposable
WordPress installation with Wizards active (SQLite and MySQL are supported):

```sh
wp --path="$WP_PATH" eval-file tests/security.php
WP_PATH="$WP_PATH" sh tests/concurrency.sh
WP_PATH="$WP_PATH" sh tests/cold-lease.sh
```

`tests/sandbox.sh` creates and cleans its own private HTML fixture and verifies
actual browser isolation and HTTP headers. Start the disposable server at `WP_URL`
(default `http://127.0.0.1:8933`), then run:

```sh
WP_PATH="$WP_PATH" PLAYWRIGHT_MODULE=/path/to/node_modules/playwright sh tests/sandbox.sh
```
