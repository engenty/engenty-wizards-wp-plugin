const defaults = require( '@wordpress/scripts/config/.eslintrc.js' );

module.exports = {
	...defaults,
	settings: {
		// The runner package is vendored under vendor-runner/ and aliased in webpack.config.js.
		'import/core-modules': [
			'@engenty-wizards/runner',
			'@engenty-wizards/runner/check',
			'@engenty-wizards/runner/runner.css',
		],
	},
};
