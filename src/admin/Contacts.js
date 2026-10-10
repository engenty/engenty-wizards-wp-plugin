import { useEffect, useState } from '@wordpress/element';
import { __, sprintf } from '@wordpress/i18n';
import { api, query, problem } from './api';
import {
	Button,
	Chip,
	Drawer,
	Empty,
	Notice,
	ProUpsell,
	Spinner,
	when,
} from './ui';

function Contact( { id, onClose } ) {
	const [ c, setC ] = useState( null );
	const [ error, setError ] = useState( null );
	useEffect( () => {
		api( `/contacts/${ id }` )
			.then( setC )
			.catch( ( e ) => setError( problem( e ) ) );
	}, [ id ] );
	const address = c
		? [
				c.addressStreet,
				[ c.addressZip, c.addressCity ].filter( Boolean ).join( ' ' ),
				c.addressCountry,
		  ]
				.filter( Boolean )
				.join( ', ' )
		: '';
	return (
		<Drawer
			title={ c?.displayName ?? __( 'Contact', 'engenty-wizards' ) }
			onClose={ onClose }
		>
			{ error ? <Notice tone="error">{ error.message }</Notice> : null }
			{ ! c && ! error ? <Spinner /> : null }
			{ c ? (
				<>
					<dl className="en-facts">
						{ [
							[
								__( 'Email', 'engenty-wizards' ),
								c.email ? (
									<a href={ `mailto:${ c.email }` }>
										{ c.email }
									</a>
								) : null,
							],
							[
								__( 'Phone', 'engenty-wizards' ),
								c.phone ? (
									<a href={ `tel:${ c.phone }` }>
										{ c.phone }
									</a>
								) : null,
							],
							[ __( 'Address', 'engenty-wizards' ), address ],
							[
								__( 'Company', 'engenty-wizards' ),
								( c.organisations ?? [] )
									.map( ( o ) => o.name )
									.join( ', ' ),
							],
							[
								__( 'Roles', 'engenty-wizards' ),
								( c.roles ?? [] ).join( ', ' ),
							],
							[
								__( 'Came through', 'engenty-wizards' ),
								c.sourceWizardTitle,
							],
							[
								__( 'Created', 'engenty-wizards' ),
								when( c.createdAt ),
							],
							[ __( 'Notes', 'engenty-wizards' ), c.notes ],
						]
							.filter( ( [ , v ] ) => v )
							.map( ( [ k, v ] ) => (
								<div key={ k }>
									<dt>{ k }</dt>
									<dd>{ v }</dd>
								</div>
							) ) }
					</dl>
				</>
			) : null }
		</Drawer>
	);
}

/**
 * The leads of the contacts plugin (Pro): who came through which wizard.
 * @param {Object} root0
 * @param {Object} root0.status
 */
