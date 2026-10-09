import { useEffect, useState } from '@wordpress/element';
import { __, sprintf } from '@wordpress/i18n';
import { api, boot, pageUrl, post, problem } from './api';
import {
	Button,
	Card,
	Chip,
	Mark,
	Notice,
	ProUpsell,
	Spinner,
	isFree,
	when,
	pathOf,
} from './ui';
import SiteRead from './SiteRead';
import Templates from './Templates';
import Place from './Place';

const ERRORS = {
	denied: __(
		'Die Verbindung wurde bei engenty.ai abgelehnt. Du kannst es jederzeit noch einmal versuchen.',
		'engenty-wizards'
	),
	expired: __(
		'Die Anmeldung hat zu lange gedauert. Bitte noch einmal.',
		'engenty-wizards'
	),
	failed: __(
		'Die Verbindung hat nicht geklappt. Bitte noch einmal versuchen.',
		'engenty-wizards'
	),
};

/**
 * Not connected: what engenty does for the site, and the way to a free account.
 * @param root0
 * @param root0.status
 */
function Welcome( { status } ) {
	const [ busy, setBusy ] = useState( null );
	const [ error, setError ] = useState(
		boot.error ? ERRORS[ boot.error ] ?? ERRORS.failed : null
	);
	const site = status.site;
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
	if ( ! status.can?.manage ) {
		return (
			<Card>
				<p>
					{ __(
						'engenty ist noch nicht verbunden. Bitte eine Administratorin oder einen Administrator, die Website zu verbinden.',
						'engenty-wizards'
					) }
				</p>
			</Card>
		);
	}
	return (
		<div className="en-welcome">
			<div className="en-welcome__hero">
				<Mark size={ 72 } />
				<h1>
					{ sprintf(
						/* translators: %s: site name */
						__( 'Eigene KI für %s', 'engenty-wizards' ),
						site.name || pathOf( site.url )
					) }
				</h1>
				<p className="en-lead">
					{ __(
						'engenty liest deine Website und macht daraus Assistenten für Anfragen, Angebote und Termine. Sie laufen auf engenty.ai und erscheinen auf deiner Seite als Block, Shortcode, Elementor-Widget oder Chat-Blase.',
						'engenty-wizards'
					) }
				</p>
				<Button
					kind="primary"
					className="en-btn--large"
					busy={ busy === 'signup' }
					onClick={ () => go( true ) }
				>
					{ __( 'Eigene KI erstellen', 'engenty-wizards' ) } →
				</Button>
				<ul className="en-checks">
					<li>{ __( 'Kostenloses Konto', 'engenty-wizards' ) }</li>
					<li>{ __( 'Keine Kreditkarte', 'engenty-wizards' ) }</li>
					<li>
						{ __(
							'Deine Website bleibt, wie sie ist',
							'engenty-wizards'
						) }
					</li>
				</ul>
				<p className="en-muted">
					{ __( 'Schon ein Konto bei engenty?', 'engenty-wizards' ) }{ ' ' }
					<button
						type="button"
						className="en-link"
						onClick={ () => go( false ) }
						disabled={ busy !== null }
					>
						{ busy === 'login'
							? __( 'Einen Moment …', 'engenty-wizards' )
							: __( 'Anmelden', 'engenty-wizards' ) }
					</button>
				</p>
				{ error ? <Notice tone="error">{ error }</Notice> : null }
			</div>
			<div className="en-grid en-grid--3">
				<Card title={ __( '1 · Konto', 'engenty-wizards' ) }>
					<p>
						{ __(
							'Du legst bei engenty.ai ein Konto an oder meldest dich an und erlaubst der Website den Zugriff. Danach geht es hierher zurück.',
							'engenty-wizards'
						) }
					</p>
				</Card>
				<Card title={ __( '2 · Website einlesen', 'engenty-wizards' ) }>
					<p>
						{ __(
							'Name, Logo, Farben, Kontaktdaten und deine Seiten: Du siehst, was gefunden wurde, und wählst, was engenty bekommt.',
							'engenty-wizards'
						) }
					</p>
				</Card>
				<Card
					title={ __(
						'3 · Wizard auf die Seite',
						'engenty-wizards'
					) }
				>
					<p>
						{ __(
							'Eine Vorlage wählen, live schalten, als Chat-Blase oder auf einer Seite zeigen. Ergebnisse siehst du hier im Admin.',
							'engenty-wizards'
						) }
					</p>
				</Card>
			</div>
			<p className="en-fine">
				{ __(
					'Besucher reden direkt mit engenty.ai; WordPress speichert keine Antworten. Erwähne engenty in deiner Datenschutzerklärung – den Satz dazu findest du nach dem Verbinden in den Einstellungen.',
					'engenty-wizards'
				) }
			</p>
		</div>
	);
}

