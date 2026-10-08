import { useEffect, useRef, useState } from '@wordpress/element';
import { __, sprintf } from '@wordpress/i18n';
import { api, post, problem } from './api';
import { Button, Chip, Notice, ProUpsell, Spinner } from './ui';

const ROLES = {
	front: __( 'Startseite', 'engenty-wizards' ),
	imprint: __( 'Impressum', 'engenty-wizards' ),
	contact: __( 'Kontakt', 'engenty-wizards' ),
	about: __( 'Über uns', 'engenty-wizards' ),
	privacy: __( 'Datenschutz', 'engenty-wizards' ),
	product: __( 'Produkte', 'engenty-wizards' ),
};

/**
 * Reads the site's base data, shows what was found and sends the admin's choice to engenty.ai,
 * where the space takes it: details, logo, colours, the pages as Wissen.
 * @param root0
 * @param root0.me
 * @param root0.onDone
 * @param root0.onSkip
 */
export default function SiteRead( { me, onDone, onSkip } ) {
	const [ found, setFound ] = useState( null );
	const [ name, setName ] = useState( '' );
	const [ tagline, setTagline ] = useState( '' );
	const [ facts, setFacts ] = useState( [] );
	const [ pages, setPages ] = useState( {} );
	const [ logo, setLogo ] = useState( true );
	const [ colors, setColors ] = useState( true );
	const [ job, setJob ] = useState( null );
	const [ error, setError ] = useState( null );
	const timer = useRef();

	useEffect( () => {
		api( '/site' )
			.then( ( f ) => {
				setFound( f );
				setName( f.name );
				setTagline( f.tagline );
				setFacts( f.facts );
				setPages(
					Object.fromEntries(
						f.pages.map( ( p ) => [ p.key, p.checked ] )
					)
				);
			} )
			.catch( ( e ) => setError( problem( e ) ) );
		return () => clearTimeout( timer.current );
	}, [] );

	const poll = ( id ) => {
		timer.current = setTimeout( async () => {
			try {
				const next = await api( `/site/${ id }` );
				setJob( next );
				if ( next.status === 'running' ) {
					poll( id );
				}
			} catch ( e ) {
				setError( problem( e ) );
			}
		}, 1500 );
	};

	const send = async () => {
		setError( null );
		try {
			const started = await post( '/site', {
				name,
				tagline,
				facts: facts.filter( ( f ) => f.checked ),
				pages: Object.keys( pages ).filter( ( k ) => pages[ k ] ),
				logo,
				colors,
			} );
			setJob( started );
			if ( started.status === 'running' ) {
				poll( started.id );
			}
		} catch ( e ) {
			setError( problem( e ) );
		}
	};

	if ( ! found ) {
		return error ? (
			<Notice tone="error">{ error.message }</Notice>
		) : (
			<Spinner label={ __( 'Liest die Website …', 'engenty-wizards' ) } />
		);
	}

	if ( job?.status === 'done' ) {
		const s = job.space;
		return (
			<div className="en-site-done">
				<Notice tone="success">
					{ sprintf(
						/* translators: %d: number of pages */
						__(
							'Übernommen: deine Angaben und %d Seiten. Deine Wizards kennen jetzt dein Unternehmen.',
							'engenty-wizards'
						),
						job.pages
					) }
				</Notice>
				<div className="en-profile">
					{ s?.logoUrl ? (
						<img
							src={ s.logoUrl }
							alt=""
							className="en-profile__logo"
						/>
					) : null }
					<div>
						<h3>{ s?.title || name }</h3>
						<p>{ s?.about }</p>
						<div className="en-swatches">
							{ ( s?.colors ?? [] ).map( ( c ) => (
								<span
									key={ c.value }
									className="en-swatch"
									style={ { background: c.value } }
									title={ `${ c.name } ${ c.value }` }
								/>
							) ) }
						</div>
						<dl className="en-facts">
							{ ( s?.facts ?? [] ).map( ( f ) => (
								<div key={ f.label }>
									<dt>{ f.label }</dt>
									<dd>{ f.value }</dd>
								</div>
							) ) }
						</dl>
					</div>
				</div>
				{ job.reply ? <p className="en-reply">{ job.reply }</p> : null }
				<div className="en-row">
					<Button kind="primary" onClick={ onDone }>
						{ __( 'Weiter', 'engenty-wizards' ) }
					</Button>
					{ me?.urls?.space ? (
						<Button kind="ghost" href={ me.urls.space } external>
							{ __(
								'Im Studio ansehen und ändern',
								'engenty-wizards'
							) }
						</Button>
					) : null }
				</div>
			</div>
		);
	}

	const running = job?.status === 'running';
	const blocked = ! me?.build || error?.code === 'read_only';
	return (
		<div className="en-site">
			<p className="en-muted">
				{ __(
					'Das hat engenty auf deiner Website gefunden. Nimm weg, was nicht dazugehört; nur das Angehakte geht an engenty.ai.',
					'engenty-wizards'
				) }
			</p>
			<div className="en-site__grid">
				<div className="en-field">
					<label htmlFor="en-site-name">
						{ __( 'Name', 'engenty-wizards' ) }
					</label>
					<input
						id="en-site-name"
						value={ name }
						onChange={ ( e ) => setName( e.target.value ) }
					/>
				</div>
				<div className="en-field">
					<label htmlFor="en-site-tagline">
						{ __( 'Untertitel', 'engenty-wizards' ) }
					</label>
					<input
						id="en-site-tagline"
						value={ tagline }
						onChange={ ( e ) => setTagline( e.target.value ) }
					/>
				</div>
			</div>
			<div className="en-site__grid">
				<label className="en-check" htmlFor="en-site-logo">
					<input
						id="en-site-logo"
						type="checkbox"
						checked={ logo && Boolean( found.logo ) }
						disabled={ ! found.logo }
						onChange={ ( e ) => setLogo( e.target.checked ) }
					/>
					<span>
						{ __( 'Logo', 'engenty-wizards' ) }
						{ found.logo ? (
							<img
								src={ found.logo.url }
								alt=""
								className="en-logo-thumb"
							/>
						) : (
							<em className="en-muted">
								{ ' ' }
								{ __( 'keines gefunden', 'engenty-wizards' ) }
							</em>
						) }
					</span>
				</label>
				<label className="en-check" htmlFor="en-site-colors">
					<input
						id="en-site-colors"
						type="checkbox"
						checked={ colors && found.colors.length > 0 }
						disabled={ ! found.colors.length }
						onChange={ ( e ) => setColors( e.target.checked ) }
					/>
					<span>
						{ __( 'Farben des Themes', 'engenty-wizards' ) }
						<span className="en-swatches">
							{ found.colors.map( ( c ) => (
								<span
									key={ c.value }
									className="en-swatch"
									style={ { background: c.value } }
									title={ `${ c.name } ${ c.value }` }
								/>
							) ) }
							{ found.colors.length ? null : (
								<em className="en-muted">
									{ ' ' }
									{ __( 'keine', 'engenty-wizards' ) }
								</em>
							) }
						</span>
					</span>
				</label>
			</div>
			<h4>{ __( 'Angaben', 'engenty-wizards' ) }</h4>
			<div className="en-facts-edit">
				{ facts.map( ( f, i ) => (
					<div key={ i } className="en-fact-row">
						<input
							type="checkbox"
							checked={ f.checked }
							aria-label={ f.label }
							onChange={ ( e ) =>
								setFacts(
									facts.map( ( x, j ) =>
										j === i
											? {
													...x,
													checked: e.target.checked,
											  }
											: x
									)
								)
							}
						/>
						<input
							className="en-fact-row__label"
							value={ f.label }
							onChange={ ( e ) =>
								setFacts(
									facts.map( ( x, j ) =>
										j === i
											? { ...x, label: e.target.value }
											: x
									)
								)
							}
						/>
						<input
							className="en-fact-row__value"
							value={ f.value }
							onChange={ ( e ) =>
								setFacts(
									facts.map( ( x, j ) =>
										j === i
											? {
													...x,
													value: e.target.value,
													checked: true,
											  }
											: x
									)
								)
							}
						/>
					</div>
				) ) }
				<button
					type="button"
					className="en-link"
					onClick={ () =>
						setFacts( [
							...facts,
							{ label: '', value: '', checked: true },
						] )
					}
				>
					+{ ' ' }
					{ __(
						'Angabe hinzufügen (Öffnungszeiten, Telefon, UID …)',
						'engenty-wizards'
					) }
				</button>
			</div>
			<h4>
				{ sprintf(
					/* translators: 1: chosen pages, 2: all pages */
					__(
						'Seiten als Wissen (%1$d von %2$d)',
						'engenty-wizards'
					),
					Object.values( pages ).filter( Boolean ).length,
					found.pages.length
				) }
			</h4>
			<ul className="en-pages">
				{ found.pages.map( ( p ) => (
					<li key={ p.key }>
						<label
							className="en-check"
							htmlFor={ `en-page-${ p.key }` }
						>
							<input
								id={ `en-page-${ p.key }` }
								type="checkbox"
								checked={ Boolean( pages[ p.key ] ) }
								onChange={ ( e ) =>
									setPages( {
										...pages,
										[ p.key ]: e.target.checked,
									} )
								}
							/>
							<span>
								<strong>{ p.title }</strong>{ ' ' }
								{ ROLES[ p.role ] ? (
									<Chip>{ ROLES[ p.role ] }</Chip>
								) : null }
								<span className="en-muted en-pages__excerpt">
									{ p.excerpt }
								</span>
							</span>
						</label>
					</li>
				) ) }
				{ found.pages.length ? null : (
					<li className="en-muted">
						{ __(
							'Keine veröffentlichten Seiten mit Text.',
							'engenty-wizards'
						) }
					</li>
				) }
			</ul>
			{ error && error.code !== 'read_only' ? (
				<Notice tone="error">{ error.message }</Notice>
			) : null }
			{ blocked ? (
				<>
					<ProUpsell feature="build" me={ me } compact />
					<button
						type="button"
						className="en-link"
						onClick={ onSkip }
					>
						{ __( 'Überspringen', 'engenty-wizards' ) }
					</button>
				</>
			) : (
				<div className="en-row">
					<Button kind="primary" busy={ running } onClick={ send }>
						{ running
							? job.activity || __( 'Liest …', 'engenty-wizards' )
							: __( 'An engenty übergeben', 'engenty-wizards' ) }
					</Button>
					{ running ? (
						<span className="en-muted">
							{ __(
								'Das dauert etwa eine Minute.',
								'engenty-wizards'
							) }
						</span>
					) : (
						<button
							type="button"
							className="en-link"
							onClick={ onSkip }
						>
							{ __( 'Überspringen', 'engenty-wizards' ) }
						</button>
					) }
				</div>
			) }
			{ job?.status === 'failed' ? (
				<Notice tone="error">{ job.error }</Notice>
			) : null }
		</div>
	);
}
