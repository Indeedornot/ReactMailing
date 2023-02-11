import React from 'react';
import {createRoot} from 'react-dom/client';
import './globalStyles.css';
import App from './app/App';

const container = document.getElementById('root') as HTMLElement;

const MainEntry = () => {
	return (
		<React.StrictMode>
			<App />
		</React.StrictMode>
	);
};

createRoot(container).render(<MainEntry />);
