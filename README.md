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
`@engenty-wizards/runner` (MIT), vendored as built under `vendor-runner/`. [COPYRIGHTS.md](COPYRIGHTS.md)
names the owner, the marks, what comes from elsewhere and the development tooling.

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
| `vendor-runner/` | The runner package as built (`bin/sync-runner.sh`) |
| `wizards/` | The templates that run on a site, exported from the marketplace with their fit (`pnpm templates:export` in the open repository) |

## Release

```bash
sh bin/zip.sh                      # engenty-wizards.zip: what WordPress installs, top folder engenty-wizards/
wp plugin check <unzipped folder>  # the Plugin Check wordpress.org runs; the zip passes with no errors
```

`.wordpress-org/` holds the listing's icon, banners and screenshots (the SVN `assets/` folder on
wordpress.org, not part of the zip); the GitHub release on a `v*` tag attaches the zip.

## Develop

```bash
npm install
sh bin/sync-runner.sh ../engenty-wizards   # the runner package and the templates from the open repository beside this one
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
