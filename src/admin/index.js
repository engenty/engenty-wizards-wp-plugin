import {
	createRoot,
	useCallback,
	useEffect,
	useState,
} from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { api, boot, problem } from './api';
import { Shell, Spinner, Notice } from './ui';
import Home from './Home';
import Wizards from './Wizards';
import Results from './Results';
import Contacts from './Contacts';
import Appointments from './Appointments';
import Settings from './Settings';
import './admin.css';

const VIEWS = {
	home: Home,
	wizards: Wizards,
	results: Results,
	contacts: Contacts,
	appointments: Appointments,
	settings: Settings,
};

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
			<Shell view={ view }>
				<Notice tone="error">{ error.message }</Notice>
			</Shell>
		);
	}
	if ( ! status ) {
		return (
			<Shell view={ view }>
				<Spinner label={ __( 'engenty lädt …', 'engenty-wizards' ) } />
			</Shell>
		);
	}
	// Not connected: every page is the way in.
	const View = status.connected ? VIEWS[ view ] ?? Home : Home;
	return (
		<Shell view={ status.connected ? view : 'home' } status={ status }>
			<View status={ status } reload={ load } />
		</Shell>
	);
}

const root = document.getElementById( 'engenty-app' );
if ( root ) {
	createRoot( root ).render( <App view={ root.dataset.view || 'home' } /> );
}
