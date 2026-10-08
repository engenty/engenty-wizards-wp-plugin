# engenty wizards for WordPress

The WordPress plugin of [engenty wizards](https://engenty.ai): puts the wizards of an engenty.ai
account on a WordPress site (block, shortcode, Elementor widget, PHP, a bubble on every page) and
shows results, contacts and bookings in the admin. The wizards run on engenty.ai; the plugin is a
client of its API (`/api/v1`) and its account server (OAuth with PKCE).

GPLv2 or later. Nothing of the engenty runtime is in here.

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
| `src/admin/` | The admin app (React through `@wordpress/element`) |
| `src/block/` | The block's editor |

## Develop

```bash
npm install
npm run build        # build/admin.js, build/block.js
npm run start        # rebuild on change
sh bin/zip.sh        # engenty-wizards.zip with build/
sh bin/smoke.sh      # against a WordPress with wp-cli
```

Against a runtime on your machine, in `wp-config.php`:

```php
define( 'ENGENTY_WIZARDS_CLOUD', 'http://localhost:18891' );
```
