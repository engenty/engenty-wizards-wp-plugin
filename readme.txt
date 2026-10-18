=== engenty wizards ===
Contributors: engenty
Tags: ai, forms, chatbot, appointments, lead generation
Requires at least: 6.6
Tested up to: 7.1
Requires PHP: 8.1
Stable tag: 0.4.0
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

Source code: https://github.com/engenty/engenty-wizards-wp-plugin – the scripts in build/ are made from src/ with `npm install && npm run build`. The runner they bundle is the package @engenty-wizards/runner (MIT, the wizard format modules of @engenty-wizards/shared it contains included) from https://github.com/engenty/engenty-wizards, vendored as built in vendor-runner/.

= External services =

With an account, this plugin connects to engenty.ai, which runs the wizards. Your site's settings stay in WordPress; when you connect, the plugin keeps an access token for your account. What you choose under "Read the website" (name, logo, colours, contact details, page texts) is sent to engenty.ai for your account. Visitors who open a wizard talk to engenty.ai directly from a frame on your page.

Terms of use: https://engenty.ai/nutzungsbedingungen · Privacy: https://engenty.ai/datenschutz

Without an account, a wizard thinks through the AI provider you set up under Settings → Connectors: each thinking step sends the wizard's prompt and what the visitor entered (answers, photos) to that provider, under its terms. When the tools switch is on in the settings, a step may also read a public web page or call a public API the wizard names, from your server. Nothing goes to engenty.ai in this mode.

== Installation ==

1. Upload the plugin and activate it.
2. Open **engenty** in the admin menu and choose "Create your own AI" (new account) or "Sign in".
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

1. Wizards: what runs on the site, each with what it still needs.
2. The gallery: a shipped wizard goes live in one click.
3. A wizard on a page, the bubble on every page.
4. A visitor's question, answered on the site.
5. Results in the admin.
6. Settings: the provider line, limits, tools.

== Changelog ==

= 0.4.0 =
* Private files: a wizard's files and a run's uploads and results are kept in the database, no longer as public files under uploads. The update moves existing files out of the web folder once; if it cannot, a notice in the admin says what to do.
* An import accepts Markdown, text, CSV, JSON, PDF and images only. Generated pages open in a sandbox, also when called directly.
* Upload limits: 4 MB per file, 20 files or 40 MB per run, 40 files or 80 MB per visitor a day, 500 files or 1 GB per site a day.
* A step that costs credits runs once, even when two requests arrive at the same time. A cancelled run stays cancelled. Two refreshes of a connected account no longer undo each other.
* engenty.ai answers in the site's language: German on a German WordPress, English otherwise.
* A wizard package keeps the space's pages under knowledge/ instead of wissen/. An older package still imports and runs, but its wissen/ pages are no longer picked as the best match for a step; export it again to get that back.

= 0.3.3 =
* The runner is the one of engenty wizards v0.2.56: a wizard package the import refuses names the reason in English, as the definition's issues do.

= 0.3.2 =
* The import takes a wizard that runs with less, as the studio's share dialog offers it: only a wizard that needs an account is refused; a choice that leads to a plugin the site lacks is closed in the run.
* A thinking step gets the knowledge pages that match it: the wizard's own files first, then the pages best matching the step's task and the answers, within the same 60 000 characters.
* "Connect by hand" names the studio's Settings → Integrate.

= 0.3.1 =
* The Plugin URI points at the plugin's page on engenty.ai. The licences of everything the runner bundles are listed in COPYRIGHTS.md; the wizard format it contains is MIT.

= 0.3.0 =
* A result that promises a PDF gets one on the site itself: the visitor's browser writes it from the wizard's text (no PDF library on the server, nothing leaves the site); a written result also opens as a page to print, and a document the wizard wrote prints the same way.
* English source strings; German ships as de_DE in languages/ until the language packs take over, with French, Spanish, Italian, Dutch, Portuguese, Polish, Swedish, Danish, Norwegian, Finnish and Czech beside it.
* Thinking steps read web pages and call public APIs on the site itself (WordPress abilities, a switch in the settings); a choice that leads to something the site lacks is closed on the page; a package can carry the project's knowledge; on a connected site a wizard runs here with "Run here" and back over engenty.ai; seconds per thinking step as a setting, for local models.

= 0.2.0 =
* Wizards without an account: on WordPress 7.0 with an AI provider they run on the site itself; the shipped templates, a gallery with the entry dialog, import of a .wizard package with the check in the browser, results in WordPress, limits, the provider line in the settings.

= 0.1.0 =
* First release: connect with sign-up or sign-in, website reading, templates, block, shortcode, Elementor widget, bubble, results, contacts and bookings (Pro).