export default function Contacts( { status } ) {
	const me = status.me;
	const missing = me?.missing?.includes( 'contacts' );
	const [ filter, setFilter ] = useState( { q: '', page: 1 } );
	const [ data, setData ] = useState( null );
	const [ overview, setOverview ] = useState( null );
	const [ error, setError ] = useState( null );
	const [ open, setOpen ] = useState( null );

	useEffect( () => {
		if ( ! missing ) {
			api( '/contacts/overview' )
				.then( setOverview )
				.catch( () => undefined );
		}
	}, [ missing ] );
	useEffect( () => {
		if ( missing ) {
			return undefined;
		}
		const t = setTimeout(
			() => {
				api( `/contacts${ query( filter ) }` )
					.then( ( r ) => {
						setData( r );
						setError( null );
					} )
					.catch( ( e ) => setError( problem( e ) ) );
			},
			filter.q ? 300 : 0
		);
		return () => clearTimeout( t );
	}, [ filter, missing ] );

	if ( missing || error?.code === 'plugin' ) {
		return (
			<>
				<h1 className="en-page-head">
					{ __( 'Contacts', 'engenty-wizards' ) }
				</h1>
				<ProUpsell feature="contacts" me={ me } />
				<div className="en-teaser" aria-hidden="true">
					{ [
						'Anna Berger',
						'Huber & Söhne OG',
						'Lukas Pichler',
					].map( ( n ) => (
						<div key={ n } className="en-teaser__row">
							<strong>{ n }</strong>
							<span>Angebotsanfrage</span>
							<span>/kontakt</span>
						</div>
					) ) }
				</div>
			</>
		);
	}
	const pages = data ? Math.ceil( data.total / ( data.pageSize || 50 ) ) : 0;
	return (
		<>
			<div className="en-row en-row--between en-page-head">
				<h1>{ __( 'Contacts', 'engenty-wizards' ) }</h1>
				{ overview ? (
					<span className="en-muted">
						{ sprintf(
							/* translators: 1: people, 2: organisations */
							__(
								'%1$d people · %2$d companies',
								'engenty-wizards'
							),
							overview.counts.person,
							overview.counts.organisation
						) }
					</span>
				) : null }
			</div>
			<div className="en-filters">
				<input
					type="search"
					className="en-search"
					placeholder={ __(
						'Name, email, company …',
						'engenty-wizards'
					) }
					value={ filter.q }
					onChange={ ( e ) =>
						setFilter( { q: e.target.value, page: 1 } )
					}
				/>
				{ me?.urls?.studio ? (
					<Button
						kind="ghost"
						href={ `${ me.urls.studio }/space` }
						external
					>
						{ __( 'Edit in the Studio', 'engenty-wizards' ) }
					</Button>
				) : null }
			</div>
			{ error ? <Notice tone="error">{ error.message }</Notice> : null }
			{ ! data && ! error ? <Spinner /> : null }
			{ data &&
				( ! data.contacts.length ? (
					<Empty title={ __( 'No contacts yet', 'engenty-wizards' ) }>
						<p>
							{ __(
								'Wizards that ask for name and email create contacts here.',
								'engenty-wizards'
							) }
						</p>
					</Empty>
				) : (
					<table className="en-table">
						<thead>
							<tr>
								<th>{ __( 'Name', 'engenty-wizards' ) }</th>
								<th>{ __( 'Email', 'engenty-wizards' ) }</th>
								<th>{ __( 'Phone', 'engenty-wizards' ) }</th>
								<th>
									{ __( 'Came through', 'engenty-wizards' ) }
								</th>
								<th>{ __( 'Since', 'engenty-wizards' ) }</th>
							</tr>
						</thead>
						<tbody>
							{ data.contacts.map( ( c ) => (
								<tr
									key={ c.id }
									onClick={ () => setOpen( c.id ) }
									tabIndex={ 0 }
									onKeyDown={ ( e ) =>
										e.key === 'Enter' && setOpen( c.id )
									}
								>
									<td>
										<strong>{ c.displayName }</strong>{ ' ' }
										{ c.type === 'organisation' ? (
											<Chip>
												{ __(
													'Company',
													'engenty-wizards'
												) }
											</Chip>
										) : null }
									</td>
									<td>{ c.email }</td>
									<td className="en-nowrap">{ c.phone }</td>
									<td className="en-muted">
										{ c.sourceWizardTitle }
									</td>
									<td className="en-nowrap en-muted">
										{ when( c.createdAt ) }
									</td>
								</tr>
							) ) }
						</tbody>
					</table>
				) ) }
			{ pages > 1 ? (
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
						{ filter.page } / { pages }
					</span>
					<Button
						kind="ghost"
						disabled={ filter.page >= pages }
						onClick={ () =>
							setFilter( { ...filter, page: filter.page + 1 } )
						}
					>
						→
					</Button>
				</div>
			) : null }
			{ open ? (
				<Contact id={ open } onClose={ () => setOpen( null ) } />
			) : null }
		</>
	);
}
