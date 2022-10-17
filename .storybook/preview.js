import {themes} from '@storybook/theming';
import '../index.css';
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
};

export const globalTypes = {
	darkMode: true,
};
