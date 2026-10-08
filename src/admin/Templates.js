import { useEffect, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { api, post, problem } from './api';
import { Button, Chip, Notice, ProUpsell, Spinner, isFree } from './ui';

/**
 * Whether a template needs more than the account's plan gives.
 * @param t
 * @param me
 */
const locked = ( t, me ) =>
	( t.needs?.length ?? 0 ) > 0 ||
	( isFree( me ) && t.plan && t.plan !== 'free' );

/**
 * Templates to start from: one click makes the wizard and puts it live.
 * @param root0
 * @param root0.me
 * @param root0.onCreated
 * @param root0.onSkip
 */
export default function Templates( { me, onCreated, onSkip } ) {
	const [ list, setList ] = useState( null );
	const [ wizards, setWizards ] = useState( [] );
	const [ q, setQ ] = useState( '' );
	const [ busy, setBusy ] = useState( null );
	const [ made, setMade ] = useState( null );
	const [ error, setError ] = useState( null );

	useEffect( () => {
		api( '/wizards' )
			.then( ( r ) => setWizards( r.wizards ) )
			.catch( () => undefined );
	}, [] );
	useEffect( () => {
		const t = setTimeout(
			() => {
				api(
					`/templates${ q ? `?q=${ encodeURIComponent( q ) }` : '' }`
				)
					.then( ( r ) => setList( r.templates ) )
					.catch( ( e ) => setError( problem( e ) ) );
			},
			q ? 300 : 0
		);
		return () => clearTimeout( t );
	}, [ q ] );

	const create = async ( t ) => {
		setBusy( t.id );
		setError( null );
		try {
			const res = await post( '/wizards', { starterId: t.id } );
			setMade( res );
		} catch ( e ) {
			setError( problem( e ) );
		}
		setBusy( null );
	};

	const live = wizards.filter( ( w ) => w.published );

	if ( made ) {
		return (
			<div>
				<Notice tone="success">
					{ made.published
						? __(
								'Dein Wizard ist live. Probier ihn aus, dann bringen wir ihn auf die Website.',
								'engenty-wizards'
						  )
						: __(
								'Der Wizard ist angelegt, braucht aber noch Arbeit im Studio, bevor er live geht.',
								'engenty-wizards'
						  ) }
				</Notice>
				<div className="en-row">
					{ made.wizard?.shareUrl ? (
						<Button href={ made.wizard.shareUrl } external>
							{ __( 'Ausprobieren', 'engenty-wizards' ) }
						</Button>
					) : null }
					{ made.wizard?.studioUrl ? (
						<Button
							kind="ghost"
							href={ made.wizard.studioUrl }
							external
						>
							{ __( 'Im Studio anpassen', 'engenty-wizards' ) }
						</Button>
					) : null }
					<Button kind="primary" onClick={ onCreated }>
						{ __( 'Weiter', 'engenty-wizards' ) }
					</Button>
				</div>
			</div>
		);
	}

	return (
		<div className="en-templates">
			{ live.length ? (
				<Notice>
					{ __(
						'Du hast schon Wizards, die live sind. Du kannst sie gleich auf die Website bringen – oder hier noch einen anlegen.',
						'engenty-wizards'
					) }{ ' ' }
					<button
						type="button"
						className="en-link"
						onClick={ onSkip }
					>
						{ __( 'Weiter mit meinen Wizards', 'engenty-wizards' ) }
					</button>
				</Notice>
			) : null }
			{ ! me?.build ? (
				<>
					<ProUpsell feature="build" me={ me } compact />
					<p className="en-muted">
						{ __(
							'Mit Free: lade die kostenlose App, baue deinen Wizard dort und veröffentliche ihn – dann erscheint er hier.',
							'engenty-wizards'
						) }{ ' ' }
						<a
							href="https://engenty.ai/docs"
							target="_blank"
							rel="noopener noreferrer"
						>
							{ __( 'So geht’s', 'engenty-wizards' ) }
						</a>
						{ ' · ' }
						<button
							type="button"
							className="en-link"
							onClick={ onSkip }
						>
							{ __( 'Überspringen', 'engenty-wizards' ) }
						</button>
					</p>
				</>
			) : (
				<div className="en-row en-row--between">
					<input
						className="en-search"
						type="search"
						placeholder={ __(
							'Vorlage suchen: Anfrage, Angebot, Termin …',
							'engenty-wizards'
						) }
						value={ q }
						onChange={ ( e ) => setQ( e.target.value ) }
					/>
					{ me?.urls?.newWizard ? (
						<Button
							kind="ghost"
							href={ me.urls.newWizard }
							external
						>
							{ __(
								'Eigenen Wizard im Studio bauen',
								'engenty-wizards'
							) }
						</Button>
					) : null }
				</div>
			) }
			{ error ? (
				error.code === 'read_only' ? null : (
					<Notice tone="error">{ error.message }</Notice>
				)
			) : null }
			{ ! list ? (
				<Spinner />
			) : (
				<div className="en-grid en-grid--3">
					{ list.map( ( t ) => {
						const lock = ! me?.build || locked( t, me );
						return (
							<div
								key={ t.id }
								className={ `en-template ${
									lock ? 'is-locked' : ''
								}` }
							>
								<div className="en-template__head">
									<strong>{ t.title }</strong>
									{ locked( t, me ) ? (
										<Chip tone="ember">Pro</Chip>
									) : null }
									{ t.plugin ? (
										<Chip>{ t.plugin.name }</Chip>
									) : null }
								</div>
								<p>{ t.pitch }</p>
								{ lock ? (
									locked( t, me ) && me?.urls?.upgrade ? (
										<Button
											kind="ghost"
											className="en-btn--small"
											href={ me.urls.upgrade }
											external
										>
											{ __(
												'Mit Pro',
												'engenty-wizards'
											) }
										</Button>
									) : null
								) : (
									<Button
										kind="secondary"
										className="en-btn--small"
										busy={ busy === t.id }
										disabled={ busy !== null }
										onClick={ () => create( t ) }
									>
										{ __(
											'Anlegen und live schalten',
											'engenty-wizards'
										) }
									</Button>
								) }
							</div>
						);
					} ) }
				</div>
			) }
		</div>
	);
}
