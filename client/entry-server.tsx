import React from 'react';
import ReactDOMServer from 'react-dom/server';
import '../index.css';
import App from '@/components/app/App';
import TwinStyles from '@/styles/Twin/TwinStyles';

export async function render() {
	return ReactDOMServer.renderToString(
		<React.StrictMode>
			<TwinStyles />
			<App />
		</React.StrictMode>
	);
}
