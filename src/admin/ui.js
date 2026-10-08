import { useEffect, useState } from '@wordpress/element';
import { __, sprintf } from '@wordpress/i18n';
import { boot, pageUrl } from './api';

/**
 * The engenty, drawn: a round fellow with two eyes.
 * @param root0
 * @param root0.size
 * @param root0.color
 */
export function Mark( { size = 28, color = '#e0531b' } ) {
	return (
		<svg
			width={ size }
			height={ size }
			viewBox="0 0 40 40"
			aria-hidden="true"
		>
			<path
				fill={ color }
				d="M20 3c9.6 0 17 7.2 17 16.4C37 29 29.6 37 20 37S3 29 3 19.4C3 10.2 10.4 3 20 3Z"
			/>
			<circle cx="14" cy="19" r="2.6" fill="#fff" />
			<circle cx="26" cy="19" r="2.6" fill="#fff" />
		</svg>
	);
}

export function Spinner( { label } ) {
	return (
		<span className="en-spinner" role="status">
			<span className="en-spinner__dot" />
			{ label ? <span>{ label }</span> : null }
		</span>
	);
}

export function Button( {
	kind = 'secondary',
	busy = false,
	href,
	external,
	children,
	className = '',
	...rest
} ) {
	const cls = `en-btn en-btn--${ kind } ${ className }`;
	if ( href ) {
		return (
			<a
				className={ cls }
				href={ href }
				{ ...( external
					? { target: '_blank', rel: 'noopener noreferrer' }
					: {} ) }
				{ ...rest }
			>
				{ children }
				{ external ? <span aria-hidden="true"> ↗</span> : null }
			</a>
		);
	}
	return (
		<button
			type="button"
			className={ cls }
			disabled={ busy || rest.disabled }
			{ ...rest }
		>
			{ busy ? <span className="en-spinner__dot" /> : null }
			{ children }
		</button>
	);
}

export function Card( { title, aside, children, className = '', tone } ) {
	return (
		<section
			className={ `en-card ${
				tone ? `en-card--${ tone }` : ''
			} ${ className }` }
		>
			{ title || aside ? (
				<header className="en-card__head">
					{ title ? <h2>{ title }</h2> : <span /> }
					{ aside }
				</header>
			) : null }
			{ children }
		</section>
	);
}

export function Chip( { tone = 'grey', children } ) {
	return <span className={ `en-chip en-chip--${ tone }` }>{ children }</span>;
}

export function Notice( { tone = 'info', children } ) {
	return (
		<div className={ `en-notice en-notice--${ tone }` }>{ children }</div>
	);
}

export function Empty( { title, children } ) {
	return (
		<div className="en-empty">
			<Mark size={ 48 } color="#d6d3d1" />
			<h3>{ title }</h3>
			{ children }
		</div>
	);
}

/**
 * A side panel over the page, closed with Esc or a click beside it.
 * @param root0
 * @param root0.title
 * @param root0.onClose
 * @param root0.children
 */
export function Drawer( { title, onClose, children } ) {
	useEffect( () => {
		const onKey = ( e ) => e.key === 'Escape' && onClose();
		window.addEventListener( 'keydown', onKey );
		return () => window.removeEventListener( 'keydown', onKey );
	}, [ onClose ] );
	return (
		<div
			className="en-drawer"
			role="dialog"
			aria-modal="true"
			aria-label={ title }
		>
			<button
				type="button"
				className="en-drawer__backdrop"
				aria-label={ __( 'Schließen', 'engenty-wizards' ) }
				onClick={ onClose }
			/>
			<div className="en-drawer__panel">
				<header className="en-drawer__head">
					<h2>{ title }</h2>
					<button
						type="button"
						className="en-icon-btn"
						onClick={ onClose }
						aria-label={ __( 'Schließen', 'engenty-wizards' ) }
					>
						×
					</button>
				</header>
				<div className="en-drawer__body">{ children }</div>
			</div>
		</div>
	);
}

