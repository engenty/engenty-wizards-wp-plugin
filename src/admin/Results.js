import { useEffect, useState } from '@wordpress/element';
import { __, sprintf } from '@wordpress/i18n';
import { api, query, problem } from './api';
import {
	Button,
	Chip,
	ConnectOverlay,
	Drawer,
	Empty,
	Notice,
	Spinner,
	when,
	pathOf,
} from './ui';

const STATUS = {
	done: [ 'moss', __( 'Fertig', 'engenty-wizards' ) ],
	waiting_input: [ 'grey', __( 'Offen', 'engenty-wizards' ) ],
	running: [ 'grey', __( 'Läuft', 'engenty-wizards' ) ],
	failed: [ 'rose', __( 'Fehler', 'engenty-wizards' ) ],
	cancelled: [ 'grey', __( 'Abgebrochen', 'engenty-wizards' ) ],
};

/**
 * One result: what the person answered, what the wizard made, the downloads.
 * @param root0
 * @param root0.id
 * @param root0.onClose
 */
function Result( { id, onClose } ) {
	const [ run, setRun ] = useState( null );
	const [ error, setError ] = useState( null );
	useEffect( () => {
		api( `/runs/${ id }` )
			.then( setRun )
			.catch( ( e ) => setError( problem( e ) ) );
	}, [ id ] );
	return (
		<Drawer
			title={ run?.wizard ?? __( 'Ergebnis', 'engenty-wizards' ) }
			onClose={ onClose }
		>
			{ error ? <Notice tone="error">{ error.message }</Notice> : null }
			{ ! run ? (
				error ? null : (
					<Spinner />
				)
			) : (
				<>
					<p className="en-muted">
						{ when( run.createdAt ) }
						{ run.origin ? (
							<>
								{ ' · ' }
								<a
									href={ run.origin }
									target="_blank"
									rel="noopener noreferrer"
								>
									{ pathOf( run.origin ) }
								</a>
							</>
						) : null }
						{ ' · ' }
						{ sprintf(
							/* translators: %d: credits */
							__( '%d Credits', 'engenty-wizards' ),
							run.credits
						) }
					</p>
					<h3>{ __( 'Antworten', 'engenty-wizards' ) }</h3>
					{ run.answers.length ? (
						<dl className="en-facts">
							{ run.answers.map( ( a, i ) => (
								<div key={ i }>
									<dt>{ a.label }</dt>
									<dd>
										{ a.kind === 'email' ? (
											<a href={ `mailto:${ a.value }` }>
												{ a.value }
											</a>
										) : (
											a.value
										) }
									</dd>
								</div>
							) ) }
						</dl>
					) : (
						<p className="en-muted">
							{ __( 'Keine.', 'engenty-wizards' ) }
						</p>
					) }
					{ run.outputs.length ? (
						<h3>{ __( 'Ergebnis', 'engenty-wizards' ) }</h3>
					) : null }
					{ run.outputs.map( ( o ) => (
						<div key={ o.stepId } className="en-output">
							<strong>{ o.title }</strong>
							{ o.text ? (
								<p className="en-output__text">{ o.text }</p>
							) : null }
							<div className="en-row">
								{ Object.entries( o.downloads ).map(
									( [ format, url ] ) => (
										<Button
											key={ format }
											className="en-btn--small"
											href={ url }
											external
										>
											{ format.toUpperCase() }
										</Button>
									)
								) }
								{ o.assets.map( ( a ) => (
									<Button
										key={ a.url }
										kind="ghost"
										className="en-btn--small"
										href={ a.url }
										external
									>
										{ a.name }
									</Button>
								) ) }
							</div>
						</div>
					) ) }
					{ run.error ? (
						<Notice tone="error">{ run.error }</Notice>
					) : null }
					{ run.shareUrl ? (
						<p>
							<a
								href={ run.shareUrl }
								target="_blank"
								rel="noopener noreferrer"
							>
								{ __(
									'Geteilte Ergebnisseite',
									'engenty-wizards'
								) }
							</a>
						</p>
					) : null }
				</>
			) }
		</Drawer>
	);
}

/**
 * What visitors left, newest first, by pages of 50.
 * @param root0
 * @param root0.status
 */
/**
 * The list of results.
 * @param root0
 * @param root0.runs
 * @param root0.onOpen
 */
