import '../index.css';
import React from 'react';

import App from '@/components/app/App';
import {createRoot, hydrateRoot} from 'react-dom/client';
import {setup} from 'twind';
import {sharedConfig} from '@/styles/Twind.config';

setup(sharedConfig);

const container = document.getElementById('root') as HTMLDivElement;

const FullApp = () => {
	return (
		<React.StrictMode>
			<App />
		</React.StrictMode>
	);
};

if (container) {
	if (container.innerText) createRoot(container).render(<FullApp />);
	else hydrateRoot(container, <FullApp />);
}
