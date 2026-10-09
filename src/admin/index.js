import {
	createRoot,
	useCallback,
	useEffect,
	useState,
} from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { api, boot, problem } from './api';
import { ProBeforeConnect, Shell, Spinner, Notice } from './ui';
import Home from './Home';
import Wizards from './Wizards';
import Results, { ResultsBeforeConnect } from './Results';
import Contacts from './Contacts';
import Appointments from './Appointments';
import Settings, { SettingsBeforeConnect } from './Settings';
import './admin.css';

const VIEWS = {
	home: Home,
	wizards: Wizards,
	results: Results,
	contacts: Contacts,
	appointments: Appointments,
	settings: Settings,
};

const PRO_FEATURES = [ 'contacts', 'appointments' ];

function App( { view } ) {
	const [ status, setStatus ] = useState( null );
	const [ error, setError ] = useState( null );
	const load = useCallback( ( fresh = false ) => {
		return api( `/status${ fresh ? '?fresh=1' : '' }` )
			.then( ( s ) => {
				setStatus( s );
				setError( null );
				return s;
			} )
			.catch( ( e ) => setError( problem( e ) ) );
	}, [] );
	useEffect( () => {
		// Back from engenty.ai: the account is asked anew.
		load( Boolean( boot.connected ) );
	}, [ load ] );
	if ( error ) {
		return (
			<Shell>
				<Notice tone="error">{ error.message }</Notice>
			</Shell>
		);
	}
	if ( ! status ) {
		return (
			<Shell>
				<Spinner label={ __( 'engenty lädt …', 'engenty-wizards' ) } />
			</Shell>
		);
	}
	// Not connected: Kontakte and Termine show what Pro brings, Ergebnisse the list under the way in,
	// Einstellungen only the connection,
	// every other page is the way in.
	if ( ! status.connected && PRO_FEATURES.includes( view ) ) {
		return (
			<Shell status={ status }>
				<ProBeforeConnect feature={ view } status={ status } />
			</Shell>
		);
	}
	const local =
		! status.connected &&
		( status.local?.mode === 'local' || status.local?.wizards > 0 );
	if ( ! status.connected && ! local && view === 'results' ) {
		return (
			<Shell status={ status }>
				<ResultsBeforeConnect status={ status } />
			</Shell>
		);
	}
	if ( ! status.connected && view === 'settings' && status.can?.manage ) {
		return (
			<Shell status={ status }>
				<SettingsBeforeConnect status={ status } reload={ load } />
			</Shell>
		);
	}
	const View = status.connected || local ? VIEWS[ view ] ?? Home : Home;
	return (
		<Shell status={ status }>
			<View status={ status } reload={ load } />
		</Shell>
	);
}

const root = document.getElementById( 'engenty-app' );
if ( root ) {
	createRoot( root ).render( <App view={ root.dataset.view || 'home' } /> );
}
