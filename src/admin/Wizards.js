import { useEffect, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { api, problem } from './api';
import {
	Button,
	Card,
	Chip,
	CopyField,
	Drawer,
	Empty,
	Notice,
	ProUpsell,
	Spinner,
	when,
} from './ui';
import Templates from './Templates';
import Place, { shortcodeOf } from './Place';

/**
 * The account's wizards: test, embed, open in the studio, make a new one.
 * @param root0
 * @param root0.status
 */
export default function Wizards( { status } ) {
	const me = status.me;
	const [ list, setList ] = useState( null );
	const [ error, setError ] = useState( null );
	const [ embed, setEmbed ] = useState( null );
	const [ adding, setAdding ] = useState( false );
	const load = ( fresh ) =>
		api( `/wizards${ fresh ? '?fresh=1' : '' }` )
			.then( ( r ) => setList( r.wizards ) )
			.catch( ( e ) => setError( problem( e ) ) );
	useEffect( () => {
		load( false );
	}, [] );

	return (
		<>
			<div className="en-row en-row--between en-page-head">
				<h1>{ __( 'Wizards', 'engenty-wizards' ) }</h1>
				<div className="en-row">
					<Button kind="ghost" onClick={ () => load( true ) }>
						{ __( 'Neu laden', 'engenty-wizards' ) }
					</Button>
					{ status.can?.manage ? (
						<Button
							kind="primary"
							onClick={ () => setAdding( true ) }
						>
							{ __( 'Neuer Wizard', 'engenty-wizards' ) }
						</Button>
					) : null }
				</div>
			</div>
			{ error ? <Notice tone="error">{ error.message }</Notice> : null }
			{ ! list ? (
				<Spinner />
			) : ! list.length ? (
				<Empty title={ __( 'Noch keine Wizards', 'engenty-wizards' ) }>
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
				<div className="en-wizards">
					{ list.map( ( w ) => (
						<Card key={ w.id } className="en-wizard">
							<div className="en-wizard__main">
								{ w.iconUrl ? (
									<img
										className="en-wizard__icon"
										src={ w.iconUrl }
										alt=""
									/>
								) : (
									<span className="en-wizard__icon en-wizard__icon--draft" />
								) }
								<div>
									<div className="en-row">
										<strong className="en-wizard__title">
											{ w.title }
										</strong>
										{ ! w.published ? (
											<Chip>
												{ __(
													'Entwurf',
													'engenty-wizards'
												) }
											</Chip>
										) : w.available ? (
											<Chip tone="moss">Live</Chip>
										) : (
											<Chip tone="rose">
												{ __(
													'Pausiert',
													'engenty-wizards'
												) }
											</Chip>
										) }
										{ w.plugins.map( ( p ) => (
											<Chip
												key={ p }
												tone={
													me?.plugins?.includes( p )
														? 'grey'
														: 'ember'
												}
											>
												{ p }
											</Chip>
										) ) }
									</div>
									<p className="en-muted">
										{ w.description }
									</p>
									{ w.unavailableReason ? (
										<p className="en-warn">
											{ w.unavailableReason }
										</p>
									) : null }
									{ w.plugins.some(
										( p ) => ! me?.plugins?.includes( p )
									) ? (
										<p className="en-warn">
											{ __(
												'Braucht ein Plugin, das dein Paket nicht hat – mit Pro läuft er.',
												'engenty-wizards'
											) }
										</p>
									) : null }
									<span className="en-muted en-small">
										{ w.code ? `ID ${ w.code } · ` : '' }
										{ __(
											'geändert',
											'engenty-wizards'
										) }{ ' ' }
										{ when( w.updatedAt ) }
									</span>
								</div>
							</div>
							<div className="en-row">
								{ w.published ? (
									<>
										<Button
											className="en-btn--small"
											href={ w.shareUrl }
											external
										>
											{ __(
												'Testen',
												'engenty-wizards'
											) }
										</Button>
										<Button
											kind="primary"
											className="en-btn--small"
											onClick={ () => setEmbed( w ) }
										>
											{ __(
												'Einbinden',
												'engenty-wizards'
											) }
										</Button>
									</>
								) : null }
								<Button
									kind="ghost"
									className="en-btn--small"
									href={ w.studioUrl }
									external
								>
									{ __( 'Im Studio', 'engenty-wizards' ) }
								</Button>
							</div>
						</Card>
					) ) }
				</div>
			) }
			{ embed ? (
				<Drawer
					title={ embed.title }
					onClose={ () => setEmbed( null ) }
				>
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
				</Drawer>
			) : null }
			{ adding ? (
				<Drawer
					title={ __( 'Neuer Wizard', 'engenty-wizards' ) }
					onClose={ () => setAdding( false ) }
				>
					{ me?.build ? (
						<Templates
							me={ me }
							onCreated={ () => {
								setAdding( false );
								load( true );
							} }
							onSkip={ () => setAdding( false ) }
						/>
					) : (
						<ProUpsell feature="build" me={ me } />
					) }
				</Drawer>
			) : null }
		</>
	);
}
