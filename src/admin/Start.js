import { useState } from '@wordpress/element';
import { __, sprintf } from '@wordpress/i18n';
import { post, problem } from './api';
import { Button, Card, Chip, Engenty, Notice, Spinner, useConnect } from './ui';
import Templates from './Templates';
import Place from './Place';

/**
 * After "Eigene KI erstellen": the account (large), or local with the provider the site has.
 * @param {Object} root0
 * @param {Object} root0.status
 * @param {Object} root0.onLocal
 * @param {Object} root0.onBack
 */
/**
 * What the local way says of the provider the site has.
 * @param {Object} provider
 */
function localText( provider ) {
	if ( provider?.ready ) {
		return __(
			'Wizards aus den mitgelieferten Vorlagen laufen auf dieser Website, ohne Konto und ohne Credits. Der Anbieter rechnet mit deinem Schlüssel ab.',
			'engenty-wizards'
		);
	}
	if ( provider?.client ) {
		return __(
			'Richte zuerst einen KI-Anbieter ein: WordPress → Einstellungen → Connectors.',
			'engenty-wizards'
		);
	}
	return __(
		'Braucht WordPress 7.0 mit einem KI-Anbieter unter Einstellungen → Connectors.',
		'engenty-wizards'
	);
}

export function Choice( { status, onLocal, onBack } ) {
	const { busy, error, go } = useConnect();
	const provider = status.local?.provider;
	const [ picking, setPicking ] = useState( false );
	const [ problemText, setProblemText ] = useState( null );
	const local = async () => {
		setPicking( true );
		setProblemText( null );
		try {
			await post( '/setup', { mode: 'local' } );
			onLocal();
		} catch ( e ) {
			setProblemText( problem( e ).message );
			setPicking( false );
		}
	};
	return (
		<div className="en-choice">
			<div className="en-choice__card">
				<Engenty kind="drop" size={ 72 } />
				<h2>{ __( 'Deine KI bei engenty', 'engenty-wizards' ) }</h2>
				<p>
					{ __(
						'Ein kostenloses Konto, und engenty liest deine Website ein, baut Wizards aus Vorlagen und zeigt Ergebnisse, Kontakte und Termine hier im Admin.',
						'engenty-wizards'
					) }
				</p>
				<div className="en-row en-row--center">
					<Button
						kind="primary"
						className="en-btn--large"
						busy={ busy === 'signup' }
						disabled={ busy !== null }
						onClick={ () => go( true ) }
					>
						{ __( 'Kostenloses Konto anlegen', 'engenty-wizards' ) }{ ' ' }
						→
					</Button>
					<Button
						kind="ghost"
						className="en-btn--large"
						busy={ busy === 'login' }
						disabled={ busy !== null }
						onClick={ () => go( false ) }
					>
						{ __( 'Anmelden', 'engenty-wizards' ) }
					</Button>
				</div>
				{ error ? <Notice tone="error">{ error }</Notice> : null }
			</div>
			<div className="en-choice__or">
				{ __( 'oder', 'engenty-wizards' ) }
			</div>
			<div className="en-choice__local">
				<div>
					<strong>
						{ __(
							'Lokal, mit eigenem KI-Anbieter',
							'engenty-wizards'
						) }
						{ provider?.ready ? (
							<Chip tone="moss">
								{ sprintf(
									/* translators: %s: provider */ __(
										'%s erkannt',
										'engenty-wizards'
									),
									provider.name
								) }
							</Chip>
						) : (
							<Chip>
								{ __( 'kein Anbieter', 'engenty-wizards' ) }
							</Chip>
						) }
					</strong>
					<p>{ localText( provider ) }</p>
					{ problemText ? (
						<p className="en-warn">{ problemText }</p>
					) : null }
				</div>
				{ provider?.ready ? (
					<Button busy={ picking } onClick={ local }>
						{ __( 'Lokal einrichten', 'engenty-wizards' ) }
					</Button>
				) : (
					<Button
						href={ `${ window.location.origin }/wp-admin/options-general.php?page=connectors` }
					>
						{ __( 'Connectors öffnen', 'engenty-wizards' ) }
					</Button>
				) }
			</div>
			<p className="en-muted en-small">
				{ __( 'Wechseln geht später jederzeit.', 'engenty-wizards' ) }
				{ onBack ? (
					<>
						{ ' · ' }
						<button
							type="button"
							className="en-link"
							onClick={ onBack }
						>
							{ __( 'Zurück', 'engenty-wizards' ) }
						</button>
					</>
				) : null }
			</p>
		</div>
	);
}

