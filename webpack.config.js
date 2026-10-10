const path = require( 'path' );
const defaults = require( '@wordpress/scripts/config/webpack.config' );

// Three bundles: the admin app (its pages under "engenty"), the block's editor, and the runner a
// standalone wizard runs with on the site. The runner's components come from the open repository's
// package @engenty-wizards/runner (MIT), vendored as built under vendor-runner/ (bin/sync-runner.sh).
module.exports = {
	...defaults,
	entry: {
		app: './src/admin/index.js', // not "admin": wp-cli's make-json mangles a built file whose name holds "min" (its .min.js regex), and the JSON of translations is named by this path
		block: './src/block/index.js',
		runner: './src/runner/index.js',
	},
	resolve: {
		...defaults.resolve,
		alias: {
			...( defaults.resolve && defaults.resolve.alias ),
			'@engenty-wizards/runner/check': path.resolve( __dirname, 'vendor-runner/check.js' ),
			'@engenty-wizards/runner/runner.css': path.resolve( __dirname, 'vendor-runner/runner.css' ),
			'@engenty-wizards/runner': path.resolve( __dirname, 'vendor-runner/index.js' ),
		},
	},
};
