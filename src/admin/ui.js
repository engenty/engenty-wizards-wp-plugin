import { useEffect, useState } from '@wordpress/element';
import { __, sprintf } from '@wordpress/i18n';
import { boot, pageUrl, post, problem } from './api';
import { CORE_KINDS, engentyMarkup } from './engenties';
import { Icon, CAPABILITY_ICONS } from './icons';
import { needLines } from './fit';

/**
 * An engenty as the studio draws it: one eye, its own shape and colour.
 * @param {Object} root0
 * @param {Object} root0.kind
 * @param {Object} root0.size
 */
export function Engenty( { kind = 'round', size = 28 } ) {
	return (
		<svg
			width={ size }
			height={ size }
			viewBox="0 0 120 120"
			overflow="visible"
			aria-hidden="true"
			className="en-engenty"
			// eslint-disable-next-line react/no-danger -- fixed markup from engenties.js.
			dangerouslySetInnerHTML={ { __html: engentyMarkup( kind ) } }
		/>
	);
}

/**
 * The brand mark: the founding five in turn, like the studio's logo.
 * @param {Object} root0
 * @param {Object} root0.size
 */
export function Mark( { size = 30 } ) {
	const [ index, setIndex ] = useState( 0 );
	useEffect( () => {
		if ( window.matchMedia( '(prefers-reduced-motion: reduce)' ).matches ) {
			return undefined;
		}
		const id = window.setInterval(
			() => setIndex( ( i ) => ( i + 1 ) % CORE_KINDS.length ),
			2800
		);
		return () => window.clearInterval( id );
	}, [] );
	return (
		<span
			className="en-mark"
			style={ { width: size, height: size } }
			aria-hidden="true"
		>
			{ CORE_KINDS.map( ( kind, i ) => (
				<span key={ kind } style={ { opacity: i === index ? 1 : 0 } }>
					<Engenty kind={ kind } size={ size } />
				</span>
			) ) }
		</span>
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
			<Engenty kind="drop" size={ 52 } />
			<h3>{ title }</h3>
			{ children }
		</div>
	);
}

/**
 * A side panel over the page, closed with Esc or a click beside it.
 * @param {Object} root0
 * @param {Object} root0.title
 * @param {Object} root0.onClose
 * @param {Object} root0.children
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
 * @param {Object} root0
 * @param {Object} root0.feature
 * @param {Object} root0.me
 * @param {Object} root0.compact
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

/**
 * Sign-up or sign-in on engenty.ai: the site asks for the address, the browser goes there.
 * @return {{busy: string|null, error: string|null, go: Function}} `go( true )` for a new account.
 */
export function useConnect() {
	const [ busy, setBusy ] = useState( null );
	const [ error, setError ] = useState( null );
	const go = async ( signup ) => {
		setBusy( signup ? 'signup' : 'login' );
		setError( null );
		try {
			const { url } = await post( '/connect', { signup } );
			window.location.href = url;
		} catch ( e ) {
			setError( problem( e ).message );
			setBusy( null );
		}
	};
	return { busy, error, go };
}

/**
 * A page as it will look, under a card that leads to the connection.
 * @param {Object} root0
 * @param {Object} root0.title
 * @param {Object} root0.text
 * @param {Object} root0.status
 * @param {Object} root0.children
 */
export function ConnectOverlay( { title, text, status, children } ) {
	const { busy, error, go } = useConnect();
	return (
		<div className="en-overlay">
			<div className="en-overlay__under" aria-hidden="true" inert="">
				{ children }
			</div>
			<div className="en-overlay__card">
				<Engenty kind="drop" size={ 56 } />
				<h2>{ title }</h2>
				<p>{ text }</p>
				{ status.can?.manage ? (
					<div className="en-row en-row--center">
						<Button
							kind="primary"
							busy={ busy === 'signup' }
							disabled={ busy !== null }
							onClick={ () => go( true ) }
						>
							{ __(
								'Kostenloses Konto anlegen',
								'engenty-wizards'
							) }{ ' ' }
							→
						</Button>
						<Button
							kind="ghost"
							busy={ busy === 'login' }
							disabled={ busy !== null }
							onClick={ () => go( false ) }
						>
							{ __( 'Anmelden', 'engenty-wizards' ) }
						</Button>
					</div>
				) : (
					<p className="en-muted">
						{ __(
							'Bitte eine Administratorin oder einen Administrator, die Website zu verbinden.',
							'engenty-wizards'
						) }
					</p>
				) }
				{ error ? <Notice tone="error">{ error }</Notice> : null }
			</div>
		</div>
	);
}

