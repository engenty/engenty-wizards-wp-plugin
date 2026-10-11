# Copyrights

Copyright © 2026 Matthias Platzer.

The plugin — `engenty-wizards.php`, `includes/`, `src/` and what `build/` is made from it,
`blocks/`, `uninstall.php`, `languages/` — is published under the GNU General Public License,
version 2 or later ([LICENSE](LICENSE)), as a WordPress plugin is.

"engenty", "engenty wizards", the wordmark and the engenty figures are marks of their owner. The
licence covers the code; it does not license the marks for another product or service.

## What comes from elsewhere

| Here | From | Terms |
|---|---|---|
| `vendor-runner/` | the package `@engenty-wizards/runner` of the open repo [engenty/engenty-wizards](https://github.com/engenty/engenty-wizards), as built; `bin/sync-runner.sh` brings it over with its licence file, and the zip ships that file | MIT, © engenty (`vendor-runner/LICENSE`) |
| inside `vendor-runner/` (built in) | the runner's own dependencies: [zod](https://zod.dev), [marked](https://marked.js.org) | MIT |
| `wizards/*.wizard`, `wizards/index.json` | eleven entries of the marketplace at [engenty.ai/wizards](https://engenty.ai/wizards) (the closed repo engenty-wizards-manage, `apps/marketplace/entries`), exported as the ones that run on a site (`bin/sync-runner.sh`; `index.json` names the source and date) | © Matthias Platzer; shipped as part of the plugin, so under its licence in the zip; the marketplace's own copies are not licensed by that |

What `build/` leaves out: React and the `@wordpress/*` packages, which the site's WordPress
provides at run time.

## Third-party software, development only

Used to build and check the plugin; nothing of it ships.

| Package | Version | Licence |
|---|---|---|
| [@wordpress/scripts](https://github.com/WordPress/gutenberg/tree/HEAD/packages/scripts) (npm) | 30.27.0 | GPL-2.0-or-later |
| [typescript](https://www.typescriptlang.org/) (npm) | 5.9.3 | Apache-2.0 |
| [dealerdirect/phpcodesniffer-composer-installer](https://github.com/PHPCSStandards/composer-installer) (composer) | 1.2.1 | MIT |
| [phpcsstandards/phpcsextra](https://github.com/PHPCSStandards/PHPCSExtra) (composer) | 1.5.1 | LGPL-3.0-or-later |
| [phpcsstandards/phpcsutils](https://phpcsutils.com/) (composer) | 1.2.3 | LGPL-3.0-or-later |
| [squizlabs/php_codesniffer](https://github.com/PHPCSStandards/PHP_CodeSniffer) (composer) | 3.13.6 | BSD-3-Clause |
| [wp-coding-standards/wpcs](https://github.com/WordPress/WordPress-Coding-Standards) (composer) | 3.4.1 | MIT |

Kept by hand from `package.json` and `composer.lock`; bring it up to date when they change.
