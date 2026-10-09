import { __, sprintf } from '@wordpress/i18n';

/*
 * The gallery's words for what a wizard needs on this site, from the shared check
 * (packages/shared/src/fit.ts in engenty-wizards): the labels of CAPABILITIES, the i18n of the
 * studio's StandaloneNeeds.tsx. What the plugin lists is the same list the studio shows.
 */

export const CAPABILITIES = {
	text: __( 'Text schreiben', 'engenty-wizards' ),
	web: __( 'Websuche', 'engenty-wizards' ),
	browser: __( 'Browser bedienen', 'engenty-wizards' ),
	documents: __( 'Dokumente & Fotos lesen', 'engenty-wizards' ),
	image: __( 'Bilder erzeugen', 'engenty-wizards' ),
	video: __( 'Videos erzeugen', 'engenty-wizards' ),
	speech: __( 'Sprachausgabe', 'engenty-wizards' ),
	listening: __( 'Sprachnotizen verstehen', 'engenty-wizards' ),
	code: __( 'Code ausführen', 'engenty-wizards' ),
	connectors: __( 'Verbundene Konten & Systeme', 'engenty-wizards' ),
	film: __( 'Filme mit Claude Code (auf deinem Abo)', 'engenty-wizards' ),
};

export const COST_TIERS = {
	low: __( 'günstig', 'engenty-wizards' ),
	medium: __( 'mittel', 'engenty-wizards' ),
	high: __( 'teuer', 'engenty-wizards' ),
};

export const USE_CASES = {
	marketing: __( 'Marketing & Social Media', 'engenty-wizards' ),
	sales: __( 'Angebote & Verkauf', 'engenty-wizards' ),
	accounting: __( 'Buchhaltung & Belege', 'engenty-wizards' ),
	service: __( 'Kundenservice', 'engenty-wizards' ),
	research: __( 'Recherche & Analyse', 'engenty-wizards' ),
	hr: __( 'Personal & Bewerbungen', 'engenty-wizards' ),
	operations: __( 'Planung & Abläufe', 'engenty-wizards' ),
	website: __( 'Helfer für die Website', 'engenty-wizards' ),
	visuals: __( 'Bilder & Video', 'engenty-wizards' ),
	inquiries: __( 'Anfragen & Termine', 'engenty-wizards' ),
	advice: __( 'Beratung & Preise', 'engenty-wizards' ),
};

export const ITEM_FORMATS = {
	text: __( 'Text', 'engenty-wizards' ),
	document: __( 'Dokument (PDF, Word)', 'engenty-wizards' ),
	table: __( 'Tabelle', 'engenty-wizards' ),
	image: __( 'Bild', 'engenty-wizards' ),
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
	lists: __(
		'Listen, die der Wizard zwischen Durchläufen behält',
		'engenty-wizards'
	),
	memory: __( 'Das Gedächtnis des Wizards', 'engenty-wizards' ),
	each: __(
		'Ein Durchlauf je Eintrag (hier nacheinander)',
		'engenty-wizards'
	),
	'field:slot': __( 'Terminwahl aus freien Zeiten', 'engenty-wizards' ),
	'tool:pages': __( 'Die Seiten des Space lesen', 'engenty-wizards' ),
	widget: __( 'Ein Widget', 'engenty-wizards' ),
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
		case 'film':
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
				__( 'Ergebnis als %s', 'engenty-wizards' ),
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
					'Geht auch ohne: %s',
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
					'Hier nicht eingerichtet: %s',
					'engenty-wizards'
				),
				parts.join( ', ' )
		  )
		: null;
}