const TEASER = {
	contacts: [
		[ 'Anna Berger', 'Angebotsanfrage', '/kontakt' ],
		[ 'Huber & Söhne OG', 'Angebotsanfrage', '/leistungen' ],
		[ 'Lukas Pichler', 'Störung melden', '/' ],
	],
	appointments: [
		[ 'Do, 16.10. · 09:00', 'Vor-Ort-Termin', 'Anna Berger' ],
		[ 'Do, 16.10. · 14:30', 'Beratung am Telefon', 'Lukas Pichler' ],
		[ 'Fr, 17.10. · 10:00', 'Online-Termin', 'Huber & Söhne OG' ],
	],
};

/**
 * Kontakte or Termine before the site is connected: what Pro brings, and the way in – a free account first.
 * @param {Object} root0
 * @param {Object} root0.feature
 * @param {Object} root0.status
 */
export function ProBeforeConnect( { feature, status } ) {
	const f = FEATURES[ feature ];
	const { busy, error, go } = useConnect();
	return (
		<>
			<h1 className="en-page-head">
				{ feature === 'contacts'
					? __( 'Kontakte', 'engenty-wizards' )
					: __( 'Termine', 'engenty-wizards' ) }
			</h1>
			<div className="en-upsell">
				<div className="en-upsell__badge">Pro</div>
				<h3>{ f.title }</h3>
				<p>{ f.text }</p>
				<ul>
					{ f.points.map( ( p ) => (
						<li key={ p }>{ p }</li>
					) ) }
				</ul>
				<p className="en-muted">
					{ __(
						'Zuerst verbindest du die Website mit einem kostenlosen Konto. Auf Pro wechselst du danach, wann du willst.',
						'engenty-wizards'
					) }
				</p>
				{ status.can?.manage ? (
					<div className="en-row">
						<Button
							kind="primary"
							busy={ busy === 'signup' }
							disabled={ busy !== null }
							onClick={ () => go( true ) }
						>
							{ __(
								'Kostenloses Konto anlegen',
								'engenty-wizards'
							) }{ ' ' }
							→
						</Button>
						<Button
							kind="ghost"
							busy={ busy === 'login' }
							disabled={ busy !== null }
							onClick={ () => go( false ) }
						>
							{ __( 'Anmelden', 'engenty-wizards' ) }
						</Button>
					</div>
				) : (
					<p>
						{ __(
							'Bitte eine Administratorin oder einen Administrator, die Website zu verbinden.',
							'engenty-wizards'
						) }
					</p>
				) }
				{ error ? <Notice tone="error">{ error }</Notice> : null }
			</div>
			<div className="en-teaser" aria-hidden="true">
				{ TEASER[ feature ].map( ( row ) => (
					<div key={ row[ 0 ] } className="en-teaser__row">
						<strong>{ row[ 0 ] }</strong>
						<span>{ row[ 1 ] }</span>
						<span>{ row[ 2 ] }</span>
					</div>
				) ) }
			</div>
		</>
	);
}

/**
 * The plugin's header: the mark and the account with its plan and credits. The pages are in WordPress' menu.
 * @param {Object} root0
 * @param {Object} root0.status
 * @param {Object} root0.children
 */
