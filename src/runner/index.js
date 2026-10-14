import { createRoot, useEffect, useRef, useState } from '@wordpress/element';
import { RunnerBody, api, configureRunner, t } from '@engenty-wizards/runner';
import { engentyMarkup } from '../admin/engenties';
import { useLocalRun } from './useLocalRun';
import '@engenty-wizards/runner/runner.css';
import './runner.css';

/*
 * A standalone wizard on the site: every `<div data-engenty-local="…">` (the block, the
 * shortcode, the Elementor widget, the PHP tag, the bubble) becomes the runner. The runner's
 * components are the studio's (@engenty-wizards/runner); the run lives in this site's REST
 * routes (includes/class-runs.php).
 */

const boot = window.engentyRunner || {};
const REST = ( boot.rest || '/wp-json/engenty/v1' ).replace( /\/+$/, '' );
const VISITOR_KEY = 'engenty.visitor';

/** The id a browser keeps, so the site can count a visitor's runs without a cookie. */
function visitorId() {
	try {
		let id = window.localStorage.getItem( VISITOR_KEY );
		if ( ! id ) {
			id =
				Math.random().toString( 36 ).slice( 2 ) +
				Date.now().toString( 36 );
			window.localStorage.setItem( VISITOR_KEY, id );
		}
		return id;
	} catch {
		return 'none';
	}
}

/**
 * The wizard's engenty, as the studio draws it: one eye, its own shape and colour.
 * @param {Object} root0
 * @param {Object} root0.kind
 * @param {Object} root0.size
 */
function Mascot( { kind = 'round', size = 64 } ) {
	return (
		<svg
			width={ size }
			height={ size }
			viewBox="0 0 120 120"
			overflow="visible"
			aria-hidden="true"
			className="en-run__engenty"
			// eslint-disable-next-line react/no-danger -- fixed markup from engenties.js.
			dangerouslySetInnerHTML={ { __html: engentyMarkup( kind ) } }
		/>
	);
}

configureRunner( {
	lang: boot.lang === 'de' ? 'de' : 'en',
	runBase: ( runId ) =>
		`${ REST }/local/runs/${ encodeURIComponent( runId ) }`,
	withBase: ( path ) => path,
	asset: () => boot.icon || '',
	headers: { 'X-Engenty-Visitor': visitorId() },
	Mascot,
	// This server writes no PDF: the runner makes one in the browser; HTML is a page to print.
	standalone: true,
} );

const lastRunKey = ( token ) => `engenty.run.${ token }`;

function StartScreen( { wizard, onStart } ) {
	const [ busy, setBusy ] = useState( false );
	const [ error, setError ] = useState( null );
	const start = async () => {
		setBusy( true );
		setError( null );
		try {
			const { runId, view } = await api.post(
				`${ REST }/local/wizards/${ encodeURIComponent(
					wizard.token
				) }/runs`,
				{ origin: wizard.page || window.location.href, website: '' }
			);
			try {
				window.localStorage.setItem(
					lastRunKey( wizard.token ),
					runId
				);
			} catch {
				// resuming is a convenience
			}
			onStart( runId, view );
		} catch ( err ) {
			setError( err.message );
			setBusy( false );
		}
	};
	return (
		<div className="en-run__start">
			<Mascot kind={ wizard.avatar } size={ 150 } />
			<h1 className="en-run__title">{ wizard.title }</h1>
			{ wizard.description ? (
				<p className="en-run__lead">{ wizard.description }</p>
			) : null }
			{ wizard.available ? (
				<button
					type="button"
					className="en-run__cta"
					disabled={ busy }
					onClick={ start }
				>
					{ t( 'run.start' ) } →
				</button>
			) : (
				<p className="en-run__unavailable">
					{ wizard.unavailableReason || t( 'run.unavailable' ) }
				</p>
			) }
			{ error ? <p className="en-run__error">{ error }</p> : null }
		</div>
	);
}

function Runner( { runId, initial, onRestart } ) {
	const run = useLocalRun( runId, initial );
	return <RunnerBody run={ run } compact onRestart={ onRestart } />;
}

