import { useEffect, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { api, post, problem } from './api';
import { Button, CopyField, Notice, Spinner } from './ui';

/**
 * The shortcode of a wizard.
 * @param {Object} w
 * @param {Object} mode
 */
export const shortcodeOf = ( w, mode = 'modal' ) =>
	`[engenty_wizard id="${ w.code || w.token }" mode="${ mode }"]`;

/**
 * Puts a wizard on the site: the bubble on every page, a new page with it, or by hand.
 * @param {Object} root0
 * @param {Object} root0.me
 * @param {Object} root0.onPlaced
 * @param {Object} root0.wizard
 */
export default function Place( { me, onPlaced, wizard: given } ) {
	const [ wizards, setWizards ] = useState( null );
	const [ token, setToken ] = useState( given?.token ?? '' );
	const [ busy, setBusy ] = useState( null );
	const [ done, setDone ] = useState( null );
	const [ error, setError ] = useState( null );

	useEffect( () => {
		api( '/wizards?fresh=1' )
			.then( ( r ) => {
				const live = r.wizards.filter( ( w ) => w.published );
				setWizards( live );
				if ( ! token && live[ 0 ] ) {
					setToken( live[ 0 ].token );
				}
			} )
			.catch( ( e ) => setError( problem( e ) ) );
	}, [] ); // eslint-disable-line react-hooks/exhaustive-deps

	if ( ! wizards ) {
		return error ? (
			<Notice tone="error">{ error.message }</Notice>
		) : (
			<Spinner />
		);
	}
	if ( ! wizards.length ) {
		return (
			<Notice>
				{ __(
					'No wizard is live yet. Create one or publish one in the Studio, then it comes here.',
					'engenty-wizards'
				) }
				{ me?.urls?.newWizard && me?.build ? (
					<>
						{ ' ' }
						<a
							href={ me.urls.newWizard }
							target="_blank"
							rel="noopener noreferrer"
						>
							{ __( 'To the Studio', 'engenty-wizards' ) }
						</a>
					</>
				) : null }
			</Notice>
		);
	}
	const w = wizards.find( ( x ) => x.token === token ) ?? wizards[ 0 ];

	const bubble = async () => {
		setBusy( 'bubble' );
		try {
			await post( '/settings', {
				bubble: { token: w.token, title: w.title },
			} );
			setDone( 'bubble' );
			onPlaced?.();
		} catch ( e ) {
			setError( problem( e ) );
		}
		setBusy( null );
	};
	const page = async () => {
		setBusy( 'page' );
		try {
			const res = await post( '/pages', {
				token: w.token,
				title: w.title,
				mode: 'inline',
			} );
			onPlaced?.();
			window.location.href = res.editUrl;
		} catch ( e ) {
			setError( problem( e ) );
			setBusy( null );
		}
	};

	return (
		<div className="en-place">
			{ given ? null : (
				<div className="en-field">
					<label htmlFor="en-place-wizard">
						{ __( 'Which wizard?', 'engenty-wizards' ) }
					</label>
					<select
						id="en-place-wizard"
						value={ w.token }
						onChange={ ( e ) => setToken( e.target.value ) }
					>
						{ wizards.map( ( x ) => (
							<option key={ x.id } value={ x.token }>
								{ x.title }
							</option>
						) ) }
					</select>
				</div>
			) }
			{ done === 'bubble' ? (
				<Notice tone="success">
					{ __(
						'The bubble is now at the bottom right of every page. You set text, color and exceptions in the settings.',
						'engenty-wizards'
					) }{ ' ' }
					<a
						href={ `${ window.location.origin }/` }
						target="_blank"
						rel="noopener noreferrer"
					>
						{ __( 'View website', 'engenty-wizards' ) }
					</a>
				</Notice>
			) : null }
			<div className="en-grid en-grid--3">
				<div className="en-option">
					<div
						className="en-option__art en-option__art--bubble"
						aria-hidden="true"
					>
						<span />
					</div>
					<strong>
						{ __( 'As a bubble on every page', 'engenty-wizards' ) }
					</strong>
					<p>
						{ __(
							'Bottom right, for questions and requests from anywhere.',
							'engenty-wizards'
						) }
					</p>
					<Button
						kind="primary"
						className="en-btn--small"
						busy={ busy === 'bubble' }
						onClick={ bubble }
					>
						{ __( 'Turn on', 'engenty-wizards' ) }
					</Button>
				</div>
				<div className="en-option">
					<div
						className="en-option__art en-option__art--page"
						aria-hidden="true"
					>
						<span />
					</div>
					<strong>
						{ __( 'On a new page', 'engenty-wizards' ) }
					</strong>
					<p>
						{ __(
							'A draft with the wizard block; you publish it.',
							'engenty-wizards'
						) }
					</p>
					<Button
						className="en-btn--small"
						busy={ busy === 'page' }
						onClick={ page }
					>
						{ __( 'Create page', 'engenty-wizards' ) }
					</Button>
				</div>
				<div className="en-option">
					<div
						className="en-option__art en-option__art--code"
						aria-hidden="true"
					>
						<span />
					</div>
					<strong>
						{ __( 'Place it yourself', 'engenty-wizards' ) }
					</strong>
					<p>
						{ __(
							'The “engenty Wizard” block, the Elementor widget or this shortcode:',
							'engenty-wizards'
						) }
					</p>
					<CopyField value={ shortcodeOf( w ) } />
					<button
						type="button"
						className="en-link"
						onClick={ onPlaced }
					>
						{ __( 'Done', 'engenty-wizards' ) }
					</button>
				</div>
			</div>
			{ error ? <Notice tone="error">{ error.message }</Notice> : null }
		</div>
	);
}
