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
	useConnect,
} from './ui';
import SiteRead from './SiteRead';
import Templates from './Templates';
import Place from './Place';
import { Choice, LocalSetup } from './Start';

const ERRORS = {
	denied: __(
		'The connection was refused at engenty.ai. You can try again at any time.',
		'engenty-wizards'
	),
	expired: __(
		'The sign-in took too long. Please try again.',
		'engenty-wizards'
	),
	failed: __(
		'The connection did not work. Please try again.',
		'engenty-wizards'
	),
};

/**
 * Not connected: what engenty does for the site, and the way to a free account.
 * @param {Object} root0
 * @param {Object} root0.status
 * @param {Object} root0.onLocal
 */
function Welcome( { status, onLocal } ) {
	const [ busy, setBusy ] = useState( null );
	const [ choosing, setChoosing ] = useState( false );
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
						'engenty is not connected yet. Ask an administrator to connect the website.',
						'engenty-wizards'
					) }
				</p>
			</Card>
		);
	}
	if ( choosing ) {
		return (
			<div className="en-welcome">
				<Choice
					status={ status }
					onLocal={ onLocal }
					onBack={ () => setChoosing( false ) }
				/>
			</div>
		);
	}
	return (
		<div className="en-welcome">
			<div className="en-welcome__hero">
				<Mark size={ 72 } />
				<h1>
					{ sprintf(
						/* translators: %s: site name */
						__( 'Your own AI for %s', 'engenty-wizards' ),
						site.name || pathOf( site.url )
					) }
				</h1>
				<p className="en-lead">
					{ __(
						'engenty reads your website and turns it into assistants for requests, quotes and appointments. They run on engenty.ai and appear on your site as a block, a shortcode, an Elementor widget or a chat bubble.',
						'engenty-wizards'
					) }
				</p>
				<Button
					kind="primary"
					className="en-btn--large"
					onClick={ () => setChoosing( true ) }
				>
					{ __( 'Create your own AI', 'engenty-wizards' ) } →
				</Button>
				<ul className="en-checks">
					<li>{ __( 'Free account', 'engenty-wizards' ) }</li>
					<li>{ __( 'No credit card', 'engenty-wizards' ) }</li>
					<li>
						{ __(
							'Your website stays as it is',
							'engenty-wizards'
						) }
					</li>
				</ul>
				<p className="en-muted">
					{ __(
						'Already have an engenty account?',
						'engenty-wizards'
					) }{ ' ' }
					<button
						type="button"
						className="en-link"
						onClick={ () => go( false ) }
						disabled={ busy !== null }
					>
						{ busy === 'login'
							? __( 'One moment …', 'engenty-wizards' )
							: __( 'Sign in', 'engenty-wizards' ) }
					</button>
				</p>
				{ error ? <Notice tone="error">{ error }</Notice> : null }
			</div>
			<div className="en-grid en-grid--3">
				<Card title={ __( '1 · Account', 'engenty-wizards' ) }>
					<p>
						{ __(
							'You create an account at engenty.ai or sign in and allow the website access. Then you come back here.',
							'engenty-wizards'
						) }
					</p>
				</Card>
				<Card title={ __( '2 · Read the website', 'engenty-wizards' ) }>
					<p>
						{ __(
							'Name, logo, colors, contact details and your pages: you see what was found and choose what engenty gets.',
							'engenty-wizards'
						) }
					</p>
				</Card>
				<Card
					title={ __( '3 · Wizard on the site', 'engenty-wizards' ) }
				>
					<p>
						{ __(
							'Choose a template, set it live, show it as a chat bubble or on a page. You see results here in the admin.',
							'engenty-wizards'
						) }
					</p>
				</Card>
			</div>
			<p className="en-fine">
				{ __(
					'Visitors talk directly to engenty.ai; WordPress stores no answers. Mention engenty in your privacy policy – you find the sentence for it in the settings after connecting.',
					'engenty-wizards'
				) }
			</p>
		</div>
	);
}

const STEPS = [
	[ 'site', __( 'Read the website', 'engenty-wizards' ) ],
	[ 'wizard', __( 'Create the first wizard', 'engenty-wizards' ) ],
	[ 'placed', __( 'Put on the website', 'engenty-wizards' ) ],
];

/**
 * Connected: the setup's steps until they are done, then the overview.
 * @param {Object} root0
 * @param {Object} root0.status
 * @param {Object} root0.reload
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
							'Connected as %s. Welcome to engenty!',
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
					title={ __( 'Set up', 'engenty-wizards' ) }
					aside={
						<button
							type="button"
							className="en-link"
							onClick={ () => mark( 'done' ) }
						>
							{ __( 'Later', 'engenty-wizards' ) }
						</button>
					}
				>
					<ol className="en-steps">
						<li className="en-step is-done">
							<div className="en-step__head">
								<span className="en-step__dot">✓</span>
								<strong>
									{ __(
										'Account connected',
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
 * @param {Object} root0
 * @param {Object} root0.status
 */
/**
 * The latest results, or why there are none.
 * @param {Object} status
 * @param {Object} runs
 */