function Wizard( { token, page, onTitle } ) {
	const [ wizard, setWizard ] = useState( null );
	const [ failed, setFailed ] = useState( false );
	const [ started, setStarted ] = useState( null );
	useEffect( () => {
		api.get( `${ REST }/local/wizards/${ encodeURIComponent( token ) }` )
			.then( ( w ) => {
				setWizard( { ...w, page } );
				onTitle?.( w.title );
			} )
			.catch( () => setFailed( true ) );
	}, [ token, page, onTitle ] );
	if ( failed ) {
		return <div className="en-run__gone">{ t( 'run.notFound' ) }</div>;
	}
	if ( ! wizard ) {
		return <div className="en-run__loading" />;
	}
	return (
		<div className="en-run">
			{ started ? (
				<Runner
					key={ started.runId }
					runId={ started.runId }
					initial={ started.view }
					onRestart={ () => setStarted( null ) }
				/>
			) : (
				<StartScreen
					wizard={ wizard }
					onStart={ ( runId, view ) => setStarted( { runId, view } ) }
				/>
			) }
			<p className="en-run__foot">
				{ boot.lang === 'en'
					? 'Runs on this website'
					: 'Läuft auf dieser Website' }
				{ boot.provider
					? ` · ${
							boot.lang === 'en'
								? 'answers go to'
								: 'Antworten gehen an'
					  } ${ boot.provider }`
					: '' }
				{ boot.privacy ? (
					<>
						{ ' · ' }
						<a
							href={ boot.privacy }
							target="_blank"
							rel="noopener noreferrer"
						>
							{ boot.lang === 'en' ? 'Privacy' : 'Datenschutz' }
						</a>
					</>
				) : null }
			</p>
		</div>
	);
}

/**
 * Behind a button, or as a bubble at the bottom right: the wizard in a dialog.
 * @param {Object} root0
 * @param {Object} root0.token
 * @param {Object} root0.page
 * @param {Object} root0.mode
 * @param {Object} root0.label
 * @param {Object} root0.text
 * @param {Object} root0.color
 * @param {Object} root0.title
 */
function Opener( { token, page, mode, label, text, color, title } ) {
	const dialog = useRef( null );
	const [ open, setOpen ] = useState( false );
	useEffect( () => {
		const el = dialog.current;
		if ( ! el ) {
			return;
		}
		if ( open && ! el.open ) {
			el.showModal();
		} else if ( ! open && el.open ) {
			el.close();
		}
	}, [ open ] );
	return (
		<>
			{ mode === 'bubble' ? (
				<button
					type="button"
					className="en-run__bubble"
					style={ color ? { background: color } : undefined }
					aria-label={ label || title }
					onClick={ () => setOpen( true ) }
				>
					{ text ? (
						<span className="en-run__bubble-text">{ text }</span>
					) : null }
					<span className="en-run__bubble-dot" aria-hidden="true">
						<Mascot kind="drop" size={ 30 } />
					</span>
				</button>
			) : (
				<button
					type="button"
					className="en-run__cta en-run__cta--open"
					onClick={ () => setOpen( true ) }
				>
					{ label || title }
				</button>
			) }
			<dialog
				ref={ dialog }
				className="en-run__dialog engenty-runner"
				onClose={ () => setOpen( false ) }
			>
				<button
					type="button"
					className="en-run__close"
					aria-label={ t( 'common.close' ) }
					onClick={ () => setOpen( false ) }
				>
					×
				</button>
				{ open ? <Wizard token={ token } page={ page } /> : null }
			</dialog>
		</>
	);
}

for ( const el of document.querySelectorAll( '[data-engenty-local]' ) ) {
	const d = el.dataset;
	const props = {
		token: d.engentyLocal,
		page: d.page || window.location.href,
		mode: d.mode || 'inline',
		label: d.label || '',
		text: d.text || '',
		color: d.color || '',
		title: d.title || '',
	};
	createRoot( el ).render(
		props.mode === 'inline' ? (
			<Wizard token={ props.token } page={ props.page } />
		) : (
			<Opener { ...props } />
		)
	);
}
