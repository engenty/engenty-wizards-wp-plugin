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
		return <Chip>{ __( 'Draft', 'engenty-wizards' ) }</Chip>;
	}
	if ( w.available ) {
		return <Chip tone="moss">Live</Chip>;
	}
	return <Chip tone="rose">{ __( 'Paused', 'engenty-wizards' ) }</Chip>;
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
							{ __( 'New wizard', 'engenty-wizards' ) }
						</Button>
					) : null }
				</div>
			</div>
			{ error ? <Notice tone="error">{ error.message }</Notice> : null }
			{ ! list ? <Spinner /> : null }
			{ list &&
				( ! list.length ? (
					<Empty title={ __( 'No wizards yet', 'engenty-wizards' ) }>
						<p>
							{ __(
								'Create one from a template – a request, a quote, a booking.',
								'engenty-wizards'
							) }
						</p>
						{ status.can?.manage ? (
							<Button
								kind="primary"
								onClick={ () => setAdding( true ) }
							>
								{ __( 'Choose a template', 'engenty-wizards' ) }
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
														'Local',
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
																	'%d steps',
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
																	'Copied',
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
															'Embed',
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
														'In the Studio',
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
								'Runs on this website with the AI provider from the WordPress settings. Results under Results.',
								'engenty-wizards'
							) }
						</p>
					) : null }
					<h3>{ __( 'Shortcode', 'engenty-wizards' ) }</h3>
					<CopyField
						label={ __( 'Button + window', 'engenty-wizards' ) }
						value={ shortcodeOf( embed, 'modal' ) }
					/>
					<CopyField
						label={ __( 'In the text', 'engenty-wizards' ) }
						value={ shortcodeOf( embed, 'inline' ) }
					/>
					<h3>{ __( 'In the block editor', 'engenty-wizards' ) }</h3>
					<p>
						{ __(
							'Insert the “engenty Wizard” block and choose this wizard. In Elementor the widget has the same name.',
							'engenty-wizards'
						) }
					</p>
					<h3>{ __( 'In the theme (PHP)', 'engenty-wizards' ) }</h3>
					<CopyField
						value={ `<?php engenty_wizard( '${
							embed.code || embed.token
						}', [ 'mode' => 'inline' ] ); ?>` }
					/>
					{ status.can?.manage ? (
						<>
							<h3>
								{ __( 'With one click', 'engenty-wizards' ) }
							</h3>
							<Place me={ me } wizard={ embed } />
						</>
					) : null }
					{ ! embed.local && canRunHere( embed ) ? (
						<>
							<h3>{ __( 'This wizard', 'engenty-wizards' ) }</h3>
							<p className="en-muted en-small">
								{ __(
									'Runs through engenty.ai right now. Run here brings the published version to this website: it then thinks with the AI provider of WordPress, without credits, and the results stay here.',
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
									{ __( 'Run here', 'engenty-wizards' ) }
								</Button>
							</div>
						</>
					) : null }
					{ embed.local && status.can?.manage ? (
						<>
							<h3>{ __( 'This wizard', 'engenty-wizards' ) }</h3>
							{ embed.cloudId ? (
								<p className="en-muted en-small">
									{ __(
										'Fetched from your account and runs here with the AI provider of WordPress. Reload fetches the published version again.',
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
												'Reload',
												'engenty-wizards'
											) }
										</Button>
										<Button
											kind="ghost"
											onClick={ () => release( embed ) }
										>
											{ __(
												'Run through engenty.ai',
												'engenty-wizards'
											) }
										</Button>
									</>
								) : null }
								{ embed.available ? (
									<Button
										onClick={ () => pause( embed, true ) }
									>
										{ __( 'Pause', 'engenty-wizards' ) }
									</Button>
								) : (
									<Button
										onClick={ () => pause( embed, false ) }
									>
										{ __(
											'Live again',
											'engenty-wizards'
										) }
									</Button>
								) }
								{ embed.cloudId ? null : (
									<Button
										kind="danger"
										onClick={ () => remove( embed ) }
									>
										{ __( 'Remove', 'engenty-wizards' ) }
									</Button>
								) }
							</div>
							{ embed.cloudId ? null : (
								<p className="en-muted en-small">
									{ __(
										'You change texts and steps in the engenty Studio and import the package again.',
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
						<h2>{ __( 'New wizard', 'engenty-wizards' ) }</h2>
						{ picker() }
					</div>
				</Modal>
			) : null }
		</>
	);
}
