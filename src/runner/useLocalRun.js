import { useCallback, useEffect, useRef, useState } from '@wordpress/element';
import { ApiError, api, runnerEnv } from '@engenty-wizards/runner';

/**
 * A run on this site, as the runner drives it (`RunSource` of @engenty-wizards/runner): one
 * request per step. After a page the site answers with the next view; while that view says
 * `running`, the browser asks the site to run the step — one model call — and takes the view
 * after it. Nothing is decided here: the site follows the flow, the browser draws.
 * @param {string|null} runId   The run, or null before the start.
 * @param {object|null} initial The view the start answered with.
 */
export function useLocalRun( runId, initial ) {
	const [ view, setView ] = useState( initial );
	const [ error, setError ] = useState( null );
	const [ notFound, setNotFound ] = useState( false );
	const [ busy, setBusy ] = useState( false );
	const [ fieldErrors, setFieldErrors ] = useState( {} );
	const alive = useRef( true );
	useEffect( () => {
		alive.current = true;
		return () => {
			alive.current = false;
		};
	}, [] );

	const base = runId ? runnerEnv().runBase( runId ) : null;

	/** Takes a view; a running step is asked for at once, until something waits for the person. */
	const settle = useCallback(
		async ( next ) => {
			let current = next;
			while (
				alive.current &&
				current &&
				current.status === 'running' &&
				current.step
			) {
				setView( current );
				try {
					current = await api.post(
						`${ base }/steps/${ encodeURIComponent(
							current.step.id
						) }`,
						{}
					);
				} catch ( err ) {
					if ( err instanceof ApiError && err.status === 404 ) {
						setNotFound( true );
						return;
					}
					setError( err.message );
					return;
				}
			}
			if ( alive.current && current ) {
				setView( current );
			}
		},
		[ api, base ]
	);

	useEffect( () => {
		if ( initial ) {
			void settle( initial );
		}
	}, [ initial, settle ] );

	const command = useCallback(
		async ( path, body ) => {
			if ( ! base ) {
				return false;
			}
			setBusy( true );
			setError( null );
			setFieldErrors( {} );
			try {
				const next = await api.post(
					`${ base }/${ path }`,
					body ?? {}
				);
				await settle( next );
				return true;
			} catch ( err ) {
				if ( err instanceof ApiError && err.status === 404 ) {
					setNotFound( true );
				} else if (
					err instanceof ApiError &&
					err.status === 422 &&
					Array.isArray( err.body?.fields )
				) {
					setFieldErrors(
						Object.fromEntries(
							err.body.fields.map( ( f ) => [
								f.field,
								f.message,
							] )
						)
					);
				}
				setError( err.message );
				return false;
			} finally {
				if ( alive.current ) {
					setBusy( false );
				}
			}
		},
		[ api, base, settle ]
	);

	return {
		view,
		notFound,
		error,
		busy,
		fieldErrors,
		submitPage: ( stepId, values ) =>
			command( `pages/${ encodeURIComponent( stepId ) }`, { values } ),
		accept: ( stepId, edits ) =>
			command( `reviews/${ encodeURIComponent( stepId ) }`, {
				type: 'accept',
				edits,
			} ),
		regenerate: ( stepId, target, note, items ) =>
			command( `reviews/${ encodeURIComponent( stepId ) }`, {
				type: 'regenerate',
				target,
				note,
				items: items?.length ? items : undefined,
			} ),
		back: () => command( 'back' ),
		retry: () => command( 'retry' ),
	};
}
