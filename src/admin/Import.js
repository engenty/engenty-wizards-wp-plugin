import { useRef, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { post, problem } from './api';
import { Button, Modal, useConnect } from './ui';
import { Icon } from './icons';

/**
 * As the studio's ImportWizard: a button, the file picker, done. The package is checked in the
 * browser (the shared check of @engenty-wizards/runner/check) and posted with its files and its
 * fit. The check decides as in the studio's share dialog: one that needs the account (`no`) is
 * refused with what it needs and the way to the account; one that runs with less (a plugin only
 * on a branch the site can leave out) is imported, and its run closes the choices leading there.
 * @param {Object} root0
 * @param {Object} root0.onImported
 * @param {Object} root0.kind       'ghost' | 'secondary'.
 */
export default function Import( { onImported, kind = 'ghost' } ) {
	const input = useRef( null );
	const [ busy, setBusy ] = useState( false );
	const [ failed, setFailed ] = useState( null );
	const { busy: connecting, go } = useConnect();

	const take = async ( file ) => {
		setBusy( true );
		setFailed( null );
		try {
			const { checkPackage, PackageError } = await import(
				'@engenty-wizards/runner/check'
			);
			let checked;
			try {
				checked = checkPackage(
					new Uint8Array( await file.arrayBuffer() )
				);
			} catch ( err ) {
				setFailed( {
					message: err.message,
					issues:
						err instanceof PackageError
							? err.issues.map( ( i ) => i.message )
							: [],
					account: false,
				} );
				return;
			}
			const blocking = checked.issues.filter( ( i ) => i.stepId );
			if ( blocking.length ) {
				setFailed( {
					message: __(
						'The wizard has errors that must be fixed in the Studio first.',
						'engenty-wizards'
					),
					issues: blocking.map(
						( i ) => `${ i.stepId }: ${ i.message }`
					),
					account: false,
				} );
				return;
			}
			if ( checked.fit.fit === 'no' ) {
				const { needLines } = await import( './fit' );
				setFailed( {
					message: __(
						'This wizard needs an engenty account – it does not run on this website.',
						'engenty-wizards'
					),
					issues: [
						...needLines( checked.fit )
							.filter( ( l ) => l.tone === 'missing' )
							.map( ( l ) => l.text ),
						...( checked.fit.needs.length
							? [
									__( 'Plugins:', 'engenty-wizards' ) +
										' ' +
										checked.fit.needs.join( ', ' ),
							  ]
							: [] ),
					],
					account: true,
				} );
				return;
			}
			const files = checked.files.map( ( f ) => ( {
				path: f.path,
				mime: f.mime,
				data: toBase64( f.data ),
			} ) );
			const res = await post( '/packages', {
				definition: checked.definition,
				files,
				fit: checked.fit,
				source: 'upload',
				sourceRef: file.name,
			} );
			onImported?.( res.wizard );
		} catch ( e ) {
			setFailed( {
				message: problem( e ).message,
				issues: [],
				account: false,
			} );
		} finally {
			setBusy( false );
		}
	};

	return (
		<>
			<Button
				kind={ kind }
				busy={ busy }
				onClick={ () => input.current?.click() }
			>
				<Icon name="upload" /> { __( 'Import', 'engenty-wizards' ) }
			</Button>
			<input
				ref={ input }
				hidden
				type="file"
				onChange={ ( e ) => {
					const file = e.target.files?.[ 0 ];
					e.target.value = '';
					if ( file ) {
						void take( file );
					}
				} }
			/>
			{ failed ? (
				<Modal onClose={ () => setFailed( null ) } small>
					<h2>{ __( 'Import did not work', 'engenty-wizards' ) }</h2>
					<p>{ failed.message }</p>
					{ failed.issues.length ? (
						<ul className="en-issues">
							{ failed.issues.slice( 0, 8 ).map( ( i ) => (
								<li key={ i }>{ i }</li>
							) ) }
						</ul>
					) : null }
					<div className="en-dialog__foot en-dialog__foot--small">
						<Button onClick={ () => setFailed( null ) }>
							{ __( 'Close', 'engenty-wizards' ) }
						</Button>
						{ failed.account ? (
							<Button
								kind="primary"
								busy={ connecting === 'signup' }
								onClick={ () => go( true ) }
							>
								{ __(
									'Create a free account',
									'engenty-wizards'
								) }{ ' ' }
								→
							</Button>
						) : null }
					</div>
				</Modal>
			) : null }
		</>
	);
}

function toBase64( bytes ) {
	let out = '';
	const chunk = 0x8000;
	for ( let i = 0; i < bytes.length; i += chunk ) {
		out += String.fromCharCode.apply(
			null,
			bytes.subarray( i, i + chunk )
		);
	}
	return btoa( out );
}