function RunsTable( { runs, onOpen } ) {
	return (
		<table className="en-table">
			<thead>
				<tr>
					<th>{ __( 'Wann', 'engenty-wizards' ) }</th>
					<th>{ __( 'Wizard', 'engenty-wizards' ) }</th>
					<th>{ __( 'Von', 'engenty-wizards' ) }</th>
					<th>{ __( 'Seite', 'engenty-wizards' ) }</th>
					<th>{ __( 'Status', 'engenty-wizards' ) }</th>
				</tr>
			</thead>
			<tbody>
				{ runs.map( ( r ) => (
					<tr
						key={ r.id }
						onClick={ () => onOpen( r.id ) }
						tabIndex={ 0 }
						onKeyDown={ ( e ) =>
							e.key === 'Enter' && onOpen( r.id )
						}
					>
						<td className="en-nowrap">{ when( r.createdAt ) }</td>
						<td>{ r.wizard }</td>
						<td>
							<strong>{ r.email || '—' }</strong>
							<span className="en-muted en-small en-block">
								{ r.summary }
							</span>
						</td>
						<td className="en-muted">{ pathOf( r.origin ) }</td>
						<td>
							<Chip
								tone={
									( STATUS[ r.status ] ?? STATUS.done )[ 0 ]
								}
							>
								{ ( STATUS[ r.status ] ?? STATUS.done )[ 1 ] }
							</Chip>
						</td>
					</tr>
				) ) }
			</tbody>
		</table>
	);
}

const ago = ( minutes ) =>
	new Date( Date.now() - minutes * 60000 ).toISOString();

const SAMPLE = [
	{
		id: 'a',
		createdAt: ago( 12 ),
		wizard: 'Angebotsanfrage',
		email: 'r.maier@example.at',
		summary: 'Wallbox 11 kW in der Garage, ca. 18 m Zuleitung',
		origin: '/kontakt',
		status: 'done',
	},
	{
		id: 'b',
		createdAt: ago( 95 ),
		wizard: 'Störung melden',
		email: 's.koller@example.at',
		summary: 'FI fliegt seit gestern, Altbau, Rückruf erbeten',
		origin: '/',
		status: 'waiting_input',
	},
	{
		id: 'c',
		createdAt: ago( 60 * 20 ),
		wizard: 'Termin buchen',
		email: 'office@bau-stern.example',
		summary: 'Vor-Ort-Termin Do 09:00, Baustelle Linz',
		origin: '/termine',
		status: 'done',
	},
	{
		id: 'd',
		createdAt: ago( 60 * 26 ),
		wizard: 'Angebotsanfrage',
		email: '',
		summary: 'PV-Anlage 10 kWp mit Speicher',
		origin: '/leistungen',
		status: 'cancelled',
	},
	{
		id: 'e',
		createdAt: ago( 60 * 50 ),
		wizard: 'Angebotsanfrage',
		email: 'k.berger@example.com',
		summary: 'Zählerkasten erneuern, Einfamilienhaus',
		origin: '/kontakt',
		status: 'done',
	},
];

/**
 * Ergebnisse before the site is connected: the list as it will look, under the way in.
 * @param root0
 * @param root0.status
 */
export function ResultsBeforeConnect( { status } ) {
	return (
		<>
			<div className="en-row en-row--between en-page-head">
				<h1>{ __( 'Ergebnisse', 'engenty-wizards' ) }</h1>
			</div>
			<ConnectOverlay
				status={ status }
				title={ __(
					'Hier landen die Antworten deiner Besucher',
					'engenty-wizards'
				) }
				text={ __(
					'Jeder Lauf eines Wizards auf deiner Website: wer, wann, auf welcher Seite, mit allen Antworten und dem Ergebnis. Verbinde die Website mit einem kostenlosen Konto.',
					'engenty-wizards'
				) }
			>
				<div className="en-filters">
					<input
						type="search"
						className="en-search"
						placeholder={ __(
							'Suchen: Name, E-Mail, Antwort, Seite …',
							'engenty-wizards'
						) }
						readOnly
					/>
					<select aria-label={ __( 'Wizard', 'engenty-wizards' ) }>
						<option>
							{ __( 'Alle Wizards', 'engenty-wizards' ) }
						</option>
					</select>
					<select aria-label={ __( 'Zeitraum', 'engenty-wizards' ) }>
						<option>
							{ __( 'Jederzeit', 'engenty-wizards' ) }
						</option>
					</select>
					<select aria-label={ __( 'Status', 'engenty-wizards' ) }>
						<option>{ __( 'Fertige', 'engenty-wizards' ) }</option>
					</select>
				</div>
				<RunsTable runs={ SAMPLE } onOpen={ () => {} } />
			</ConnectOverlay>
		</>
	);
}