const STEPS = [
	[ 'site', __( 'Website einlesen', 'engenty-wizards' ) ],
	[ 'wizard', __( 'Ersten Wizard anlegen', 'engenty-wizards' ) ],
	[ 'placed', __( 'Auf die Website bringen', 'engenty-wizards' ) ],
];

/**
 * Connected: the setup's steps until they are done, then the overview.
 * @param root0
 * @param root0.status
 * @param root0.reload
 */
function Setup( { status, reload } ) {
	const me = status.me;
	const [ setup, setSetup ] = useState( status.setup );
	const firstOpen = STEPS.find( ( [ id ] ) => ! setup[ id ] )?.[ 0 ] ?? null;
	const [ open, setOpen ] = useState( firstOpen );
	const mark = async ( id, value = true ) => {
		const res = await post( '/settings', { setup: { [ id ]: value } } );
		setSetup( res.settings.setup );
		const next =
			STEPS.find( ( [ s ] ) => ! res.settings.setup[ s ] )?.[ 0 ] ?? null;
		setOpen( next );
		return res;
	};
	const done = STEPS.every( ( [ id ] ) => setup[ id ] ) || setup.done;
	return (
		<>
			{ boot.connected ? (
				<Notice tone="success">
					{ sprintf(
						/* translators: %s: account e-mail */
						__(
							'Verbunden als %s. Willkommen bei engenty!',
							'engenty-wizards'
						),
						me?.user?.email || me?.user?.name || ''
					) }
				</Notice>
			) : null }
			{ status.error ? (
				<Notice tone="error">{ status.error.message }</Notice>
			) : null }
			{ done ? null : (
				<Card
					title={ __( 'Einrichten', 'engenty-wizards' ) }
					aside={
						<button
							type="button"
							className="en-link"
							onClick={ () => mark( 'done' ) }
						>
							{ __( 'Später', 'engenty-wizards' ) }
						</button>
					}
				>
					<ol className="en-steps">
						<li className="en-step is-done">
							<div className="en-step__head">
								<span className="en-step__dot">✓</span>
								<strong>
									{ __(
										'Konto verbunden',
										'engenty-wizards'
									) }
								</strong>
								<span className="en-muted">
									{ me?.user?.email } ·{ ' ' }
									{ me?.tenant?.plan?.name ?? 'Free' }
								</span>
							</div>
						</li>
						{ STEPS.map( ( [ id, label ], i ) => (
							<li
								key={ id }
								className={ `en-step ${
									setup[ id ] ? 'is-done' : ''
								} ${ open === id ? 'is-open' : '' }` }
							>
								<button
									type="button"
									className="en-step__head"
									onClick={ () =>
										setOpen( open === id ? null : id )
									}
								>
									<span className="en-step__dot">
										{ setup[ id ] ? '✓' : i + 2 }
									</span>
									<strong>{ label }</strong>
									{ id === 'site' && ! me?.build ? (
										<Chip tone="ember">Pro</Chip>
									) : null }
								</button>
								{ open === id ? (
									<div className="en-step__body">
										{ id === 'site' ? (
											<SiteRead
												me={ me }
												onDone={ () => mark( 'site' ) }
												onSkip={ () => mark( 'site' ) }
											/>
										) : null }
										{ id === 'wizard' ? (
											<Templates
												me={ me }
												onCreated={ () =>
													mark( 'wizard' )
												}
												onSkip={ () =>
													mark( 'wizard' )
												}
											/>
										) : null }
										{ id === 'placed' ? (
											<Place
												me={ me }
												onPlaced={ () =>
													mark( 'placed' )
												}
											/>
										) : null }
									</div>
								) : null }
							</li>
						) ) }
					</ol>
				</Card>
			) }
			{ /* Drawn anew after each step: a step makes wizards and results to count. */ }
			<Overview
				key={ JSON.stringify( setup ) }
				status={ status }
				reload={ reload }
			/>
		</>
	);
}

/**
 * What is going on: wizards live, the latest results, what Pro would add.
 * @param root0
 * @param root0.status
 */