export function CopyField( { value, label } ) {
	const [ copied, setCopied ] = useState( false );
	return (
		<div className="en-copy">
			{ label ? <span className="en-copy__label">{ label }</span> : null }
			<code>{ value }</code>
			<button
				type="button"
				className="en-btn en-btn--ghost en-btn--small"
				onClick={ () => {
					window.navigator.clipboard?.writeText( value );
					setCopied( true );
					setTimeout( () => setCopied( false ), 1500 );
				} }
			>
				{ copied
					? __( 'Kopiert', 'engenty-wizards' )
					: __( 'Kopieren', 'engenty-wizards' ) }
			</button>
		</div>
	);
}

export const isFree = ( me ) =>
	! me?.tenant?.plan || me.tenant.plan.id === 'free';

const FEATURES = {
	contacts: {
		title: __( 'Kontakte – mit Pro', 'engenty-wizards' ),
		text: __(
			'Jeder Wizard, der nach Name und E-Mail fragt, legt den Kontakt an. Hier siehst du, wer über welche Seite kam, suchst und exportierst als CSV – ohne ein eigenes CRM.',
			'engenty-wizards'
		),
		points: [
			__(
				'Leads aus jedem Wizard, mit der Seite, auf der sie kamen',
				'engenty-wizards'
			),
			__( 'Personen und Firmen, Rollen, Notizen', 'engenty-wizards' ),
			__( 'Export als CSV', 'engenty-wizards' ),
		],
	},
	appointments: {
		title: __( 'Termine – mit Pro', 'engenty-wizards' ),
		text: __(
			'Wizards buchen freie Zeiten in deinem Kalender: Öffnungszeiten, Feiertage, Google- oder Microsoft-Kalender. Die Buchungen siehst du hier, Besucher bekommen ihre Bestätigung.',
			'engenty-wizards'
		),
		points: [
			__(
				'Terminbuchung auf der Website, ohne Doppelbuchungen',
				'engenty-wizards'
			),
			__( 'Vor Ort, am Telefon oder online', 'engenty-wizards' ),
			__(
				'Kalender-Datei und Absage-Link für jeden Gast',
				'engenty-wizards'
			),
		],
	},
	build: {
		title: __( 'Wizards direkt hier anlegen – mit Pro', 'engenty-wizards' ),
		text: __(
			'Mit Free baust du Wizards in der kostenlosen App auf deinem Rechner und veröffentlichst sie, dann stehen sie hier zur Wahl. Mit Pro legst du sie in der Cloud an, aus Vorlagen oder im Studio, und engenty liest deine Website ein.',
			'engenty-wizards'
		),
		points: [
			__( 'Vorlagen mit einem Klick live', 'engenty-wizards' ),
			__(
				'Deine Website als Wissen: Leistungen, Preise, Kontakt',
				'engenty-wizards'
			),
			__(
				'Monatliche Credits, Kontakte und Termine dabei',
				'engenty-wizards'
			),
		],
	},
};

/**
 * What a plan above Free adds, where it is missing, with the way to it.
 * @param root0
 * @param root0.feature
 * @param root0.me
 * @param root0.compact
 */
export function ProUpsell( { feature, me, compact = false } ) {
	const f = FEATURES[ feature ];
	return (
		<div className={ `en-upsell ${ compact ? 'en-upsell--compact' : '' }` }>
			<div className="en-upsell__badge">Pro</div>
			<h3>{ f.title }</h3>
			<p>{ f.text }</p>
			{ compact ? null : (
				<ul>
					{ f.points.map( ( p ) => (
						<li key={ p }>{ p }</li>
					) ) }
				</ul>
			) }
			<div className="en-row">
				{ me?.urls?.upgrade ? (
					<Button kind="primary" href={ me.urls.upgrade } external>
						{ __( 'Auf Pro upgraden', 'engenty-wizards' ) }
					</Button>
				) : null }
				{ me?.urls?.billing ? (
					<Button kind="ghost" href={ me.urls.billing } external>
						{ __( 'Pakete vergleichen', 'engenty-wizards' ) }
					</Button>
				) : null }
			</div>
		</div>
	);
}

