import '../index.css';
import TwinStyles from '@/styles/Twin/TwinStyles';

import React from 'react';

import App from '@/components/app/App';
import {createRoot, hydrateRoot} from 'react-dom/client';
const container = document.getElementById('root') as HTMLDivElement;

const FullApp = () => {
	return (
		<React.StrictMode>
			<TwinStyles />
			<App />
		</React.StrictMode>
	);
};

if (container) {
	if (container.innerText) createRoot(container).render(<FullApp />);
	else hydrateRoot(container, <FullApp />);
}
