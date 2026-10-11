import { useEffect, useMemo, useState } from '@wordpress/element';
import { __, sprintf } from '@wordpress/i18n';
import { api, post, problem } from './api';
import {
	Button,
	Chip,
	Engenty,
	Notice,
	ProUpsell,
	Spinner,
	isFree,
	Modal,
	NeedList,
	FitChip,
} from './ui';
import { Icon, CAPABILITY_ICONS, FORMAT_ICONS, STEP_ICONS } from './icons';
import {
	COST_TIERS,
	ITEM_FORMATS,
	USE_CASES,
	CAPABILITIES,
	missingLine,
	withoutLine,
} from './fit';

/*
 * The gallery as the studio's new-wizard page draws it (studio/Marketplace.tsx): a search, the
 * use-case pills, the cards with the engenty on the corner, minutes, cost tier and format icons;
 * a card opens the entry dialog with Dauer, Kosten, Ergebnis, Braucht and the flow. On a local
 * site the entries are the wizards that ship with the plugin; connected, the account's templates.
 */

const TIERS = [ 'low', 'medium', 'high' ];

function CostCoins( { tier } ) {
	const coins = TIERS.indexOf( tier ) + 1;
	return (
		<span className="en-with" title={ COST_TIERS[ tier ] }>
			<span className="en-coins" aria-hidden="true">
				{ TIERS.slice( 0, coins ).map( ( t, i ) => (
					<span
						key={ t }
						className={ i ? 'en-coin en-coin--over' : 'en-coin' }
					>
						<Icon name="coin" />
					</span>
				) ) }
			</span>
			{ COST_TIERS[ tier ] }
		</span>
	);
}

function Formats( { formats } ) {
	return (
		<span className="en-fmt">
			{ ( formats ?? [] ).map( ( f ) => (
				<span key={ f } title={ ITEM_FORMATS[ f ] ?? f }>
					<Icon name={ FORMAT_ICONS[ f ] ?? 'type' } />
				</span>
			) ) }
		</span>
	);
}

/**
 * Whether a template needs more than the account's plan gives (connected mode).
 * @param {Object} t
 * @param {Object} me
 */
const locked = ( t, me ) =>
	( t.needs?.length ?? 0 ) > 0 ||
	( isFree( me ) && t.plan && t.plan !== 'free' );

/**
 * The minutes line: "~ 4 Min." (market.minutes).
 * @param {Object} t
 */
const minutes = ( t ) =>
	sprintf(
		/* translators: %d: minutes */ __( '~ %d min', 'engenty-wizards' ),
		t.effort?.minutes ?? 1
	);

function EntryCard( { entry, local, me, onOpen } ) {
	const fit = entry.standalone;
	const dim = local ? fit?.fit === 'no' : locked( entry, me );
	return (
		<div
			className={ `en-gcard ${ dim ? 'is-dim' : '' }` }
			role="button"
			tabIndex={ 0 }
			onClick={ onOpen }
			onKeyDown={ ( e ) =>
				( e.key === 'Enter' || e.key === ' ' ) &&
				( e.preventDefault(), onOpen() )
			}
		>
			<span className="en-gcard__engenty">
				<Engenty kind={ entry.avatar } size={ 60 } />
			</span>
			<div>
				<div className="en-gcard__title">
					{ entry.title }
					{ ! local && entry.plan === 'pro' ? (
						<Chip tone="ember">Pro</Chip>
					) : null }
					{ ! local && entry.plugin ? (
						<Chip>{ entry.plugin.name }</Chip>
					) : null }
				</div>
				<p className="en-gcard__pitch">{ entry.pitch }</p>
			</div>
			<div className="en-gcard__foot">
				<span className="en-with">
					<Icon name="clock" /> { minutes( entry ) }
				</span>
				<CostCoins tier={ entry.costTier ?? 'low' } />
				{ local && fit && missingLine( fit ) ? (
					<Chip tone="rose">{ missingLine( fit ) }</Chip>
				) : null }
				{ local && fit && fit.fit !== 'no' && withoutLine( fit ) ? (
					<Chip tone="amber">{ withoutLine( fit ) }</Chip>
				) : null }
				{ local && fit?.needs?.length ? (
					<Chip tone="ember">
						{ sprintf(
							/* translators: %s: plugins */ __(
								'With an account: needs %s',
								'engenty-wizards'
							),
							fit.needs.join( ', ' )
						) }
					</Chip>
				) : null }
				<Formats formats={ entry.formats } />
			</div>
		</div>
	);
}

function Fact( { title, children } ) {
	return (
		<div className="en-fact">
			<div className="en-fact__title">{ title }</div>
			{ children }
		</div>
	);
}