export function Shell( { status, children } ) {
	const me = status?.me;
	const local = status?.local;
	const { busy, go } = useConnect();
	return (
		<div className="en-app">
			<header className="en-top">
				<a className="en-brand" href={ pageUrl( 'engenty' ) }>
					<Mark />
					<span>
						engenty<span className="en-brand__dot">.</span>{ ' ' }
						<span className="en-brand__product">wizards</span>
					</span>
				</a>
				<span className="en-top__spacer" />
				{ ! me && local?.mode === 'local' ? (
					<div className="en-account">
						<span className="en-account__credits en-status">
							{ __( 'Lokal', 'engenty-wizards' ) }
							{ local.provider?.name
								? ` · ${ local.provider.name }`
								: '' }
						</span>
						{ status.can?.manage ? (
							<Button
								kind="ghost"
								className="en-btn--small"
								busy={ busy === 'login' }
								onClick={ () => go( false ) }
							>
								{ __(
									'Mit Konto verbinden',
									'engenty-wizards'
								) }
							</Button>
						) : null }
					</div>
				) : null }
				{ me ? (
					<div className="en-account">
						{ local?.wizards ? (
							<span className="en-account__credits en-status">
								{ __( 'Lokal', 'engenty-wizards' ) }
								{ local.provider?.name
									? ` · ${ local.provider.name }`
									: '' }
							</span>
						) : null }
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
 * @param {Object} url
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

/**
 * A modal over the page, as the studio's Dialog: closed with Esc or a click beside it.
 * @param {Object} root0
 * @param {Object} root0.onClose
 * @param {Object} root0.children
 * @param {Object} root0.wide
 * @param {Object} root0.small
 */
export function Modal( { onClose, children, wide = false, small = false } ) {
	useEffect( () => {
		const onKey = ( e ) => e.key === 'Escape' && onClose();
		window.addEventListener( 'keydown', onKey );
		document.body.classList.add( 'en-modal-open' );
		return () => {
			window.removeEventListener( 'keydown', onKey );
			document.body.classList.remove( 'en-modal-open' );
		};
	}, [ onClose ] );
	return (
		<div className="en-modal" role="dialog" aria-modal="true">
			<button
				type="button"
				className="en-modal__backdrop"
				aria-label={ __( 'Schließen', 'engenty-wizards' ) }
				onClick={ onClose }
			/>
			<div
				className={ `en-dialog ${ wide ? 'en-dialog--wide' : '' } ${
					small ? 'en-dialog--small' : ''
				}` }
			>
				<button
					type="button"
					className="en-dialog__close"
					aria-label={ __( 'Schließen', 'engenty-wizards' ) }
					onClick={ onClose }
				>
					<Icon name="x" />
				</button>
				{ children }
			</div>
		</div>
	);
}

/**
 * The chip a standalone wizard carries: Live as is; "Geht auch ohne: …" where it runs with less.
 * @param {Object} root0
 * @param {Object} root0.fit
 */
export function FitChip( { fit } ) {
	if ( ! fit ) {
		return null;
	}
	if ( fit.fit === 'no' ) {
		return (
			<Chip tone="rose">
				{ __( 'Braucht ein Konto', 'engenty-wizards' ) }
			</Chip>
		);
	}
	return null;
}

const NEED_TONE = { ok: '', missing: 'is-rose', optional: 'is-amber' };
const NEED_ICON = {
	ok: CAPABILITY_ICONS.text,
	missing: 'minus',
	optional: 'alert',
};
const NEED_NOTE = {
	ok: null,
	missing: __( 'nicht eingerichtet', 'engenty-wizards' ),
	optional: __( 'geht auch ohne', 'engenty-wizards' ),
};

/**
 * The "Braucht" list as the gallery's entry dialog draws it (studio/Marketplace.tsx Detail rows).
 * @param {Object} root0
 * @param {Object} root0.fit
 * @param {Object} root0.thinks
 */
export function NeedList( { fit, thinks = true } ) {
	const lines = needLines( fit, thinks );
	return (
		<ul className="en-needs">
			{ lines.map( ( line ) => (
				<li key={ line.text }>
					<span
						className={ `en-need__icon ${
							NEED_TONE[ line.tone ]
						}` }
					>
						<Icon name={ NEED_ICON[ line.tone ] } />
					</span>
					<span>{ line.text }</span>
					{ NEED_NOTE[ line.tone ] ? (
						<span
							className={ `en-need__note ${
								NEED_TONE[ line.tone ]
							}` }
						>
							{ NEED_NOTE[ line.tone ] }
						</span>
					) : null }
				</li>
			) ) }
			{ fit.needs?.length ? (
				<li>
					<span className="en-need__icon is-rose">
						<Icon name="minus" />
					</span>
					<span>
						{ sprintf(
							/* translators: %s: plugins */ __(
								'Mit Konto: braucht %s',
								'engenty-wizards'
							),
							fit.needs.join( ', ' )
						) }
					</span>
				</li>
			) : null }
		</ul>
	);
}