function Overview( { status } ) {
	const me = status.me;
	const [ wizards, setWizards ] = useState( null );
	const [ runs, setRuns ] = useState( null );
	useEffect( () => {
		api( '/wizards' )
			.then( ( r ) => setWizards( r.wizards ) )
			.catch( () => setWizards( [] ) );
		if ( status.can?.results ) {
			api( '/runs?days=30' )
				.then( setRuns )
				.catch( () => setRuns( null ) );
		}
	}, [ status.can?.results ] );
	const live = ( wizards ?? [] ).filter( ( w ) => w.published );
	return (
		<>
			<div className="en-grid en-grid--3">
				<div className="en-stat">
					<span className="en-stat__n">
						{ wizards ? live.length : '–' }
					</span>
					<span>{ __( 'Wizards live', 'engenty-wizards' ) }</span>
				</div>
				<div className="en-stat">
					<span className="en-stat__n">
						{ runs ? runs.total : '–' }
					</span>
					<span>
						{ __( 'Ergebnisse in 30 Tagen', 'engenty-wizards' ) }
					</span>
				</div>
				<div className="en-stat">
					<span className="en-stat__n">
						{ me?.tenant?.credits !== null &&
						me?.tenant?.credits !== undefined
							? Math.floor( me.tenant.credits ).toLocaleString()
							: '–' }
					</span>
					<span>
						{ __( 'Credits', 'engenty-wizards' ) }
						{ me?.urls?.billing ? (
							<>
								{ ' · ' }
								<a
									href={ me.urls.billing }
									target="_blank"
									rel="noopener noreferrer"
								>
									{ __( 'aufladen', 'engenty-wizards' ) }
								</a>
							</>
						) : null }
					</span>
				</div>
			</div>
			<div className="en-grid en-grid--2">
				<Card
					title={ __( 'Neueste Ergebnisse', 'engenty-wizards' ) }
					aside={
						<a href={ pageUrl( 'engenty-results' ) }>
							{ __( 'Alle', 'engenty-wizards' ) }
						</a>
					}
				>
					{ ! status.can?.results ? (
						<p className="en-muted">
							{ __(
								'Ergebnisse sehen die Rollen, die in den Einstellungen dafür gewählt sind.',
								'engenty-wizards'
							) }
						</p>
					) : ! runs ? (
						<Spinner />
					) : runs.runs.length ? (
						<ul className="en-list">
							{ runs.runs.slice( 0, 6 ).map( ( r ) => (
								<li key={ r.id }>
									<a
										href={ pageUrl(
											'engenty-results',
											`&run=${ r.id }`
										) }
									>
										<strong>{ r.wizard }</strong>
										<span className="en-muted">
											{ r.email || r.summary || '—' }
										</span>
									</a>
									<span className="en-muted">
										{ when( r.createdAt ) }
									</span>
								</li>
							) ) }
						</ul>
					) : (
						<p className="en-muted">
							{ __(
								'Noch keine. Sobald Besucher einen Wizard abschließen, stehen ihre Antworten hier.',
								'engenty-wizards'
							) }
						</p>
					) }
				</Card>
				{ me?.missing?.length ? (
					<ProUpsell
						feature={
							me.missing.includes( 'contacts' )
								? 'contacts'
								: 'appointments'
						}
						me={ me }
						compact
					/>
				) : (
					<Card
						title={ __( 'Wizards', 'engenty-wizards' ) }
						aside={
							<a href={ pageUrl( 'engenty-wizards' ) }>
								{ __( 'Alle', 'engenty-wizards' ) }
							</a>
						}
					>
						<ul className="en-list">
							{ live.slice( 0, 6 ).map( ( w ) => (
								<li key={ w.id }>
									<strong>{ w.title }</strong>
									<Chip
										tone={ w.available ? 'moss' : 'grey' }
									>
										{ w.available
											? 'Live'
											: __(
													'Pausiert',
													'engenty-wizards'
											  ) }
									</Chip>
								</li>
							) ) }
						</ul>
					</Card>
				) }
			</div>
			{ isFree( me ) && ! me?.build ? (
				<ProUpsell feature="build" me={ me } compact />
			) : null }
		</>
	);
}

export default function Home( { status, reload } ) {
	return status.connected ? (
		<Setup status={ status } reload={ reload } />
	) : (
		<Welcome status={ status } />
	);
}
