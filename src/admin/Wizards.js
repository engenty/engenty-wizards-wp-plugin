import { useEffect, useState } from '@wordpress/element';
import { __, sprintf } from '@wordpress/i18n';
import { api, post, problem } from './api';
import {
	Button,
	Chip,
	CopyField,
	Drawer,
	Empty,
	Engenty,
	Notice,
	ProUpsell,
	Spinner,
	Modal,
} from './ui';
import { Icon } from './icons';
import { withoutLine } from './fit';
import Templates from './Templates';
import Import from './Import';
import Place, { shortcodeOf } from './Place';

/**
 * The studio's home page (studio/HomePage.tsx): Importieren, the gallery, Neuer Wizard; a grid
 * of wizard cards — the engenty on the top edge, the chips, the title, two lines, the steps,
 * the link and the open arrow. Both kinds in one list: the account's, and the site's own.
 * @param {Object} root0
 * @param {Object} root0.status
 */
/**
 * Live, Entwurf or Pausiert, as the studio's WhereChip.
 * @param {Object} w
 */
function stateChip( w ) {
	if ( ! w.published ) {
		return <Chip>{ __( 'Entwurf', 'engenty-wizards' ) }</Chip>;
	}
	if ( w.available ) {
		return <Chip tone="moss">Live</Chip>;
	}
	return <Chip tone="rose">{ __( 'Pausiert', 'engenty-wizards' ) }</Chip>;
}