function Flow( { steps } ) {
	return (
		<div className="en-flow">
			{ steps.map( ( s, i ) => (
				<div key={ s.id } className="en-flow__item">
					{ i ? (
						<span className="en-flow__arrow" aria-hidden="true" />
					) : null }
					<div className="en-flow__step">
						<span
							className={ `en-flow__icon en-flow__icon--${ s.type }` }
						>
							<Icon
								name={ STEP_ICONS[ s.type ] ?? 'list' }
								size={ 18 }
							/>
						</span>
						<span>{ s.title }</span>
						{ s.branches?.length ? (
							<span className="en-muted en-small">
								{ __( 'branches', 'engenty-wizards' ) }
							</span>
						) : null }
					</div>
				</div>
			) ) }
		</div>
	);
}

/**
 * The cost's second line: the provider's calls on the site's key, or credits.
 * @param {Object}  entry
 * @param {boolean} local
 * @param {string}  provider
 */
function costLine( entry, local, provider ) {
	if ( local ) {
		return sprintf(
			/* translators: %s: the provider */
			__( 'calls to %s per run, on your key', 'engenty-wizards' ),
			provider || __( 'your AI provider', 'engenty-wizards' )
		);
	}
	if ( entry.credits ) {
		return sprintf(
			/* translators: %d: credits */
			__( '≈ %d credits per run', 'engenty-wizards' ),
			Math.round( entry.credits.credits )
		);
	}
	return __( 'in credits of your account', 'engenty-wizards' );
}

/**
 * What the success notice says, by where the wizard went.
 * @param {Object}  made
 * @param {boolean} local
 */
function madeText( made, local ) {
	if ( ! made.published ) {
		return __(
			'The wizard is created but still needs work in the Studio before it goes live.',
			'engenty-wizards'
		);
	}
	if ( local ) {
		return __(
			'Your wizard now runs on this website. Next, you put it on a page.',
			'engenty-wizards'
		);
	}
	return __(
		'Your wizard is live. Try it out, then we put it on the website.',
		'engenty-wizards'
	);
}

/**
 * The entry dialog as the gallery draws it (studio/Marketplace.tsx EntryDialog).
 * @param {Object} root0
 * @param {Object} root0.entry
 * @param {Object} root0.local
 * @param {Object} root0.me
 * @param {Object} root0.provider
 * @param {Object} root0.onClose
 * @param {Object} root0.onUse
 * @param {Object} root0.busy
 * @param {Object} root0.error
 */
