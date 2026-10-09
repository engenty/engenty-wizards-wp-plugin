import apiFetch from '@wordpress/api-fetch';

/**
 * A route of `engenty/v1` (includes/class-rest.php).
 * @param {Object} path
 * @param {Object} options
 */
export const api = ( path, options = {} ) =>
	apiFetch( { path: `/engenty/v1${ path }`, ...options } );

export const post = ( path, data = {} ) =>
	api( path, { method: 'POST', data } );

/**
 * What went wrong, with the runtime's code where engenty.ai refused: `plugin`, `read_only`,
 * `no_credits`, `not_connected` …
 * @param {Object} error
 */
export function problem( error ) {
	const code =
		error?.data?.code ||
		String( error?.code || '' ).replace( /^engenty_/, '' ) ||
		'failed';
	return {
		code,
		plugin: error?.data?.plugin ?? null,
		message: error?.message || 'Das hat nicht geklappt.',
	};
}

/**
 * `?a=b` of the set values.
 * @param {Object} params
 */
export function query( params ) {
	const q = new URLSearchParams();
	Object.entries( params ).forEach( ( [ key, value ] ) => {
		if ( value !== undefined && value !== null && value !== '' ) {
			q.set( key, String( value ) );
		}
	} );
	const s = q.toString();
	return s ? `?${ s }` : '';
}

export const boot = window.engentyWizards || {};

/**
 * An admin page of this plugin.
 * @param {Object} page
 * @param {Object} extra
 */
export const pageUrl = ( page, extra = '' ) =>
	`${ boot.admin || 'admin.php' }?page=${ page }${ extra }`;