export default function Wizards( { status } ) {
	const me = status.me;
	const local = status.local;
	const connected = status.connected;
	const [ list, setList ] = useState( null );
	const [ error, setError ] = useState( null );
	const [ embed, setEmbed ] = useState( null );
	const [ adding, setAdding ] = useState( false );
	const [ copied, setCopied ] = useState( null );
	const load = ( fresh ) =>
		api( `/wizards${ fresh ? '?fresh=1' : '' }` )
			.then( ( r ) => setList( r.wizards ) )
			.catch( ( e ) => setError( problem( e ) ) );
	useEffect( () => {
		load( false );
	}, [] );

	const copyLink = ( w ) => {
		const text = w.shareUrl || shortcodeOf( w );
		window.navigator.clipboard?.writeText( text );
		setCopied( w.id );
		setTimeout( () => setCopied( null ), 1500 );
	};
	const pause = async ( w, paused ) => {
		try {
			await post( `/packages/${ encodeURIComponent( w.id ) }/pause`, {
				paused,
			} );
			load( false );
		} catch ( e ) {
			setError( problem( e ) );
		}
	};
	/** What "Neuer Wizard" opens: the account's templates, the shipped set, or what Pro brings. */
	const picker = () => {
		if ( connected && me?.build ) {
			return (
				<Templates
					me={ me }
					onCreated={ () => {
						setAdding( false );
						load( true );
					} }
					onSkip={ () => setAdding( false ) }
				/>
			);
		}
		if ( local?.provider?.ready || local?.wizards ) {
			return (
				<Templates
					local
					me={ me }
					provider={ local?.provider?.name }
					onCreated={ () => {
						setAdding( false );
						load( false );
					} }
					onSkip={ () => setAdding( false ) }
				/>
			);
		}
		return <ProUpsell feature="build" me={ me } />;
	};
	const remove = async ( w ) => {
		try {
			await api( `/packages/${ encodeURIComponent( w.id ) }`, {
				method: 'DELETE',
			} );
			setEmbed( null );
			load( false );
		} catch ( e ) {
			setError( problem( e ) );
		}
	};
	const [ pulling, setPulling ] = useState( false );
	/**
	 * "Hier laufen lassen": the published package comes over with the site's key and runs here.
	 * @param {Object} w
	 */
	const pull = async ( w ) => {
		setPulling( true );
		try {
			const r = await post( '/packages/studio', {
				wizardId: w.cloudId || w.id,
			} );
			setEmbed( r.wizard );
			load( true );
		} catch ( e ) {
			setError( problem( e ) );
		}
		setPulling( false );
	};
	/**
	 * "Über engenty.ai laufen lassen": the local copy goes, the account's wizard is listed again.
	 * @param {Object} w
	 */
	const release = async ( w ) => {
		try {
			await api( `/packages/${ encodeURIComponent( w.id ) }`, {
				method: 'DELETE',
			} );
			setEmbed( null );
			load( true );
		} catch ( e ) {
			setError( problem( e ) );
		}
	};
	/**
	 * Whether an account wizard may run here: a provider, published, and a fit the site has.
	 * @param {Object} w
	 */
	const canRunHere = ( w ) =>
		Boolean(
			status.can?.manage &&
				local?.provider?.ready &&
				w.published &&
				w.standalone &&
				w.standalone.fit !== 'no'
		);

	return (
		<>
			<div className="en-row en-row--between en-page-head">
				<h1>{ __( 'Wizards', 'engenty-wizards' ) }</h1>
				<div className="en-row">
					{ status.can?.manage &&
					( local?.provider?.ready || local?.wizards ) ? (
						<Import onImported={ () => load( false ) } />
					) : null }
					{ status.can?.manage ? (
						<Button
							kind="primary"
							onClick={ () => setAdding( true ) }
						>
							<Icon name="plus" />{ ' ' }
							{ __( 'Neuer Wizard', 'engenty-wizards' ) }
						</Button>
					) : null }
				</div>
			</div>
			{ error ? <Notice tone="error">{ error.message }</Notice> : null }
			{ ! list ? <Spinner /> : null }
			{ list &&
				( ! list.length ? (
					<Empty
						title={ __( 'Noch keine Wizards', 'engenty-wizards' ) }
					>
						<p>
							{ __(
								'Leg einen aus einer Vorlage an – eine Anfrage, ein Angebot, eine Terminbuchung.',
								'engenty-wizards'
							) }
						</p>
						{ status.can?.manage ? (
							<Button
								kind="primary"
								onClick={ () => setAdding( true ) }
							>
								{ __( 'Vorlage wählen', 'engenty-wizards' ) }
							</Button>
						) : null }
					</Empty>
				) : (
					<div className="en-wgrid">
						{ list.map( ( w ) => {
							const fit = w.standalone;
							const needsPlugin =
								! w.local &&
								( w.plugins ?? [] ).some(
									( p ) => ! me?.plugins?.includes( p )
								);
							return (
								<div key={ w.id } className="en-wcard">
									<span className="en-wcard__engenty">
										<Engenty
											kind={ w.avatar || 'round' }
											size={ 52 }
										/>
									</span>
									<div className="en-wcard__card">
										<div className="en-wcard__chips">
											{ w.local &&
											fit &&
											fit.fit !== 'no' &&
											withoutLine( fit ) ? (
												<Chip tone="amber">
													{ withoutLine( fit ) }
												</Chip>
											) : null }
											{ w.local ? (
												<Chip>
													<Icon
														name="laptop"
														size={ 12 }
													/>{ ' ' }
													{ __(
														'Lokal',
														'engenty-wizards'
													) }
												</Chip>
											) : null }
											{ needsPlugin ? (
												<Chip tone="ember">Pro</Chip>
											) : null }
											{ stateChip( w ) }
										</div>
										<h3>{ w.title }</h3>
										<p>{ w.description }</p>
										{ w.published ? (
											<div className="en-wcard__foot">
												<span>
													{ w.steps
														? sprintf(
																/* translators: %d: steps */ __(
																	'%d Schritte',
																	'engenty-wizards'
																),
																w.steps
														  )
														: '' }
												</span>
												<div className="en-row">
													<button
														type="button"
														className="en-iconbtn"
														onClick={ () =>
															copyLink( w )
														}
													>
														<Icon
															name={
																copied === w.id
																	? 'check'
																	: 'link'
															}
															size={ 14 }
														/>
														{ copied === w.id
															? __(
																	'Kopiert',
																	'engenty-wizards'
															  )
															: __(
																	'Link',
																	'engenty-wizards'
															  ) }
													</button>
													<button
														type="button"
														className="en-iconbtn en-iconbtn--round"
														aria-label={ __(
															'Einbinden',
															'engenty-wizards'
														) }
														onClick={ () =>
															setEmbed( w )
														}
													>
														<Icon
															name="arrow"
															size={ 16 }
														/>
													</button>
												</div>
											</div>
										) : (
											<div className="en-wcard__foot">
												<span />
												<Button
													kind="ghost"
													className="en-btn--small"
													href={ w.studioUrl }
													external
												>
													{ __(
														'Im Studio',
														'engenty-wizards'
													) }
												</Button>
											</div>
										) }
									</div>
								</div>
							);
						} ) }
					</div>
				) ) }
			{ embed ? (
				<Drawer
					title={ embed.title }
					onClose={ () => setEmbed( null ) }
				>
					{ embed.local ? (
						<p className="en-muted">
							{ __(
								'Läuft auf dieser Website mit dem KI-Anbieter aus den WordPress-Einstellungen. Ergebnisse unter Ergebnisse.',
								'engenty-wizards'
							) }
						</p>
					) : null }
					<h3>{ __( 'Shortcode', 'engenty-wizards' ) }</h3>
					<CopyField
						label={ __( 'Button + Fenster', 'engenty-wizards' ) }
						value={ shortcodeOf( embed, 'modal' ) }
					/>
					<CopyField
						label={ __( 'Im Text', 'engenty-wizards' ) }
						value={ shortcodeOf( embed, 'inline' ) }
					/>
					<h3>{ __( 'Im Block-Editor', 'engenty-wizards' ) }</h3>
					<p>
						{ __(
							'Block „engenty Wizard“ einfügen und diesen Wizard wählen. In Elementor heißt das Widget genauso.',
							'engenty-wizards'
						) }
					</p>
					<h3>{ __( 'Im Theme (PHP)', 'engenty-wizards' ) }</h3>
					<CopyField
						value={ `<?php engenty_wizard( '${
							embed.code || embed.token
						}', [ 'mode' => 'inline' ] ); ?>` }
					/>
					{ status.can?.manage ? (
						<>
							<h3>
								{ __( 'Mit einem Klick', 'engenty-wizards' ) }
							</h3>
							<Place me={ me } wizard={ embed } />
						</>
					) : null }
					{ ! embed.local && canRunHere( embed ) ? (
						<>
							<h3>
								{ __( 'Dieser Wizard', 'engenty-wizards' ) }
							</h3>
							<p className="en-muted en-small">
								{ __(
									'Läuft gerade über engenty.ai. Hier laufen lassen holt die veröffentlichte Version auf diese Website: Sie denkt dann mit dem KI-Anbieter von WordPress, ohne Credits, und die Ergebnisse bleiben hier.',
									'engenty-wizards'
								) }
								{ withoutLine( embed.standalone )
									? ' ' + withoutLine( embed.standalone )
									: '' }
							</p>
							<div className="en-row">
								<Button
									disabled={ pulling }
									onClick={ () => pull( embed ) }
								>
									{ __(
										'Hier laufen lassen',
										'engenty-wizards'
									) }
								</Button>
							</div>
						</>
					) : null }
					{ embed.local && status.can?.manage ? (
						<>
							<h3>
								{ __( 'Dieser Wizard', 'engenty-wizards' ) }
							</h3>
							{ embed.cloudId ? (
								<p className="en-muted en-small">
									{ __(
										'Aus deinem Konto geholt und läuft hier mit dem KI-Anbieter von WordPress. Neu laden holt die veröffentlichte Version noch einmal.',
										'engenty-wizards'
									) }
								</p>
							) : null }
							<div className="en-row">
								{ embed.cloudId && connected ? (
									<>
										<Button
											disabled={ pulling }
											onClick={ () => pull( embed ) }
										>
											{ __(
												'Neu laden',
												'engenty-wizards'
											) }
										</Button>
										<Button
											kind="ghost"
											onClick={ () => release( embed ) }
										>
											{ __(
												'Über engenty.ai laufen lassen',
												'engenty-wizards'
											) }
										</Button>
									</>
								) : null }
								{ embed.available ? (
									<Button
										onClick={ () => pause( embed, true ) }
									>
										{ __( 'Pausieren', 'engenty-wizards' ) }
									</Button>
								) : (
									<Button
										onClick={ () => pause( embed, false ) }
									>
										{ __(
											'Wieder live',
											'engenty-wizards'
										) }
									</Button>
								) }
								{ embed.cloudId ? null : (
									<Button
										kind="danger"
										onClick={ () => remove( embed ) }
									>
										{ __( 'Entfernen', 'engenty-wizards' ) }
									</Button>
								) }
							</div>
							{ embed.cloudId ? null : (
								<p className="en-muted en-small">
									{ __(
										'Texte und Schritte änderst du im Studio von engenty und importierst das Paket neu.',
										'engenty-wizards'
									) }
								</p>
							) }
						</>
					) : null }
				</Drawer>
			) : null }
			{ adding ? (
				<Modal onClose={ () => setAdding( false ) } wide>
					<div className="en-dialog__inner">
						<h2>{ __( 'Neuer Wizard', 'engenty-wizards' ) }</h2>
						{ picker() }
					</div>
				</Modal>
			) : null }
		</>
	);
}