const STEPS = [
	[ 'provider', __( 'KI-Anbieter', 'engenty-wizards' ) ],
	[ 'wizard', __( 'Wizards wählen', 'engenty-wizards' ) ],
	[ 'placed', __( 'Auf die Website bringen', 'engenty-wizards' ) ],
];

/**
 * The local setup, as the Übersicht's "Einrichten" card: the provider, the gallery, the site.
 * @param {Object} root0
 * @param {Object} root0.status
 * @param {Object} root0.reload
 */
export function LocalSetup( { status, reload } ) {
	const provider = status.local?.provider;
	const [ setup, setSetup ] = useState( {
		...status.setup,
		provider: Boolean( provider?.ready ),
	} );
	const firstOpen = STEPS.find( ( [ id ] ) => ! setup[ id ] )?.[ 0 ] ?? null;
	const [ open, setOpen ] = useState( firstOpen );
	const [ test, setTest ] = useState( null );
	const [ testing, setTesting ] = useState( false );
	const mark = async ( id, value = true ) => {
		if ( id === 'provider' ) {
			setSetup( { ...setup, provider: value } );
			setOpen( 'wizard' );
			return;
		}
		const res = await post( '/settings', { setup: { [ id ]: value } } );
		const next = { ...res.settings.setup, provider: setup.provider };
		setSetup( next );
		setOpen( STEPS.find( ( [ s ] ) => ! next[ s ] )?.[ 0 ] ?? null );
	};
	const runTest = async () => {
		setTesting( true );
		setTest( null );
		try {
			const res = await post( '/provider/test' );
			setTest( res );
		} catch ( e ) {
			setTest( { error: problem( e ).message } );
		}
		setTesting( false );
	};
	const done = STEPS.every( ( [ id ] ) => setup[ id ] ) || setup.done;
	if ( done ) {
		return null;
	}
	return (
		<Card
			title={ __( 'Lokal einrichten', 'engenty-wizards' ) }
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
							onClick={ () => setOpen( open === id ? null : id ) }
						>
							<span className="en-step__dot">
								{ setup[ id ] ? '✓' : i + 1 }
							</span>
							<strong>{ label }</strong>
							{ id === 'provider' && provider?.name ? (
								<span className="en-muted">
									{ provider.name }
									{ provider.model
										? ` · ${ provider.model }`
										: '' }
								</span>
							) : null }
						</button>
						{ open === id ? (
							<div className="en-step__body">
								{ id === 'provider' ? (
									<>
										<p className="en-muted">
											{ __(
												'Welcher Anbieter und welcher Schlüssel: das regelt WordPress unter Einstellungen → Connectors, nicht das Plugin. Hier siehst du, ob er antwortet.',
												'engenty-wizards'
											) }
										</p>
										<div className="en-row">
											<Button
												busy={ testing }
												onClick={ runTest }
											>
												{ __(
													'Testen',
													'engenty-wizards'
												) }
											</Button>
											{ test?.ok ? (
												<span className="en-muted en-small">
													{ sprintf(
														/* translators: %s: seconds */ __(
															'antwortet · %s s',
															'engenty-wizards'
														),
														String(
															test.seconds
														).replace( '.', ',' )
													) }
													{ test.json
														? ` · JSON ok`
														: ` · ${ __(
																'kein JSON',
																'engenty-wizards'
														  ) }` }
													{ test.provider?.images
														? ` · ${ __(
																'nimmt Bilder',
																'engenty-wizards'
														  ) }`
														: ` · ${ __(
																'nimmt keine Bilder',
																'engenty-wizards'
														  ) }` }
												</span>
											) : null }
											{ test?.error ? (
												<span className="en-warn">
													{ test.error }
												</span>
											) : null }
											<Button
												kind="ghost"
												onClick={ () =>
													mark( 'provider' )
												}
											>
												{ __(
													'Weiter',
													'engenty-wizards'
												) }
											</Button>
										</div>
									</>
								) : null }
								{ id === 'wizard' ? (
									<Templates
										local
										provider={ provider?.name }
										onCreated={ () => mark( 'wizard' ) }
										onSkip={ () => mark( 'wizard' ) }
									/>
								) : null }
								{ id === 'placed' ? (
									<Place
										onPlaced={ () => mark( 'placed' ) }
									/>
								) : null }
							</div>
						) : null }
					</li>
				) ) }
			</ol>
			{ reload ? null : <Spinner /> }
		</Card>
	);
}
