import { registerBlockType } from '@wordpress/blocks';
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import {
	ColorPalette,
	ExternalLink,
	PanelBody,
	Placeholder,
	SelectControl,
	Spinner,
	TextControl,
	Button,
} from '@wordpress/components';
import apiFetch from '@wordpress/api-fetch';
import { useEffect, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import metadata from '../../blocks/wizard/block.json';
import './editor.css';

const boot = window.engentyWizards || {};

/** The account's live wizards, asked once per editor. */
let asked = null;
const loadWizards = () => {
	asked =
		asked ||
		apiFetch( { path: '/engenty/v1/wizards' } ).then( ( r ) =>
			r.wizards.filter( ( w ) => w.published )
		);
	return asked;
};

const MODES = [
	{ value: 'inline', label: __( 'Im Text', 'engenty-wizards' ) },
	{ value: 'modal', label: __( 'Button + Fenster', 'engenty-wizards' ) },
	{ value: 'bubble', label: __( 'Blase unten rechts', 'engenty-wizards' ) },
];

function Edit( { attributes, setAttributes } ) {
	const { token, mode, label, text, color } = attributes;
	const [ wizards, setWizards ] = useState( null );
	const [ error, setError ] = useState( null );
	const props = useBlockProps( { className: 'engenty-block' } );
	useEffect( () => {
		if ( boot.connected === false ) {
			return;
		}
		loadWizards()
			.then( setWizards )
			.catch( ( e ) => setError( e?.message || 'Fehler' ) );
	}, [] );

	if ( boot.connected === false ) {
		return (
			<div { ...props }>
				<Placeholder
					icon="format-chat"
					label="engenty Wizard"
					instructions={ __(
						'Verbinde die Website kostenlos mit engenty.ai: Dann wählst du hier einen Wizard für Anfragen, Angebote oder Termine.',
						'engenty-wizards'
					) }
				>
					<Button
						variant="primary"
						href={ boot.setup }
						target="_blank"
					>
						{ __( 'Kostenlos verbinden', 'engenty-wizards' ) }
					</Button>
				</Placeholder>
			</div>
		);
	}
	const current = wizards?.find( ( w ) => w.token === token );
	const options = [
		{ value: '', label: __( '— Wizard wählen —', 'engenty-wizards' ) },
		...( wizards ?? [] ).map( ( w ) => ( {
			value: w.token,
			label: w.title,
		} ) ),
	];
	const pick = (
		<SelectControl
			label={ __( 'Wizard', 'engenty-wizards' ) }
			value={ token }
			options={ options }
			onChange={ ( v ) =>
				setAttributes( {
					token: v,
					title: wizards?.find( ( w ) => w.token === v )?.title ?? '',
				} )
			}
			__nextHasNoMarginBottom
		/>
	);
	/** What the block shows in the editor: a problem, the wizards loading, the pick, the wizard. */
	const preview = () => {
		if ( error ) {
			return (
				<Placeholder
					icon="warning"
					label="engenty Wizard"
					instructions={ error }
				/>
			);
		}
		if ( ! wizards ) {
			return (
				<Placeholder icon="format-chat" label="engenty Wizard">
					<Spinner />
				</Placeholder>
			);
		}
		if ( ! current ) {
			return (
				<Placeholder
					icon="format-chat"
					label="engenty Wizard"
					instructions={
						wizards.length
							? __(
									'Welcher Wizard soll hier stehen?',
									'engenty-wizards'
							  )
							: __(
									'Noch kein Wizard ist live. Leg einen in engenty an.',
									'engenty-wizards'
							  )
					}
				>
					{ wizards.length ? (
						pick
					) : (
						<Button
							variant="primary"
							href={ boot.setup }
							target="_blank"
						>
							{ __( 'Wizard anlegen', 'engenty-wizards' ) }
						</Button>
					) }
				</Placeholder>
			);
		}
		if ( mode === 'inline' && current.local ) {
			return (
				<div className="engenty-block__button">
					<span className="engenty-block__label">
						{ current.title }
					</span>
					<span className="engenty-block__note">
						{ __(
							'läuft auf dieser Website · im Text',
							'engenty-wizards'
						) }
					</span>
				</div>
			);
		}
		if ( mode === 'inline' ) {
			return (
				<iframe
					className="engenty-block__frame"
					title={ current.title }
					src={ `${ current.shareUrl }?embed=inline` }
				/>
			);
		}
		return (
			<div className="engenty-block__button">
				<span
					className={
						mode === 'bubble'
							? 'engenty-block__bubble'
							: 'engenty-block__label'
					}
					style={
						mode === 'bubble' && color
							? { background: color }
							: undefined
					}
				>
					{ mode === 'bubble'
						? ''
						: label || __( 'Jetzt starten', 'engenty-wizards' ) }
				</span>
				<span className="engenty-block__note">
					{ current.title } ·{ ' ' }
					{ mode === 'bubble'
						? __( 'als Blase unten rechts', 'engenty-wizards' )
						: __( 'öffnet im Fenster', 'engenty-wizards' ) }
				</span>
			</div>
		);
	};
	return (
		<div { ...props }>
			<InspectorControls>
				<PanelBody title="engenty">
					{ wizards ? pick : <Spinner /> }
					<SelectControl
						label={ __( 'Darstellung', 'engenty-wizards' ) }
						value={ mode }
						options={ MODES }
						onChange={ ( v ) => setAttributes( { mode: v } ) }
						__nextHasNoMarginBottom
					/>
					{ mode !== 'inline' ? (
						<TextControl
							label={ __( 'Beschriftung', 'engenty-wizards' ) }
							value={ label }
							placeholder={ __(
								'Jetzt starten',
								'engenty-wizards'
							) }
							onChange={ ( v ) => setAttributes( { label: v } ) }
							__nextHasNoMarginBottom
						/>
					) : null }
					{ mode === 'bubble' ? (
						<>
							<TextControl
								label={ __(
									'Zeile neben der Blase',
									'engenty-wizards'
								) }
								value={ text }
								onChange={ ( v ) =>
									setAttributes( { text: v } )
								}
								__nextHasNoMarginBottom
							/>
							<p>{ __( 'Farbe', 'engenty-wizards' ) }</p>
							<ColorPalette
								value={ color }
								onChange={ ( v ) =>
									setAttributes( { color: v ?? '' } )
								}
							/>
						</>
					) : null }
					<p>
						<ExternalLink href={ boot.wizards }>
							{ __( 'Alle Wizards', 'engenty-wizards' ) }
						</ExternalLink>
					</p>
				</PanelBody>
			</InspectorControls>
			{ preview() }
		</div>
	);
}

registerBlockType( metadata.name, {
	edit: Edit,
	save: () => null,
} );
