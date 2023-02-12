import React from 'react';
import {createRoot} from 'react-dom/client';
import './globalStyles.css';
import App from './app/App';
import {setDefaultTheme} from './scripts/client/Theme';

setDefaultTheme();

const container = document.getElementById('root') as HTMLElement;

const MainEntry = () => {
	return (
		<React.StrictMode>
			<App />
		</React.StrictMode>
	);
};

createRoot(container).render(<MainEntry />);
