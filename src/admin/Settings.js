import { useEffect, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { api, post, problem } from './api';
import { Button, Card, CopyField, Notice, Spinner, isFree } from './ui';

/**
 * The connection, how wizards show, the bubble, who reads results, the privacy sentence.
 * @param root0
 * @param root0.status
 * @param root0.reload
 */
export default function Settings( { status, reload } ) {
	const me = status.me;
	const [ data, setData ] = useState( null );
	const [ wizards, setWizards ] = useState( [] );
	const [ saved, setSaved ] = useState( false );
	const [ busy, setBusy ] = useState( null );
	const [ error, setError ] = useState( null );
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
	const disconnect = async () => {
		if (
			// eslint-disable-next-line no-alert
			! window.confirm(
				__(
					'Die Website von engenty.ai trennen? Wizards auf deinen Seiten zeigen sich weiter; der Admin sieht nichts mehr, bis du wieder verbindest.',
					'engenty-wizards'
				)
			)
		) {
			return;
		}
		setBusy( 'disconnect' );
		await post( '/disconnect' );
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

	return (
		<>
			<h1 className="en-page-head">
				{ __( 'Einstellungen', 'engenty-wizards' ) }
			</h1>
			{ error ? <Notice tone="error">{ error.message }</Notice> : null }
			<h2 className="en-section">
				{ __( 'Verbindung', 'engenty-wizards' ) }
			</h2>
			<Card>
				<dl className="en-facts">
					<div>
						<dt>{ __( 'Konto', 'engenty-wizards' ) }</dt>
						<dd>
							{ [ me?.user?.name, me?.user?.email ]
								.filter( Boolean )
								.join( ' · ' ) || '—' }
						</dd>
					</div>
					<div>
						<dt>{ __( 'Team', 'engenty-wizards' ) }</dt>
						<dd>{ me?.tenant?.name || '—' }</dd>
					</div>
					<div>
						<dt>{ __( 'Paket', 'engenty-wizards' ) }</dt>
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
											'auf Pro upgraden',
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
						<dt>{ __( 'Läuft auf', 'engenty-wizards' ) }</dt>
						<dd>{ host }</dd>
					</div>
				</dl>
				<div className="en-row">
					{ me?.urls?.account ? (
						<Button kind="ghost" href={ me.urls.account } external>
							{ __( 'Konto verwalten', 'engenty-wizards' ) }
						</Button>
					) : null }
					<Button
						kind="danger"
						busy={ busy === 'disconnect' }
						onClick={ disconnect }
					>
						{ __( 'Trennen', 'engenty-wizards' ) }
					</Button>
				</div>
			</Card>

			<h2 className="en-section">
				{ __( 'Darstellung', 'engenty-wizards' ) }
			</h2>
			<Card>
				<div className="en-site__grid">
					<div className="en-field">
						<label htmlFor="en-mode">
							{ __(
								'Wenn nichts anderes gesagt ist',
								'engenty-wizards'
							) }
						</label>
						<select
							id="en-mode"
							value={ s.mode }
							onChange={ ( e ) =>
								patch( { mode: e.target.value } )
							}
						>
							<option value="modal">
								{ __( 'Button + Fenster', 'engenty-wizards' ) }
							</option>
							<option value="inline">
								{ __( 'Im Text', 'engenty-wizards' ) }
							</option>
						</select>
					</div>
					<div className="en-field">
						<label htmlFor="en-label">
							{ __(
								'Beschriftung des Buttons',
								'engenty-wizards'
							) }
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
				{ __( 'Blase auf jeder Seite', 'engenty-wizards' ) }
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
								{ __( '— keine Blase —', 'engenty-wizards' ) }
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
							{ __( 'Name für Screenreader', 'engenty-wizards' ) }
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
								'Zeile daneben (optional)',
								'engenty-wizards'
							) }
						</label>
						<input
							id="en-bubble-text"
							value={ s.bubble.text }
							placeholder={ __(
								'z. B. Angebot in 2 Minuten',
								'engenty-wizards'
							) }
							onChange={ ( e ) =>
								patch( { bubble: { text: e.target.value } } )
							}
						/>
					</div>
					<div className="en-field">
						<label htmlFor="en-bubble-color">
							{ __( 'Farbe', 'engenty-wizards' ) }
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
						{ __( 'Nicht auf diesen Seiten', 'engenty-wizards' ) }
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
					'Zugriff auf Ergebnisse, Kontakte und Termine',
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
					{ __( 'Speichern', 'engenty-wizards' ) }
				</Button>
				{ saved ? (
					<span className="en-muted">
						{ __( 'Gespeichert.', 'engenty-wizards' ) }
					</span>
				) : null }
			</div>

			<h2 className="en-section">
				{ __( 'Datenschutz', 'engenty-wizards' ) }
			</h2>
			<Card>
				<p>
					{ __(
						'Besucher reden direkt mit engenty; WordPress speichert keine Antworten. Ein Vorschlag für deine Datenschutzerklärung – prüfe ihn für deinen Fall:',
						'engenty-wizards'
					) }
				</p>
				<CopyField value={ privacy } />
			</Card>
		</>
	);
}