function EntryDialog( {
	entry,
	local,
	me,
	provider,
	onClose,
	onUse,
	busy,
	error,
} ) {
	const [ outline, setOutline ] = useState( null );
	useEffect( () => {
		if ( ! local ) {
			return;
		}
		api( `/bundled/${ encodeURIComponent( entry.id ) }` )
			.then( setOutline )
			.catch( () => setOutline( { outline: [], results: [] } ) );
	}, [ entry.id, local ] );
	const fit = entry.standalone ?? { fit: 'full' };
	// On the site the shared check decides, as on import: only `no` needs the account.
	const can = local ? fit.fit !== 'no' : ! locked( entry, me );
	/** The primary button: use it, or the way to what it needs. */
	const action = () => {
		if ( can ) {
			return (
				<Button kind="primary" busy={ busy } onClick={ onUse }>
					{ __( 'Start with this template', 'engenty-wizards' ) }
				</Button>
			);
		}
		if ( local ) {
			return (
				<Button
					kind="primary"
					href={ me?.urls?.signup ?? '#' }
					onClick={ onClose }
				>
					{ __( 'Create a free account', 'engenty-wizards' ) } →
				</Button>
			);
		}
		if ( me?.urls?.upgrade ) {
			return (
				<Button kind="primary" href={ me.urls.upgrade } external>
					{ __( 'Upgrade to Pro', 'engenty-wizards' ) }
				</Button>
			);
		}
		return null;
	};
	const results =
		outline?.results ??
		( entry.formats ?? [] ).map( ( f ) => ( {
			title: ITEM_FORMATS[ f ] ?? f,
			kind: f,
			formats: [],
		} ) );
	return (
		<Modal onClose={ onClose } wide>
			<div className="en-dialog__head">
				<span className="en-dialog__engenty">
					<Engenty kind={ entry.avatar } size={ 104 } />
				</span>
				<h2>{ entry.title }</h2>
				<p>{ outline?.description || entry.pitch }</p>
				<div className="en-dialog__facts">
					<span>
						<Icon name="clock" /> { minutes( entry ) }
					</span>
					<span>
						<CostCoins tier={ entry.costTier ?? 'low' } />
					</span>
					<span>
						<Formats formats={ entry.formats } />
					</span>
				</div>
			</div>
			<div className="en-dialog__body">
				<div>
					<Fact title={ __( 'Duration', 'engenty-wizards' ) }>
						<div className="en-detail">
							<span className="en-detail__icon">
								<Icon name="clock" />
							</span>
							<span>
								{ minutes( entry ) }
								<div className="en-detail__more">
									{ sprintf(
										/* translators: %d: fields */
										__(
											'from start to result, with %d inputs from you',
											'engenty-wizards'
										),
										entry.effort?.fields ?? 0
									) }
								</div>
							</span>
						</div>
					</Fact>
					<Fact title={ __( 'Cost', 'engenty-wizards' ) }>
						<div className="en-detail">
							<span className="en-detail__icon">
								<Icon name="coin" />
							</span>
							<span>
								{ COST_TIERS[ entry.costTier ?? 'low' ] }
								<div className="en-detail__more">
									{ costLine( entry, local, provider ) }
								</div>
							</span>
						</div>
					</Fact>
					<Fact title={ __( 'Result', 'engenty-wizards' ) }>
						{ results.map( ( r ) => (
							<div key={ r.title } className="en-detail">
								<span className="en-detail__icon">
									<Icon
										name={
											FORMAT_ICONS[ r.kind ] ?? 'type'
										}
									/>
								</span>
								<span>
									{ r.title }
									{ r.formats?.length ? (
										<div className="en-detail__more">
											{ r.formats
												.map( ( f ) => f.toUpperCase() )
												.join( ' · ' ) }
										</div>
									) : null }
								</span>
							</div>
						) ) }
					</Fact>
					<Fact title={ __( 'Needs', 'engenty-wizards' ) }>
						{ local ? (
							<NeedList fit={ fit } />
						) : (
							<ul className="en-needs">
								{ ( entry.capabilities ?? [] ).map( ( c ) => (
									<li key={ c }>
										<span className="en-need__icon">
											<Icon
												name={
													CAPABILITY_ICONS[ c ] ??
													'pen'
												}
											/>
										</span>
										{ CAPABILITIES[ c ] ?? c }
									</li>
								) ) }
								{ entry.needs?.length ? (
									<li>
										<span className="en-need__icon is-rose">
											<Icon name="minus" />
										</span>
										{ sprintf(
											/* translators: %s: plugins */ __(
												'With Pro: needs %s',
												'engenty-wizards'
											),
											entry.needs.join( ', ' )
										) }
									</li>
								) : null }
							</ul>
						) }
					</Fact>
				</div>
				<div>
					<div className="en-fact__title">
						{ __( 'How the wizard runs', 'engenty-wizards' ) }
					</div>
					{ local && ! outline ? <Spinner /> : null }
					{ outline ? <Flow steps={ outline.outline } /> : null }
					{ ! local ? (
						<p className="en-muted en-small">
							{ sprintf(
								/* translators: %d: steps */ __(
									'%d steps',
									'engenty-wizards'
								),
								entry.steps ?? 0
							) }
						</p>
					) : null }
				</div>
			</div>
			{ error ? (
				<div className="en-dialog__error">
					<Notice tone="error">{ error }</Notice>
				</div>
			) : null }
			<div className="en-dialog__foot">
				<Button kind="ghost" onClick={ onClose }>
					{ __( 'Close', 'engenty-wizards' ) }
				</Button>
				{ action() }
			</div>
		</Modal>
	);
}

/**
 * The gallery. `local`: the shipped set, activated on this site. Otherwise the account's
 * templates (Pro builds in the cloud; Free is told so).
 * @param {Object} root0
 * @param {Object} root0.local
 * @param {Object} root0.me
 * @param {Object} root0.provider  The site's provider's name (local).
 * @param {Object} root0.onCreated
 * @param {Object} root0.onSkip
 */