export default function Results( { status } ) {
	const opened = new URLSearchParams( window.location.search ).get( 'run' );
	const [ wizards, setWizards ] = useState( [] );
	const [ filter, setFilter ] = useState( {
		wizard: '',
		q: '',
		days: '',
		status: 'done',
		page: 1,
	} );
	const [ data, setData ] = useState( null );
	const [ error, setError ] = useState( null );
	const [ open, setOpen ] = useState( opened );

	useEffect( () => {
		api( '/wizards' )
			.then( ( r ) => setWizards( r.wizards ) )
			.catch( () => undefined );
	}, [] );
	useEffect( () => {
		const t = setTimeout(
			() => {
				setData( null );
				api( `/runs${ query( filter ) }` )
					.then( ( r ) => {
						setData( r );
						setError( null );
					} )
					.catch( ( e ) => setError( problem( e ) ) );
			},
			filter.q ? 300 : 0
		);
		return () => clearTimeout( t );
	}, [ filter ] );
	const set = ( patch ) => setFilter( { ...filter, page: 1, ...patch } );

	return (
		<>
			<div className="en-row en-row--between en-page-head">
				<h1>{ __( 'Ergebnisse', 'engenty-wizards' ) }</h1>
				{ data ? (
					<span className="en-muted">
						{ sprintf(
							/* translators: %d: number of results */
							__( '%d insgesamt', 'engenty-wizards' ),
							data.total
						) }
					</span>
				) : null }
			</div>
			<div className="en-filters">
				<input
					type="search"
					className="en-search"
					placeholder={ __(
						'Suchen: Name, E-Mail, Antwort, Seite …',
						'engenty-wizards'
					) }
					value={ filter.q }
					onChange={ ( e ) => set( { q: e.target.value } ) }
				/>
				<select
					value={ filter.wizard }
					onChange={ ( e ) => set( { wizard: e.target.value } ) }
					aria-label={ __( 'Wizard', 'engenty-wizards' ) }
				>
					<option value="">
						{ __( 'Alle Wizards', 'engenty-wizards' ) }
					</option>
					{ wizards.map( ( w ) => (
						<option key={ w.id } value={ w.id }>
							{ w.title }
						</option>
					) ) }
				</select>
				<select
					value={ filter.days }
					onChange={ ( e ) => set( { days: e.target.value } ) }
					aria-label={ __( 'Zeitraum', 'engenty-wizards' ) }
				>
					<option value="">
						{ __( 'Jederzeit', 'engenty-wizards' ) }
					</option>
					<option value="1">
						{ __( 'Heute', 'engenty-wizards' ) }
					</option>
					<option value="7">
						{ __( '7 Tage', 'engenty-wizards' ) }
					</option>
					<option value="30">
						{ __( '30 Tage', 'engenty-wizards' ) }
					</option>
				</select>
				<select
					value={ filter.status }
					onChange={ ( e ) => set( { status: e.target.value } ) }
					aria-label={ __( 'Status', 'engenty-wizards' ) }
				>
					<option value="done">
						{ __( 'Fertige', 'engenty-wizards' ) }
					</option>
					<option value="open">
						{ __( 'Angefangene', 'engenty-wizards' ) }
					</option>
					<option value="all">
						{ __( 'Alle', 'engenty-wizards' ) }
					</option>
				</select>
			</div>
			{ error ? <Notice tone="error">{ error.message }</Notice> : null }
			{ ! data ? (
				error ? null : (
					<Spinner />
				)
			) : ! data.runs.length ? (
				<Empty title={ __( 'Keine Ergebnisse', 'engenty-wizards' ) }>
					<p>
						{ __(
							'Sobald Besucher einen Wizard abschließen, stehen ihre Antworten hier. Ergebnisse ohne Konto hält engenty eine Woche.',
							'engenty-wizards'
						) }
					</p>
				</Empty>
			) : (
				<RunsTable runs={ data.runs } onOpen={ setOpen } />
			) }
			{ data && data.pages > 1 ? (
				<div className="en-row en-pager">
					<Button
						kind="ghost"
						disabled={ filter.page <= 1 }
						onClick={ () =>
							setFilter( { ...filter, page: filter.page - 1 } )
						}
					>
						←
					</Button>
					<span>
						{ filter.page } / { data.pages }
					</span>
					<Button
						kind="ghost"
						disabled={ filter.page >= data.pages }
						onClick={ () =>
							setFilter( { ...filter, page: filter.page + 1 } )
						}
					>
						→
					</Button>
				</div>
			) : null }
			{ open ? (
				<Result id={ open } onClose={ () => setOpen( null ) } />
			) : null }
			{ status.me?.missing?.includes( 'contacts' ) ? (
				<p className="en-muted en-small">
					{ __(
						'Mit Pro wird aus jedem Ergebnis mit E-Mail ein Kontakt unter „Kontakte“.',
						'engenty-wizards'
					) }
				</p>
			) : null }
		</>
	);
}
