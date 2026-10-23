import { __, sprintf } from '@wordpress/i18n';

/*
 * The gallery's words for what a wizard needs on this site, from the shared check
 * (packages/shared/src/fit.ts in engenty-wizards): the labels of CAPABILITIES, the i18n of the
 * studio's StandaloneNeeds.tsx. What the plugin lists is the same list the studio shows.
 */

export const CAPABILITIES = {
	text: __( 'Write text', 'engenty-wizards' ),
	web: __( 'Web search', 'engenty-wizards' ),
	browser: __( 'Use a browser', 'engenty-wizards' ),
	documents: __( 'Read documents & photos', 'engenty-wizards' ),
	image: __( 'Generate images', 'engenty-wizards' ),
	video: __( 'Generate videos', 'engenty-wizards' ),
	speech: __( 'Speech output', 'engenty-wizards' ),
	listening: __( 'Understand voice notes', 'engenty-wizards' ),
	code: __( 'Run code', 'engenty-wizards' ),
	connectors: __( 'Connected accounts & systems', 'engenty-wizards' ),
	'motion-graphics': __(
		'Motion graphics with Claude Code (on your subscription)',
		'engenty-wizards'
	),
};

export const COST_TIERS = {
	low: __( 'cheap', 'engenty-wizards' ),
	medium: __( 'medium', 'engenty-wizards' ),
	high: __( 'expensive', 'engenty-wizards' ),
};

export const USE_CASES = {
	marketing: __( 'Marketing & Social Media', 'engenty-wizards' ),
	sales: __( 'Quotes & sales', 'engenty-wizards' ),
	accounting: __( 'Bookkeeping & receipts', 'engenty-wizards' ),
	service: __( 'Customer service', 'engenty-wizards' ),
	research: __( 'Research & analysis', 'engenty-wizards' ),
	hr: __( 'HR & applications', 'engenty-wizards' ),
	operations: __( 'Planning & processes', 'engenty-wizards' ),
	website: __( 'Helpers for the website', 'engenty-wizards' ),
	visuals: __( 'Images & video', 'engenty-wizards' ),
	inquiries: __( 'Requests & appointments', 'engenty-wizards' ),
	advice: __( 'Advice & prices', 'engenty-wizards' ),
};

export const ITEM_FORMATS = {
	text: __( 'Text', 'engenty-wizards' ),
	document: __( 'Document (PDF, Word)', 'engenty-wizards' ),
	table: __( 'Table', 'engenty-wizards' ),
	image: __( 'Image', 'engenty-wizards' ),
	video: __( 'Video', 'engenty-wizards' ),
	audio: __( 'Audio', 'engenty-wizards' ),
	dashboard: __( 'Dashboard', 'engenty-wizards' ),
};

export const FORMAT_LABEL = {
	png: 'PNG',
	mp4: 'MP4',
	mp3: 'MP3',
	pdf: 'PDF',
	docx: 'Word',
	html: 'HTML',
	md: 'Markdown',
	txt: 'Text',
	csv: 'CSV',
	xlsx: 'Excel',
	json: 'JSON',
	zip: 'ZIP',
};

/** What the gallery has no capability for, by its need id (fit.ts Need). */
const WORDED = {
	lists: __( 'Lists the wizard keeps between runs', 'engenty-wizards' ),
	memory: __( 'The memory of the wizard', 'engenty-wizards' ),
	each: __(
		'One run per entry (one after the other here)',
		'engenty-wizards'
	),
	'field:slot': __( 'Choosing a slot from free times', 'engenty-wizards' ),
	'tool:pages': __( 'Reading the pages of the space', 'engenty-wizards' ),
	widget: __( 'A widget', 'engenty-wizards' ),
};

/**
 * The gallery's capability a need stands for (fit.ts capabilityOf).
 * @param {Object} need
 */
export function capabilityOf( need ) {
	switch ( need ) {
		case 'tool:web_search':
		case 'tool:web_fetch':
			return 'web';
		case 'tool:browser':
			return 'browser';
		case 'tool:sandbox':
			return 'code';
		case 'tool:image':
		case 'asset:image':
			return 'image';
		case 'asset:video':
		case 'motion-graphics':
		case 'widget:video':
			return 'video';
		case 'asset:voice':
			return 'speech';
		case 'field:audio':
			return 'listening';
		case 'tool:http':
		case 'mcp':
		case 'connections':
		case 'field:connection':
			return 'connectors';
		case 'field:image':
		case 'field:file':
		case 'field:file-read':
			return 'documents';
		default:
			return null;
	}
}

/**
 * The "Braucht" lines of the entry dialog (StandaloneNeeds.tsx needLines): each with a tone.
 * @param {Object}  fit    `{ fit, notes, missing, optional, needs, without }`.
 * @param {boolean} thinks Whether the wizard has a thinking step at all.
 */
export function needLines( fit, thinks = true ) {
	const lines = [];
	const seen = new Set();
	const add = ( key, line ) => {
		if ( ! seen.has( key ) ) {
			seen.add( key );
			lines.push( line );
		}
	};
	if ( thinks ) {
		add( 'text', { text: CAPABILITIES.text, tone: 'ok' } );
	}
	for ( const c of fit.missing ?? [] ) {
		add( c, { text: CAPABILITIES[ c ] ?? c, tone: 'missing' } );
	}
	for ( const c of fit.optional ?? [] ) {
		add( c, { text: CAPABILITIES[ c ] ?? c, tone: 'optional' } );
	}
	for ( const note of fit.notes ?? [] ) {
		if ( WORDED[ note.need ] && ! capabilityOf( note.need ) ) {
			add( note.need, {
				text: WORDED[ note.need ],
				tone: note.hard ? 'missing' : 'optional',
			} );
		}
	}
	for ( const f of fit.without ?? [] ) {
		add( `format:${ f }`, {
			text: sprintf(
				/* translators: %s: a file format */
				__( 'Result as %s', 'engenty-wizards' ),
				FORMAT_LABEL[ f ] ?? f
			),
			tone: 'optional',
		} );
	}
	return lines;
}

/**
 * The warn chip's text on a card: "Geht auch ohne: PDF" (market.without), or null.
 * @param {Object} fit
 */
export function withoutLine( fit ) {
	const parts = [
		...( fit.optional ?? [] ).map( ( c ) => CAPABILITIES[ c ] ?? c ),
		...( fit.without ?? [] ).map( ( f ) => FORMAT_LABEL[ f ] ?? f ),
	];
	return parts.length
		? sprintf(
				/* translators: %s: a list */ __(
					'Works without: %s',
					'engenty-wizards'
				),
				parts.join( ', ' )
		  )
		: null;
}

/**
 * "Hier nicht eingerichtet: Websuche" (market.missing), or null.
 * @param {Object} fit
 */
export function missingLine( fit ) {
	const parts = ( fit.missing ?? [] ).map( ( c ) => CAPABILITIES[ c ] ?? c );
	return parts.length
		? sprintf(
				/* translators: %s: a list */ __(
					'Not set up here: %s',
					'engenty-wizards'
				),
				parts.join( ', ' )
		  )
		: null;
}
