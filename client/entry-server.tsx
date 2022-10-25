import React from 'react';
import ReactDOMServer from 'react-dom/server';
import '../index.css';
import App from '@/components/app/App';
import {extract, setup} from 'twind';
import {sharedConfig} from '@/styles/Twind.config';

setup(sharedConfig);

const app = () =>
	ReactDOMServer.renderToString(
		<React.StrictMode>
			<App />
		</React.StrictMode>
	);

export function render() {
	const {html, css} = extract(app());

	const head = `<style data-twind>${css}</style>`;
	return {html, head};
}
