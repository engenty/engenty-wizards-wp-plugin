import { useEffect, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { api, query, problem } from './api';
import { Button, Chip, Empty, Notice, ProUpsell, Spinner } from './ui';

const FILTERS = [
	[ 'upcoming', __( 'Upcoming', 'engenty-wizards' ) ],
	[ 'past', __( 'Past', 'engenty-wizards' ) ],
	[ 'cancelled', __( 'Canceled', 'engenty-wizards' ) ],
];

const placeOf = ( location ) => {
	if ( ! location ) {
		return '';
	}
	return (
		location.label ||
		location.address ||
		location.name ||
		location.kind ||
		''
	);
};

/**
 * The bookings of the appointments plugin (Pro).
 * @param {Object} root0
 * @param {Object} root0.status
 */
export default function Appointments( { status } ) {
	const me = status.me;
	const missing = me?.missing?.includes( 'appointments' );
	const [ filter, setFilter ] = useState( 'upcoming' );
	const [ data, setData ] = useState( null );
	const [ error, setError ] = useState( null );

	useEffect( () => {
		if ( missing ) {
			return;
		}
		setData( null );
		api( `/appointments${ query( { filter } ) }` )
			.then( ( r ) => {
				setData( r );
				setError( null );
			} )
			.catch( ( e ) => setError( problem( e ) ) );
	}, [ filter, missing ] );

	if ( missing || error?.code === 'plugin' ) {
		return (
			<>
				<h1 className="en-page-head">
					{ __( 'Appointments', 'engenty-wizards' ) }
				</h1>
				<ProUpsell feature="appointments" me={ me } />
			</>
		);
	}
	const day = ( iso ) =>
		new Date( iso ).toLocaleDateString( undefined, {
			weekday: 'short',
			day: '2-digit',
			month: '2-digit',
		} );
	const time = ( iso ) =>
		new Date( iso ).toLocaleTimeString( undefined, {
			hour: '2-digit',
			minute: '2-digit',
		} );
	return (
		<>
			<div className="en-row en-row--between en-page-head">
				<h1>{ __( 'Appointments', 'engenty-wizards' ) }</h1>
				{ me?.urls?.space ? (
					<Button kind="ghost" href={ me.urls.space } external>
						{ __(
							'Set up the calendar in the Studio',
							'engenty-wizards'
						) }
					</Button>
				) : null }
			</div>
			<div className="en-tabs">
				{ FILTERS.map( ( [ id, label ] ) => (
					<button
						key={ id }
						type="button"
						className={ filter === id ? 'is-active' : '' }
						onClick={ () => setFilter( id ) }
					>
						{ label }
					</button>
				) ) }
			</div>
			{ error ? <Notice tone="error">{ error.message }</Notice> : null }
			{ ! data && ! error ? <Spinner /> : null }
			{ data &&
				( ! data.bookings.length ? (
					<Empty title={ __( 'No appointments', 'engenty-wizards' ) }>
						<p>
							{ __(
								'Wizards with booking enter them here. Create one from the “Book an appointment” template.',
								'engenty-wizards'
							) }
						</p>
					</Empty>
				) : (
					<table className="en-table">
						<thead>
							<tr>
								<th>{ __( 'When', 'engenty-wizards' ) }</th>
								<th>{ __( 'What', 'engenty-wizards' ) }</th>
								<th>{ __( 'Who', 'engenty-wizards' ) }</th>
								<th>{ __( 'Where', 'engenty-wizards' ) }</th>
								<th />
							</tr>
						</thead>
						<tbody>
							{ data.bookings.map( ( b ) => (
								<tr key={ b.id }>
									<td className="en-nowrap">
										<strong>{ day( b.start ) }</strong>{ ' ' }
										{ time( b.start ) }–{ time( b.end ) }
									</td>
									<td>
										{ b.title }
										{ b.wizardTitle ? (
											<span className="en-muted en-small en-block">
												{ b.wizardTitle }
											</span>
										) : null }
									</td>
									<td>
										{ b.name }
										<span className="en-muted en-small en-block">
											{ [ b.email, b.phone ]
												.filter( Boolean )
												.join( ' · ' ) }
										</span>
									</td>
									<td className="en-muted">
										{ placeOf( b.location ) }
									</td>
									<td>
										{ b.status === 'cancelled' ? (
											<Chip tone="rose">
												{ __(
													'canceled',
													'engenty-wizards'
												) }
											</Chip>
										) : null }
										{ b.test ? (
											<Chip>
												{ __(
													'Test',
													'engenty-wizards'
												) }
											</Chip>
										) : null }
										<a
											href={ b.page }
											target="_blank"
											rel="noopener noreferrer"
											className="en-small"
										>
											{ __( 'Page', 'engenty-wizards' ) }
										</a>
									</td>
								</tr>
							) ) }
						</tbody>
					</table>
				) ) }
		</>
	);
}