const NAV = [
	[ 'home', 'engenty', __( 'Übersicht', 'engenty-wizards' ) ],
	[ 'wizards', 'engenty-wizards', __( 'Wizards', 'engenty-wizards' ) ],
	[ 'results', 'engenty-results', __( 'Ergebnisse', 'engenty-wizards' ) ],
	[ 'contacts', 'engenty-contacts', __( 'Kontakte', 'engenty-wizards' ) ],
	[
		'appointments',
		'engenty-appointments',
		__( 'Termine', 'engenty-wizards' ),
	],
	[
		'settings',
		'engenty-settings',
		__( 'Einstellungen', 'engenty-wizards' ),
	],
];

const PRO_VIEWS = { contacts: 'contacts', appointments: 'appointments' };

/**
 * The plugin's header: the mark, the pages, the account with its plan and credits.
 * @param root0
 * @param root0.view
 * @param root0.status
 * @param root0.children
 */
export function Shell( { view, status, children } ) {
	const me = status?.me;
	const missing = me?.missing ?? [];
	return (
		<div className="en-app">
			<header className="en-top">
				<a className="en-brand" href={ pageUrl( 'engenty' ) }>
					<Mark />
					<span>engenty</span>
				</a>
				{ status?.connected ? (
					<nav className="en-nav">
						{ NAV.filter(
							( [ id ] ) =>
								( id !== 'settings' || status.can?.manage ) &&
								( ! [
									'results',
									'contacts',
									'appointments',
								].includes( id ) ||
									status.can?.results )
						).map( ( [ id, page, label ] ) => (
							<a
								key={ id }
								href={ pageUrl( page ) }
								className={ view === id ? 'is-active' : '' }
							>
								{ label }
								{ PRO_VIEWS[ id ] &&
								missing.includes( PRO_VIEWS[ id ] ) ? (
									<span className="en-pro">Pro</span>
								) : null }
							</a>
						) ) }
					</nav>
				) : (
					<span className="en-top__spacer" />
				) }
				{ me ? (
					<div className="en-account">
						<span className="en-account__plan">
							{ me.tenant?.plan?.name ?? 'Free' }
						</span>
						{ me.tenant?.credits !== null &&
						me.tenant?.credits !== undefined ? (
							<a
								className="en-account__credits"
								href={ me.urls?.billing ?? '#' }
								target="_blank"
								rel="noopener noreferrer"
							>
								{ sprintf(
									/* translators: %s: credits */
									__( '%s Credits', 'engenty-wizards' ),
									Math.floor(
										me.tenant.credits
									).toLocaleString()
								) }
							</a>
						) : null }
						{ isFree( me ) && me.urls?.upgrade ? (
							<Button
								kind="primary"
								className="en-btn--small"
								href={ me.urls.upgrade }
								external
							>
								{ __( 'Upgrade', 'engenty-wizards' ) }
							</Button>
						) : null }
					</div>
				) : null }
			</header>
			<main className="en-main">{ children }</main>
			<footer className="en-foot">
				engenty wizards { boot.version } ·{ ' ' }
				<a
					href="https://engenty.ai/docs"
					target="_blank"
					rel="noopener noreferrer"
				>
					{ __( 'Hilfe', 'engenty-wizards' ) }
				</a>
			</footer>
		</div>
	);
}

export function when( iso ) {
	if ( ! iso ) {
		return '';
	}
	const d = new Date( iso );
	return d.toLocaleString( undefined, {
		day: '2-digit',
		month: '2-digit',
		year: '2-digit',
		hour: '2-digit',
		minute: '2-digit',
	} );
}

/**
 * A page address as its path, for a narrow column.
 * @param url
 */
export function pathOf( url ) {
	if ( ! url ) {
		return '';
	}
	try {
		const u = new URL( url );
		return u.pathname === '/' ? u.host : u.pathname;
	} catch {
		return url;
	}
}
