import {themes} from '@storybook/theming';
import '../index.css';
import {extract, setup} from 'twind';
import {sharedConfig} from '../client/styles/Twind.config';
import ReactDOMServer from 'react-dom/server';

setup(sharedConfig);

export const parameters = {
	actions: {argTypesRegex: '^on[A-Z].*'},
	controls: {
		matchers: {
			color: /(background|color)$/i,
			date: /Date$/,
		},
	},
	darkMode: {
		// Override the default dark theme
		dark: {...themes.dark},
		// Override the default light theme
		light: {...themes.normal},
	},
	layout: 'fullscreen',
};

export const globalTypes = {
	darkMode: true,
};

export const decorators = [
	(Story: () => JSX.Element) => {
		const story = Story();
		const {css} = extract(ReactDOMServer.renderToString(story));
		document.querySelector('[data-twind]')!.innerHTML = css;
		const final = <div>{story}</div>;
		console.log(final);
		return final;
	},
];
