const defaults = require( '@wordpress/scripts/config/webpack.config' );

// Two bundles: the admin app (its pages under "engenty") and the block's editor.
module.exports = {
	...defaults,
	entry: {
		admin: './src/admin/index.js',
		block: './src/block/index.js',
	},
};
