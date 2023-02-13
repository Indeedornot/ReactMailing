import React from 'react';
import {createRoot} from 'react-dom/client';
import './globalStyles.css';
import App from './app/App';
import {setDefaultTheme} from './scripts/client/Theme';
import {ImapDataProvider} from './context/ImapDataContext';

setDefaultTheme();

const container = document.getElementById('root') as HTMLElement;

const MainEntry = () => {
	return (
		<React.StrictMode>
			<ImapDataProvider>
				<App />
			</ImapDataProvider>
		</React.StrictMode>
	);
};

createRoot(container).render(<MainEntry />);