function latestResults( status, runs ) {
	if ( ! status.can?.results ) {
		return (
			<p className="en-muted">
				{ __(
					'Results are visible to the roles chosen for it in the settings.',
					'engenty-wizards'
				) }
			</p>
		);
	}
	if ( ! runs ) {
		return <Spinner />;
	}
	if ( ! runs.runs.length ) {
		return (
			<p className="en-muted">
				{ __(
					'None yet. As soon as visitors complete a wizard, their answers are here.',
					'engenty-wizards'
				) }
			</p>
		);
	}
	return (
		<ul className="en-list">
			{ runs.runs.slice( 0, 6 ).map( ( r ) => (
				<li key={ r.id }>
					<a href={ pageUrl( 'engenty-results', `&run=${ r.id }` ) }>
						<strong>{ r.wizard }</strong>
						<span className="en-muted">
							{ r.email || r.summary || '—' }
						</span>
					</a>
					<span className="en-muted">{ when( r.createdAt ) }</span>
				</li>
			) ) }
		</ul>
	);
}

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
						{ __( 'Results in 30 days', 'engenty-wizards' ) }
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
									{ __( 'top up', 'engenty-wizards' ) }
								</a>
							</>
						) : null }
					</span>
				</div>
			</div>
			<div className="en-grid en-grid--2">
				<Card
					title={ __( 'Latest results', 'engenty-wizards' ) }
					aside={
						<a href={ pageUrl( 'engenty-results' ) }>
							{ __( 'All', 'engenty-wizards' ) }
						</a>
					}
				>
					{ latestResults( status, runs ) }
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
								{ __( 'All', 'engenty-wizards' ) }
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
													'Paused',
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

/**
 * A site that went local: the three steps until they are done, then what is going on.
 * @param {Object} root0
 * @param {Object} root0.status
 * @param {Object} root0.reload
 */
function LocalHome( { status, reload } ) {
	const [ wizards, setWizards ] = useState( null );
	const [ runs, setRuns ] = useState( null );
	useEffect( () => {
		api( '/wizards' )
			.then( ( r ) => setWizards( r.wizards ) )
			.catch( () => setWizards( [] ) );
		if ( status.can?.results ) {
			api( '/runs?local=1&days=30' )
				.then( setRuns )
				.catch( () => setRuns( null ) );
		}
	}, [ status.can?.results ] );
	const live = ( wizards ?? [] ).filter( ( w ) => w.available );
	return (
		<>
			{ status.local?.provider?.ready ? null : (
				<Notice tone="error">
					{ status.local?.provider?.note ||
						__(
							'WordPress has no AI provider that answers right now: Settings → Connectors.',
							'engenty-wizards'
						) }
				</Notice>
			) }
			<LocalSetup status={ status } reload={ reload } />
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
						{ __( 'Results in 30 days', 'engenty-wizards' ) }
					</span>
				</div>
				<div className="en-stat">
					<span className="en-stat__n">
						{ status.local?.provider?.name ?? '–' }
					</span>
					<span>
						{ __(
							'thinks for the wizards · without credits',
							'engenty-wizards'
						) }
					</span>
				</div>
			</div>
			<div className="en-grid en-grid--2">
				<Card
					title={ __( 'Latest results', 'engenty-wizards' ) }
					aside={
						<a href={ pageUrl( 'engenty-results' ) }>
							{ __( 'All', 'engenty-wizards' ) }
						</a>
					}
				>
					{ latestResults( status, runs ?? { runs: [] } ) }
				</Card>
				<Card
					title={ __( 'With an account', 'engenty-wizards' ) }
					aside={ <Chip tone="ember">Pro</Chip> }
				>
					<p className="en-muted">
						{ __(
							'Studio, contacts, appointments, PDFs, web search and the wizards that need more. The local ones keep running.',
							'engenty-wizards'
						) }
					</p>
					<ConnectButtons status={ status } />
				</Card>
			</div>
		</>
	);
}

function ConnectButtons( { status } ) {
	const { busy, error, go } = useConnect();
	if ( ! status.can?.manage ) {
		return null;
	}
	return (
		<>
			<div className="en-row">
				<Button
					kind="primary"
					className="en-btn--small"
					busy={ busy === 'signup' }
					onClick={ () => go( true ) }
				>
					{ __( 'Create a free account', 'engenty-wizards' ) } →
				</Button>
				<Button
					kind="ghost"
					className="en-btn--small"
					busy={ busy === 'login' }
					onClick={ () => go( false ) }
				>
					{ __( 'Sign in', 'engenty-wizards' ) }
				</Button>
			</div>
			{ error ? <Notice tone="error">{ error }</Notice> : null }
		</>
	);
}

export default function Home( { status, reload } ) {
	if ( status.connected ) {
		return <Setup status={ status } reload={ reload } />;
	}
	if ( status.local?.mode === 'local' ) {
		return <LocalHome status={ status } reload={ reload } />;
	}
	return <Welcome status={ status } onLocal={ () => reload( true ) } />;
}
