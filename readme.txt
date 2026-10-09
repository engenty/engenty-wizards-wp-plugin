=== engenty wizards ===
Contributors: engenty
Tags: ai, forms, chatbot, appointments, lead generation
Requires at least: 6.6
Tested up to: 7.1
Requires PHP: 8.1
Stable tag: 0.3.0
License: GPLv2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

Your own AI assistants on your website: requests, quotes, bookings. With an engenty.ai account, or on the site itself with its AI provider.

== Description ==

engenty wizards are guided assistants for your visitors: a request that asks the right questions, a quote with a PDF, a booking in your calendar, a chat bubble that knows your services. They run on [engenty.ai](https://engenty.ai); this plugin puts them on your WordPress site and shows what visitors left in the admin.

* **Connect in a minute**: create a free account or sign in from the WordPress admin.
* **Reads your website**: name, logo, colours, contact details and your pages become what your wizards know.
* **Templates**: a wizard goes live in one click.
* **Everywhere on your site**: block, shortcode, Elementor widget, PHP function, or a bubble on every page.
* **Results in the admin**: answers, files and the page a visitor started on.
* **With Pro**: contacts (a small CRM of your leads) and bookings in your calendar.
* **Without an account**: on WordPress 7.0 with an AI provider under Settings → Connectors, the shipped wizards run on your site by themselves. No account, no credits; the provider bills your key. Results stay in WordPress.

= External service =

This plugin connects to engenty.ai, which runs the wizards. Your site's settings stay in WordPress; when you connect, the plugin keeps an access token for your account. What you choose under "Website einlesen" (name, logo, colours, contact details, page texts) is sent to engenty.ai for your account. Visitors who open a wizard talk to engenty.ai directly from a frame on your page.

Terms of use: https://engenty.ai/nutzungsbedingungen · Privacy: https://engenty.ai/datenschutz

== Installation ==

1. Upload the plugin and activate it.
2. Open **engenty** in the admin menu and choose "Eigene KI erstellen" (new account) or "Anmelden".
3. Follow the three steps: read your website, pick a template, put it on the site.

== Frequently Asked Questions ==

= Does it need anything on my host? =

No. With an account the wizards run on engenty.ai; your host needs PHP 8.1 and WordPress 6.6. Without an account they run on your site: WordPress 7.0 and an AI provider under Settings → Connectors.

= Which wizards run without an account? =

The ones that ship with the plugin: a quote request, a price estimate, a complaint, a damage report, an invoice, a FAQ helper, a product advisor and more. Each says what it needs; what the site cannot do (web search, images, documents a model reads, contacts and bookings) needs the account. Your own wizards come as a package from the studio's share dialog, which says whether they run on a site.

= Where are the answers stored? =

On engenty.ai, in your account. WordPress shows them live and keeps none. Results of visitors without an account are deleted after 7 days.

= What does Pro add? =

Contacts and bookings in the WordPress admin, building wizards from templates in the cloud, reading your website into your space, and monthly credits.

== Screenshots ==

1. The setup: connect, read the website, a first wizard, on the site.
2. The bubble on every page.
3. Results with answers and downloads.

== Changelog ==

= 0.3.0 =
* Thinking steps read web pages and call public APIs on the site itself (WordPress abilities, a switch in the settings); a choice that leads to something the site lacks is closed on the page; a package can carry the project's knowledge; on a connected site a wizard runs here with "Hier laufen lassen" and back over engenty.ai; seconds per thinking step as a setting, for local models.

= 0.2.0 =
* Wizards without an account: on WordPress 7.0 with an AI provider they run on the site itself; the shipped templates, a gallery with the entry dialog, import of a .wizard package with the check in the browser, results in WordPress, limits, the provider line in the settings.

= 0.1.0 =
* First release: connect with sign-up or sign-in, website reading, templates, block, shortcode, Elementor widget, bubble, results, contacts and bookings (Pro).
