import { useEffect, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { api, post, problem } from './api';
import {
	Button,
	Card,
	CopyField,
	Notice,
	Spinner,
	isFree,
	useConnect,
} from './ui';

/**
 * "Eigenständige Wizards": one line naming the provider WordPress set (Einstellungen → Connectors),
 * a test, the limits, how long results are kept, photos to the provider, the web as a tool.
 * @param {Object} root0
 * @param {Object} root0.status
 * @param {Object} root0.local    The local settings as edited.
 * @param {Object} root0.onChange
 */
function Standalone( { status, local, onChange } ) {
	const provider = status.local?.provider;
	const [ test, setTest ] = useState( null );
	const [ testing, setTesting ] = useState( false );
	const runTest = async () => {
		setTesting( true );
		setTest( null );
		try {
			setTest( await post( '/provider/test' ) );
		} catch ( e ) {
			setTest( { error: problem( e ).message } );
		}
		setTesting( false );
	};
	const connectors = `${ window.location.origin }/wp-admin/options-general.php?page=connectors`;
	return (
		<>
			<h2 className="en-section">
				{ __( 'Standalone wizards', 'engenty-wizards' ) }
			</h2>
			<Card>
				<div className="en-row en-row--between">
					<span className="en-status">
						{ provider?.ready ? (
							<>
								{ __( 'Thinks with', 'engenty-wizards' ) }{ ' ' }
								<strong>{ provider.name }</strong>
								{ provider.model
									? ` · ${ provider.model }`
									: '' }
								{ ' · ' }
								{ __(
									'set in WordPress under',
									'engenty-wizards'
								) }{ ' ' }
								<a href={ connectors }>
									{ __(
										'Settings → Connectors',
										'engenty-wizards'
									) }{ ' ' }
									↗
								</a>
							</>
						) : (
							<>
								{ provider?.note ||
									__(
										'No AI provider set up',
										'engenty-wizards'
									) }
								{ ' · ' }
								<a href={ connectors }>
									{ __(
										'Settings → Connectors',
										'engenty-wizards'
									) }{ ' ' }
									↗
								</a>
							</>
						) }
					</span>
					<div className="en-row">
						<Button
							className="en-btn--small"
							busy={ testing }
							onClick={ runTest }
						>
							{ __( 'Run a test', 'engenty-wizards' ) }
						</Button>
						{ test?.ok ? (
							<span className="en-muted en-small">
								{ __( 'answers', 'engenty-wizards' ) } ·{ ' ' }
								{ String( test.seconds ).replace( '.', ',' ) } s
								{ test.json
									? ' · JSON ok'
									: ` · ${ __(
											'no JSON',
											'engenty-wizards'
									  ) }` }
								{ test.provider?.images
									? ` · ${ __(
											'takes images',
											'engenty-wizards'
									  ) }`
									: ` · ${ __(
											'takes no images',
											'engenty-wizards'
									  ) }` }
							</span>
						) : null }
						{ test?.error ? (
							<span className="en-warn">{ test.error }</span>
						) : null }
					</div>
				</div>
				<p className="en-muted en-small">
					{ __(
						'Which provider and which key: WordPress settles that, not the plugin. Every run costs at the provider what its calls cost.',
						'engenty-wizards'
					) }
				</p>
				<div className="en-site__grid">
					<div className="en-field">
						<label htmlFor="en-rph">
							{ __(
								'Runs per hour and visitor',
								'engenty-wizards'
							) }
						</label>
						<input
							id="en-rph"
							type="number"
							min="1"
							value={ local.runsPerHour }
							onChange={ ( e ) =>
								onChange( {
									runsPerHour: Number( e.target.value ),
								} )
							}
						/>
					</div>
					<div className="en-field">
						<label htmlFor="en-rpd">
							{ __(
								'Runs per day and wizard',
								'engenty-wizards'
							) }
						</label>
						<input
							id="en-rpd"
							type="number"
							min="1"
							value={ local.runsPerDay }
							onChange={ ( e ) =>
								onChange( {
									runsPerDay: Number( e.target.value ),
								} )
							}
						/>
					</div>
					<div className="en-field">
						<label htmlFor="en-timeout">
							{ __(
								'Seconds per thinking step',
								'engenty-wizards'
							) }
						</label>
						<input
							id="en-timeout"
							type="number"
							min="30"
							max="600"
							value={ local.timeout }
							onChange={ ( e ) =>
								onChange( {
									timeout: Number( e.target.value ),
								} )
							}
						/>
					</div>
					<div className="en-field">
						<label htmlFor="en-keep">
							{ __( 'Keep results', 'engenty-wizards' ) }
						</label>
						<select
							id="en-keep"
							value={ String( local.keepDays ) }
							onChange={ ( e ) =>
								onChange( {
									keepDays: Number( e.target.value ),
								} )
							}
						>
							<option value="30">
								{ __( '30 days', 'engenty-wizards' ) }
							</option>
							<option value="90">
								{ __( '90 days', 'engenty-wizards' ) }
							</option>
							<option value="365">
								{ __( '1 year', 'engenty-wizards' ) }
							</option>
							<option value="0">
								{ __( 'Unlimited', 'engenty-wizards' ) }
							</option>
						</select>
					</div>
					<div className="en-field">
						<label htmlFor="en-bots">
							{ __( 'Protection from bots', 'engenty-wizards' ) }
						</label>
						<input
							id="en-bots"
							readOnly
							value={ __(
								'Honeypot and limits',
								'engenty-wizards'
							) }
						/>
					</div>
				</div>
				<label className="en-check" htmlFor="en-photos">
					<input
						id="en-photos"
						type="checkbox"
						checked={ Boolean( local.photos ) }
						onChange={ ( e ) =>
							onChange( { photos: e.target.checked } )
						}
					/>
					<span>
						{ __(
							'Send photos to the provider when it takes images',
							'engenty-wizards'
						) }
					</span>
				</label>
				<label className="en-check" htmlFor="en-tools">
					<input
						id="en-tools"
						type="checkbox"
						checked={ Boolean( local.tools ) }
						onChange={ ( e ) =>
							onChange( { tools: e.target.checked } )
						}
					/>
					<span>
						{ __(
							'Wizards may read web pages and call public APIs when a step calls for it',
							'engenty-wizards'
						) }
					</span>
				</label>
			</Card>
		</>
	);
}

/**
 * The connection, how wizards show, the bubble, who reads results, the privacy sentence.
 * @param {Object} root0
 * @param {Object} root0.status
 * @param {Object} root0.reload
 */
export default function Settings( { status, reload } ) {
	const me = status.me;
	const [ data, setData ] = useState( null );
	const [ wizards, setWizards ] = useState( [] );
	const [ saved, setSaved ] = useState( false );
	const [ busy, setBusy ] = useState( null );
	const [ error, setError ] = useState( null );
	const [ asking, setAsking ] = useState( false );
	const showLocal =
		Boolean( status.local?.provider?.client ) || status.local?.wizards > 0;
	useEffect( () => {
		api( '/settings' )
			.then( setData )
			.catch( ( e ) => setError( problem( e ) ) );
		api( '/wizards' )
			.then( ( r ) =>
				setWizards( r.wizards.filter( ( w ) => w.published ) )
			)
			.catch( () => undefined );
	}, [] );
	if ( ! data ) {
		return error ? (
			<Notice tone="error">{ error.message }</Notice>
		) : (
			<Spinner />
		);
	}
	const s = data.settings;
	const patch = ( p ) =>
		setData( {
			...data,
			settings: {
				...s,
				...p,
				bubble: { ...s.bubble, ...( p.bubble ?? {} ) },
			},
		} );
	const save = async () => {
		setBusy( 'save' );
		setError( null );
		try {
			const res = await post( '/settings', {
				mode: s.mode,
				label: s.label,
				bubble: s.bubble,
				access: {
					roles: data.roles
						.filter( ( r ) => r.has || r.fixed )
						.map( ( r ) => r.slug ),
				},
			} );
			setData( { ...data, settings: res.settings } );
			setSaved( true );
			setTimeout( () => setSaved( false ), 2000 );
		} catch ( e ) {
			setError( problem( e ) );
		}
		setBusy( null );
	};
	// Asked in the page: a browser may answer window.confirm() with "no" without showing it.
	const disconnect = async () => {
		setBusy( 'disconnect' );
		try {
			await post( '/disconnect' );
		} catch ( e ) {
			setError( problem( e ) );
			setBusy( null );
			return;
		}
		await reload( true );
		window.location.reload();
	};
	const host = ( () => {
		try {
			return new URL( status.cloud ).host;
		} catch {
			return 'engenty.ai';
		}
	} )();
	const privacy = `Auf dieser Website binden wir Assistenten („Wizards“) von engenty (${ host }) ein. Wenn Sie einen Wizard nutzen, werden Ihre Eingaben direkt an engenty übertragen und dort verarbeitet, um Ihre Anfrage zu beantworten; engenty verarbeitet sie in unserem Auftrag. Ohne Konto werden Ergebnisse nach einer Woche gelöscht. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO bzw. Ihre Einwilligung.`;
	const providerName = status.local?.provider?.name;
	const localPrivacy = providerName
		? `Für Assistenten auf dieser Website nutzen wir ${ providerName }. Eingaben werden zur Beantwortung dorthin übertragen. Ergebnisse speichern wir ${
				s.local?.keepDays ? `${ s.local.keepDays } Tage` : 'dauerhaft'
		  } auf dieser Website. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO bzw. Ihre Einwilligung.`
		: null;

	return (
		<>
			<h1 className="en-page-head">
				{ __( 'Settings', 'engenty-wizards' ) }
			</h1>
			{ error ? <Notice tone="error">{ error.message }</Notice> : null }
			<h2 className="en-section">
				{ __( 'Connection', 'engenty-wizards' ) }
			</h2>
			<Card>
				<dl className="en-facts">
					<div>
						<dt>{ __( 'Account', 'engenty-wizards' ) }</dt>
						<dd>
							{ [ me?.user?.name, me?.user?.email ]
								.filter( Boolean )
								.join( ' · ' ) || '—' }
							{ status.method === 'key'
								? ` · ${ __(
										'connected with an API key',
										'engenty-wizards'
								  ) }`
								: '' }
						</dd>
					</div>
					<div>
						<dt>{ __( 'Team', 'engenty-wizards' ) }</dt>
						<dd>{ me?.tenant?.name || '—' }</dd>
					</div>
					<div>
						<dt>{ __( 'Plan', 'engenty-wizards' ) }</dt>
						<dd>
							{ me?.tenant?.plan?.name ?? 'Free' }
							{ isFree( me ) && me?.urls?.upgrade ? (
								<>
									{ ' · ' }
									<a
										href={ me.urls.upgrade }
										target="_blank"
										rel="noopener noreferrer"
									>
										{ __(
											'upgrade to Pro',
											'engenty-wizards'
										) }
									</a>
								</>
							) : null }
						</dd>
					</div>
					<div>
						<dt>{ __( 'Plugins', 'engenty-wizards' ) }</dt>
						<dd>
							{ me?.plugins?.length
								? me.plugins.join( ', ' )
								: '—' }
						</dd>
					</div>
					<div>
						<dt>{ __( 'Runs on', 'engenty-wizards' ) }</dt>
						<dd>{ host }</dd>
					</div>
				</dl>
				{ asking ? (
					<div className="en-confirm">
						<p>
							{ __(
								'Disconnect the website from engenty.ai? Wizards on your pages keep showing; the admin sees nothing until you connect again.',
								'engenty-wizards'
							) }
						</p>
						<div className="en-row">
							<Button
								kind="danger-solid"
								busy={ busy === 'disconnect' }
								onClick={ disconnect }
							>
								{ __( 'Yes, disconnect', 'engenty-wizards' ) }
							</Button>
							<Button
								kind="ghost"
								onClick={ () => setAsking( false ) }
							>
								{ __( 'Cancel', 'engenty-wizards' ) }
							</Button>
						</div>
					</div>
				) : (
					<div className="en-row">
						{ me?.urls?.account ? (
							<Button
								kind="ghost"
								href={ me.urls.account }
								external
							>
								{ __( 'Manage account', 'engenty-wizards' ) }
							</Button>
						) : null }
						<Button
							kind="danger"
							onClick={ () => setAsking( true ) }
						>
							{ __( 'Disconnect', 'engenty-wizards' ) }
						</Button>
					</div>
				) }
			</Card>

			{ showLocal ? (
				<Standalone
					status={ status }
					local={ s.local }
					onChange={ ( p ) =>
						patch( { local: { ...s.local, ...p } } )
					}
				/>
			) : null }

			<h2 className="en-section">
				{ __( 'Display', 'engenty-wizards' ) }
			</h2>
			<Card>
				<div className="en-site__grid">
					<div className="en-field">
						<label htmlFor="en-mode">
							{ __( 'Unless said otherwise', 'engenty-wizards' ) }
						</label>
						<select
							id="en-mode"
							value={ s.mode }
							onChange={ ( e ) =>
								patch( { mode: e.target.value } )
							}
						>
							<option value="modal">
								{ __( 'Button + window', 'engenty-wizards' ) }
							</option>
							<option value="inline">
								{ __( 'In the text', 'engenty-wizards' ) }
							</option>
						</select>
					</div>
					<div className="en-field">
						<label htmlFor="en-label">
							{ __( 'Button label', 'engenty-wizards' ) }
						</label>
						<input
							id="en-label"
							value={ s.label }
							onChange={ ( e ) =>
								patch( { label: e.target.value } )
							}
						/>
					</div>
				</div>
			</Card>

			<h2 className="en-section">
				{ __( 'Bubble on every page', 'engenty-wizards' ) }
			</h2>
			<Card>
				<div className="en-site__grid">
					<div className="en-field">
						<label htmlFor="en-bubble">
							{ __( 'Wizard', 'engenty-wizards' ) }
						</label>
						<select
							id="en-bubble"
							value={ s.bubble.token }
							onChange={ ( e ) =>
								patch( {
									bubble: {
										token: e.target.value,
										title:
											wizards.find(
												( w ) =>
													w.token === e.target.value
											)?.title ?? '',
									},
								} )
							}
						>
							<option value="">
								{ __( '— no bubble —', 'engenty-wizards' ) }
							</option>
							{ wizards.map( ( w ) => (
								<option key={ w.id } value={ w.token }>
									{ w.title }
								</option>
							) ) }
						</select>
					</div>
					<div className="en-field">
						<label htmlFor="en-bubble-label">
							{ __(
								'Name for screen readers',
								'engenty-wizards'
							) }
						</label>
						<input
							id="en-bubble-label"
							value={ s.bubble.label }
							onChange={ ( e ) =>
								patch( { bubble: { label: e.target.value } } )
							}
						/>
					</div>
					<div className="en-field">
						<label htmlFor="en-bubble-text">
							{ __(
								'Line beside it (optional)',
								'engenty-wizards'
							) }
						</label>
						<input
							id="en-bubble-text"
							value={ s.bubble.text }
							placeholder={ __(
								'e.g. a quote in 2 minutes',
								'engenty-wizards'
							) }
							onChange={ ( e ) =>
								patch( { bubble: { text: e.target.value } } )
							}
						/>
					</div>
					<div className="en-field">
						<label htmlFor="en-bubble-color">
							{ __( 'Color', 'engenty-wizards' ) }
						</label>
						<input
							id="en-bubble-color"
							type="color"
							value={ s.bubble.color || '#1c1917' }
							onChange={ ( e ) =>
								patch( { bubble: { color: e.target.value } } )
							}
						/>
					</div>
				</div>
				<div className="en-field">
					<label htmlFor="en-bubble-exclude">
						{ __( 'Not on these pages', 'engenty-wizards' ) }
					</label>
					<select
						id="en-bubble-exclude"
						multiple
						size={ Math.min( 8, Math.max( 3, data.pages.length ) ) }
						value={ ( s.bubble.exclude ?? [] ).map( String ) }
						onChange={ ( e ) =>
							patch( {
								bubble: {
									exclude: [
										...e.target.selectedOptions,
									].map( ( o ) => Number( o.value ) ),
								},
							} )
						}
					>
						{ data.pages.map( ( p ) => (
							<option key={ p.id } value={ String( p.id ) }>
								{ p.title }
							</option>
						) ) }
					</select>
				</div>
			</Card>

			<h2 className="en-section">
				{ __(
					'Access to results, contacts and appointments',
					'engenty-wizards'
				) }
			</h2>
			<Card>
				<div className="en-roles">
					{ data.roles.map( ( r ) => (
						<label
							key={ r.slug }
							className="en-check"
							htmlFor={ `en-role-${ r.slug }` }
						>
							<input
								id={ `en-role-${ r.slug }` }
								type="checkbox"
								checked={ r.has || r.fixed }
								disabled={ r.fixed }
								onChange={ ( e ) =>
									setData( {
										...data,
										roles: data.roles.map( ( x ) =>
											x.slug === r.slug
												? {
														...x,
														has: e.target.checked,
												  }
												: x
										),
									} )
								}
							/>
							<span>{ r.name }</span>
						</label>
					) ) }
				</div>
			</Card>

			<div className="en-row en-save">
				<Button
					kind="primary"
					busy={ busy === 'save' }
					onClick={ save }
				>
					{ __( 'Save', 'engenty-wizards' ) }
				</Button>
				{ saved ? (
					<span className="en-muted">
						{ __( 'Saved.', 'engenty-wizards' ) }
					</span>
				) : null }
			</div>

			<h2 className="en-section">
				{ __( 'Privacy', 'engenty-wizards' ) }
			</h2>
			<Card>
				<p>
					{ __(
						'Visitors talk directly to engenty; WordPress stores no answers. A suggestion for your privacy policy – check it for your case:',
						'engenty-wizards'
					) }
				</p>
				<CopyField value={ privacy } />
				{ localPrivacy && status.local?.wizards ? (
					<>
						<p>
							{ __(
								'Standalone wizards send the answers of visitors to the AI provider of the website. Name it in the privacy policy:',
								'engenty-wizards'
							) }
						</p>
						<CopyField value={ localPrivacy } />
					</>
				) : null }
			</Card>
		</>
	);
}

/**
 * Einstellungen before the site is connected: only the connection – through the browser, or by hand
 * with an address and an API Key (an own engenty server, or where signing in there is not possible).
 * @param {Object} root0
 * @param {Object} root0.status
 * @param {Object} root0.reload
 */
export function SettingsBeforeConnect( { status, reload } ) {
	const local = status?.local?.mode === 'local' || status?.local?.wizards > 0;
	if ( local ) {
		return <LocalSettings status={ status } reload={ reload } />;
	}
	return <ConnectOnly />;
}

/**
 * The settings of a site without an account that runs wizards itself: the connection as the way
 * up, then Eigenständige Wizards, Darstellung, Blase, Zugriff, Datenschutz.
 * @param {Object} root0
 * @param {Object} root0.status
 */
function LocalSettings( { status } ) {
	const [ data, setData ] = useState( null );
	const [ wizards, setWizards ] = useState( [] );
	const [ saved, setSaved ] = useState( false );
	const [ busy, setBusy ] = useState( null );
	const [ error, setError ] = useState( null );
	const { busy: connecting, error: connectError, go } = useConnect();
	useEffect( () => {
		api( '/settings' )
			.then( setData )
			.catch( ( e ) => setError( problem( e ) ) );
		api( '/wizards' )
			.then( ( r ) =>
				setWizards( r.wizards.filter( ( w ) => w.published ) )
			)
			.catch( () => undefined );
	}, [] );
	if ( ! data ) {
		return error ? (
			<Notice tone="error">{ error.message }</Notice>
		) : (
			<Spinner />
		);
	}
	const s = data.settings;
	const patch = ( p ) =>
		setData( {
			...data,
			settings: {
				...s,
				...p,
				bubble: { ...s.bubble, ...( p.bubble ?? {} ) },
			},
		} );
	const save = async () => {
		setBusy( 'save' );
		setError( null );
		try {
			const res = await post( '/settings', {
				mode: s.mode,
				label: s.label,
				bubble: s.bubble,
				local: s.local,
				access: {
					roles: data.roles
						.filter( ( r ) => r.has || r.fixed )
						.map( ( r ) => r.slug ),
				},
			} );
			setData( { ...data, settings: res.settings } );
			setSaved( true );
			setTimeout( () => setSaved( false ), 2000 );
		} catch ( e ) {
			setError( problem( e ) );
		}
		setBusy( null );
	};
	const providerName = status.local?.provider?.name;
	const localPrivacy = `Für Assistenten auf dieser Website nutzen wir ${
		providerName || 'einen KI-Anbieter'
	}. Eingaben werden zur Beantwortung dorthin übertragen. Ergebnisse speichern wir ${
		s.local?.keepDays ? `${ s.local.keepDays } Tage` : 'dauerhaft'
	} auf dieser Website. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO bzw. Ihre Einwilligung.`;
	return (
		<>
			<h1 className="en-page-head">
				{ __( 'Settings', 'engenty-wizards' ) }
			</h1>
			{ error ? <Notice tone="error">{ error.message }</Notice> : null }
			<h2 className="en-section">
				{ __( 'Connection', 'engenty-wizards' ) }
			</h2>
			<Card>
				<p className="en-muted" style={ { marginTop: 0 } }>
					{ __(
						'Not connected – the wizards run on this website, without an account and without engenty credits. A free account brings Studio, contacts, appointments, PDFs and the wizards that need more; the local ones keep running.',
						'engenty-wizards'
					) }
				</p>
				{ status.can?.manage ? (
					<div className="en-row">
						<Button
							kind="primary"
							busy={ connecting === 'signup' }
							disabled={ connecting !== null }
							onClick={ () => go( true ) }
						>
							{ __( 'Create a free account', 'engenty-wizards' ) }{ ' ' }
							→
						</Button>
						<Button
							kind="ghost"
							busy={ connecting === 'login' }
							disabled={ connecting !== null }
							onClick={ () => go( false ) }
						>
							{ __( 'Sign in', 'engenty-wizards' ) }
						</Button>
						<span className="en-muted en-small">
							{ __(
								'Your own server, or no sign-in in the browser?',
								'engenty-wizards'
							) }{ ' ' }
							<a
								href={ `${ window.location.pathname }?page=engenty-settings&connect=key` }
							>
								{ __( 'Connect by hand', 'engenty-wizards' ) }
							</a>
						</span>
					</div>
				) : null }
				{ connectError ? (
					<Notice tone="error">{ connectError }</Notice>
				) : null }
				{ new URLSearchParams( window.location.search ).get(
					'connect'
				) === 'key' ? (
					<ByKey />
				) : null }
			</Card>
			<Standalone
				status={ status }
				local={ s.local }
				onChange={ ( p ) => patch( { local: { ...s.local, ...p } } ) }
			/>
			<h2 className="en-section">
				{ __( 'Display', 'engenty-wizards' ) }
			</h2>
			<Card>
				<div className="en-site__grid">
					<div className="en-field">
						<label htmlFor="en-mode">
							{ __( 'Unless said otherwise', 'engenty-wizards' ) }
						</label>
						<select
							id="en-mode"
							value={ s.mode }
							onChange={ ( e ) =>
								patch( { mode: e.target.value } )
							}
						>
							<option value="modal">
								{ __( 'Button + window', 'engenty-wizards' ) }
							</option>
							<option value="inline">
								{ __( 'In the text', 'engenty-wizards' ) }
							</option>
						</select>
					</div>
					<div className="en-field">
						<label htmlFor="en-label">
							{ __( 'Button label', 'engenty-wizards' ) }
						</label>
						<input
							id="en-label"
							value={ s.label }
							onChange={ ( e ) =>
								patch( { label: e.target.value } )
							}
						/>
					</div>
				</div>
			</Card>
			<h2 className="en-section">
				{ __( 'Bubble on every page', 'engenty-wizards' ) }
			</h2>
			<Card>
				<div className="en-site__grid">
					<div className="en-field">
						<label htmlFor="en-bubble">
							{ __( 'Wizard', 'engenty-wizards' ) }
						</label>
						<select
							id="en-bubble"
							value={ s.bubble.token }
							onChange={ ( e ) =>
								patch( {
									bubble: {
										token: e.target.value,
										title:
											wizards.find(
												( w ) =>
													w.token === e.target.value
											)?.title ?? '',
									},
								} )
							}
						>
							<option value="">
								{ __( '— no bubble —', 'engenty-wizards' ) }
							</option>
							{ wizards.map( ( w ) => (
								<option key={ w.id } value={ w.token }>
									{ w.title }
								</option>
							) ) }
						</select>
					</div>
					<div className="en-field">
						<label htmlFor="en-bubble-label">
							{ __(
								'Name for screen readers',
								'engenty-wizards'
							) }
						</label>
						<input
							id="en-bubble-label"
							value={ s.bubble.label }
							onChange={ ( e ) =>
								patch( { bubble: { label: e.target.value } } )
							}
						/>
					</div>
					<div className="en-field">
						<label htmlFor="en-bubble-text">
							{ __(
								'Line beside it (optional)',
								'engenty-wizards'
							) }
						</label>
						<input
							id="en-bubble-text"
							value={ s.bubble.text }
							onChange={ ( e ) =>
								patch( { bubble: { text: e.target.value } } )
							}
						/>
					</div>
					<div className="en-field">
						<label htmlFor="en-bubble-color">
							{ __( 'Color', 'engenty-wizards' ) }
						</label>
						<input
							id="en-bubble-color"
							type="color"
							value={ s.bubble.color || '#1c1917' }
							onChange={ ( e ) =>
								patch( { bubble: { color: e.target.value } } )
							}
						/>
					</div>
				</div>
				<div className="en-field">
					<label htmlFor="en-bubble-exclude">
						{ __( 'Not on these pages', 'engenty-wizards' ) }
					</label>
					<select
						id="en-bubble-exclude"
						multiple
						size={ Math.min( 8, Math.max( 3, data.pages.length ) ) }
						value={ ( s.bubble.exclude ?? [] ).map( String ) }
						onChange={ ( e ) =>
							patch( {
								bubble: {
									exclude: [
										...e.target.selectedOptions,
									].map( ( o ) => Number( o.value ) ),
								},
							} )
						}
					>
						{ data.pages.map( ( p ) => (
							<option key={ p.id } value={ String( p.id ) }>
								{ p.title }
							</option>
						) ) }
					</select>
				</div>
			</Card>
			<h2 className="en-section">
				{ __(
					'Access to results, contacts and appointments',
					'engenty-wizards'
				) }
			</h2>
			<Card>
				<div className="en-roles">
					{ data.roles.map( ( r ) => (
						<label
							key={ r.slug }
							className="en-check"
							htmlFor={ `en-role-${ r.slug }` }
						>
							<input
								id={ `en-role-${ r.slug }` }
								type="checkbox"
								checked={ r.has || r.fixed }
								disabled={ r.fixed }
								onChange={ ( e ) =>
									setData( {
										...data,
										roles: data.roles.map( ( x ) =>
											x.slug === r.slug
												? {
														...x,
														has: e.target.checked,
												  }
												: x
										),
									} )
								}
							/>
							<span>{ r.name }</span>
						</label>
					) ) }
				</div>
			</Card>
			<div className="en-row en-save">
				<Button
					kind="primary"
					busy={ busy === 'save' }
					onClick={ save }
				>
					{ __( 'Save', 'engenty-wizards' ) }
				</Button>
				{ saved ? (
					<span className="en-muted">
						{ __( 'Saved.', 'engenty-wizards' ) }
					</span>
				) : null }
			</div>
			<h2 className="en-section">
				{ __( 'Privacy', 'engenty-wizards' ) }
			</h2>
			<Card>
				<p>
					{ __(
						'Standalone wizards send the answers of visitors to the AI provider of the website. Name it in the privacy policy:',
						'engenty-wizards'
					) }
				</p>
				<CopyField value={ localPrivacy } />
			</Card>
		</>
	);
}

/** Connecting by hand: an address and an API Key. */
function ByKey() {
	const [ busy, setBusy ] = useState( null );
	const [ error, setError ] = useState( null );
	const [ cloud, setCloud ] = useState( 'https://engenty.ai' );
	const [ key, setKey ] = useState( '' );
	const byKey = async ( e ) => {
		e.preventDefault();
		setBusy( 'key' );
		setError( null );
		try {
			await post( '/connect/key', { cloud, key } );
			window.location.href =
				window.location.pathname + '?page=engenty-settings';
		} catch ( err ) {
			setError( problem( err ).message );
			setBusy( null );
		}
	};
	return (
		<form onSubmit={ byKey } style={ { marginTop: 16 } }>
			<div className="en-grid en-grid--2">
				<div className="en-field">
					<label htmlFor="en-cloud">
						{ __( 'Address', 'engenty-wizards' ) }
					</label>
					<input
						id="en-cloud"
						type="url"
						required
						value={ cloud }
						onChange={ ( e ) => setCloud( e.target.value ) }
					/>
				</div>
				<div className="en-field">
					<label htmlFor="en-key">
						{ __( 'API key', 'engenty-wizards' ) }
					</label>
					<input
						id="en-key"
						type="password"
						autoComplete="off"
						required
						placeholder="wz_…"
						value={ key }
						onChange={ ( e ) => setKey( e.target.value ) }
					/>
				</div>
			</div>
			<Button kind="primary" type="submit" busy={ busy === 'key' }>
				{ __( 'Connect', 'engenty-wizards' ) }
			</Button>
			{ error ? <Notice tone="error">{ error }</Notice> : null }
		</form>
	);
}

/** Einstellungen before any way is chosen: only the connection. */
function ConnectOnly() {
	const [ busy, setBusy ] = useState( null );
	const [ error, setError ] = useState( null );
	// engenty.ai as the start, also where wp-config points the plugin elsewhere for development.
	const [ cloud, setCloud ] = useState( 'https://engenty.ai' );
	const [ key, setKey ] = useState( '' );
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
	const byKey = async ( e ) => {
		e.preventDefault();
		setBusy( 'key' );
		setError( null );
		try {
			await post( '/connect/key', { cloud, key } );
			window.location.reload();
		} catch ( err ) {
			setError( problem( err ).message );
			setBusy( null );
		}
	};
	return (
		<>
			<h1 className="en-page-head">
				{ __( 'Settings', 'engenty-wizards' ) }
			</h1>
			<h2 className="en-section">
				{ __( 'Connection', 'engenty-wizards' ) }
			</h2>
			<Card>
				<p className="en-muted">
					{ __(
						'The website is not connected to an engenty account.',
						'engenty-wizards'
					) }
				</p>
				<div className="en-row">
					<Button
						kind="primary"
						busy={ busy === 'signup' }
						disabled={ busy !== null }
						onClick={ () => go( true ) }
					>
						{ __( 'Create a free account', 'engenty-wizards' ) }
					</Button>
					<Button
						busy={ busy === 'login' }
						disabled={ busy !== null }
						onClick={ () => go( false ) }
					>
						{ __( 'Sign in', 'engenty-wizards' ) }
					</Button>
				</div>
			</Card>
			<h2 className="en-section">
				{ __( 'Connect by hand', 'engenty-wizards' ) }
			</h2>
			<Card>
				<p className="en-muted">
					{ __(
						'For your own engenty server, or when the sign-in in the browser does not work. You create the API key at engenty.ai under Account, on your own server in the Studio under Embed.',
						'engenty-wizards'
					) }
				</p>
				<form onSubmit={ byKey }>
					<div className="en-grid en-grid--2">
						<div className="en-field">
							<label htmlFor="en-cloud">
								{ __( 'Address', 'engenty-wizards' ) }
							</label>
							<input
								id="en-cloud"
								type="url"
								placeholder="https://engenty.ai"
								required
								value={ cloud }
								onChange={ ( e ) => setCloud( e.target.value ) }
							/>
						</div>
						<div className="en-field">
							<label htmlFor="en-key">
								{ __( 'API key', 'engenty-wizards' ) }
							</label>
							<input
								id="en-key"
								type="password"
								autoComplete="off"
								required
								placeholder="wz_…"
								value={ key }
								onChange={ ( e ) => setKey( e.target.value ) }
							/>
						</div>
					</div>
					<Button
						kind="primary"
						type="submit"
						busy={ busy === 'key' }
						disabled={ busy !== null }
					>
						{ __( 'Connect', 'engenty-wizards' ) }
					</Button>
				</form>
			</Card>
			{ error ? <Notice tone="error">{ error }</Notice> : null }
		</>
	);
}