export default function Templates( {
	local = false,
	me,
	provider,
	onCreated,
	onSkip,
} ) {
	const [ list, setList ] = useState( null );
	const [ q, setQ ] = useState( '' );
	const [ useCase, setUseCase ] = useState( '' );
	const [ open, setOpen ] = useState( null );
	const [ busy, setBusy ] = useState( false );
	const [ made, setMade ] = useState( null );
	const [ error, setError ] = useState( null );

	useEffect( () => {
		if ( local ) {
			api( '/bundled' )
				.then( ( r ) => setList( r.templates ) )
				.catch( ( e ) => setError( problem( e ).message ) );
			return;
		}
		const t = setTimeout(
			() => {
				api(
					`/templates${ q ? `?q=${ encodeURIComponent( q ) }` : '' }`
				)
					.then( ( r ) => setList( r.templates ) )
					.catch( ( e ) => setError( problem( e ).message ) );
			},
			q ? 300 : 0
		);
		return () => clearTimeout( t );
	}, [ q, local ] );

	const shown = useMemo( () => {
		if ( ! list ) {
			return null;
		}
		const words = q.trim().toLowerCase();
		return list.filter(
			( t ) =>
				( ! useCase || ( t.useCases ?? [] ).includes( useCase ) ) &&
				( ! local ||
					! words ||
					`${ t.title } ${ t.pitch }`
						.toLowerCase()
						.includes( words ) )
		);
	}, [ list, q, useCase, local ] );

	const cases = useMemo( () => {
		const found = new Set();
		for ( const t of list ?? [] ) {
			for ( const u of t.useCases ?? [] ) {
				found.add( u );
			}
		}
		return Object.keys( USE_CASES ).filter( ( u ) => found.has( u ) );
	}, [ list ] );

	const use = async ( t ) => {
		setBusy( true );
		setError( null );
		try {
			const res = local
				? await post(
						`/bundled/${ encodeURIComponent( t.id ) }/activate`
				  )
				: await post( '/wizards', { starterId: t.id } );
			setMade( local ? { ...res, published: true } : res );
			setOpen( null );
		} catch ( e ) {
			setError( problem( e ).message );
		}
		setBusy( false );
	};

	if ( made ) {
		return (
			<div>
				<Notice tone="success">{ madeText( made, local ) }</Notice>
				<div className="en-row">
					{ made.wizard?.shareUrl ? (
						<Button href={ made.wizard.shareUrl } external>
							{ __( 'Try it out', 'engenty-wizards' ) }
						</Button>
					) : null }
					{ made.wizard?.studioUrl ? (
						<Button
							kind="ghost"
							href={ made.wizard.studioUrl }
							external
						>
							{ __( 'Adjust in the Studio', 'engenty-wizards' ) }
						</Button>
					) : null }
					<Button
						kind="primary"
						onClick={ () => onCreated?.( made.wizard ) }
					>
						{ __( 'Continue', 'engenty-wizards' ) }
					</Button>
					<button
						type="button"
						className="en-link"
						onClick={ () => setMade( null ) }
					>
						{ __( 'Choose another', 'engenty-wizards' ) }
					</button>
				</div>
			</div>
		);
	}

	if ( ! local && ! me?.build ) {
		return (
			<>
				<ProUpsell feature="build" me={ me } compact />
				<p className="en-muted">
					{ __(
						'With Free: download the free app, build your wizard there and publish it – then it appears here.',
						'engenty-wizards'
					) }{ ' ' }
					<a
						href="https://engenty.ai/docs"
						target="_blank"
						rel="noopener noreferrer"
					>
						{ __( 'How it works', 'engenty-wizards' ) }
					</a>
					{ onSkip ? (
						<>
							{ ' · ' }
							<button
								type="button"
								className="en-link"
								onClick={ onSkip }
							>
								{ __( 'Skip', 'engenty-wizards' ) }
							</button>
						</>
					) : null }
				</p>
			</>
		);
	}

	return (
		<div className="en-gallery">
			<div className="en-gsearch">
				<div className="en-search en-search--pill">
					<Icon name="search" />
					<input
						type="search"
						aria-label={ __(
							'Search templates',
							'engenty-wizards'
						) }
						placeholder={ __(
							'Search templates …',
							'engenty-wizards'
						) }
						value={ q }
						onChange={ ( e ) => setQ( e.target.value ) }
					/>
				</div>
			</div>
			{ cases.length > 1 ? (
				<div className="en-pills">
					<button
						type="button"
						className={ `en-pill ${ ! useCase ? 'is-on' : '' }` }
						onClick={ () => setUseCase( '' ) }
					>
						{ __( 'All', 'engenty-wizards' ) }
					</button>
					{ cases.map( ( u ) => (
						<button
							key={ u }
							type="button"
							className={ `en-pill ${
								useCase === u ? 'is-on' : ''
							}` }
							onClick={ () => setUseCase( u ) }
						>
							{ USE_CASES[ u ] }
						</button>
					) ) }
				</div>
			) : null }
			{ error ? <Notice tone="error">{ error }</Notice> : null }
			{ ! shown ? (
				<Spinner />
			) : (
				<>
					<p className="en-muted en-small en-center">
						{ local
							? sprintf(
									/* translators: %d: templates */ __(
										'%d templates · all run here',
										'engenty-wizards'
									),
									shown.length
							  )
							: sprintf(
									/* translators: %d: templates */ __(
										'%d templates',
										'engenty-wizards'
									),
									shown.length
							  ) }
					</p>
					<div className="en-grid en-grid--2 en-gallery__grid">
						{ shown.map( ( t ) => (
							<EntryCard
								key={ t.id }
								entry={ t }
								local={ local }
								me={ me }
								onOpen={ () => setOpen( t ) }
							/>
						) ) }
					</div>
				</>
			) }
			{ open ? (
				<EntryDialog
					entry={ open }
					local={ local }
					me={ me }
					provider={ provider }
					busy={ busy }
					error={ error }
					onClose={ () => setOpen( null ) }
					onUse={ () => use( open ) }
				/>
			) : null }
		</div>
	);
}

export { FitChip };
