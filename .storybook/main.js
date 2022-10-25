const path = require('path');
const react = require('@vitejs/plugin-react');
const tsconfigPaths = require('vite-tsconfig-paths').default;

const config = {
	stories: ['../stories/**/*.stories.mdx', '../stories/**/*.stories.@(js|jsx|ts|tsx)'],
	addons: [
		'@storybook/addon-links',
		'@storybook/addon-essentials',
		'@storybook/addon-interactions',
		'@storybook/preset-create-react-app',
		'storybook-dark-mode',
		'storybook-addon-variants',
		{
			name: '@storybook/addon-postcss',
			options: {
				cssLoaderOptions: {
					// When you have splitted your css over multiple files
					// and use @import('./other-styles.css')
					importLoaders: 1,
				},
				postcssLoaderOptions: {
					// When using postCSS 8
					implementation: require('postcss'),
				},
			},
		},
		'storybook-tailwind-dark-mode',
	],
	framework: '@storybook/react',
	core: {
		builder: '@storybook/builder-vite',
	},
	features: {
		storyStoreV7: true,
		previewMdx2: true,
	},
	/**
	 * A option exposed by storybook-builder-vite for customising the Vite config.
	 * @see https://github.com/eirslett/storybook-builder-vite#customize-vite-config
	 * @param {import("vite").UserConfig} config
	 * @see https://vitejs.dev/config/
	 */
	async viteFinal(config) {
		config.plugins.push(
			/** @see https://github.com/aleclarson/vite-tsconfig-paths */
			tsconfigPaths({
				// My tsconfig.json isn't simply in viteConfig.root,
				// so I've passed an explicit path to it:
				projects: [path.resolve(path.dirname(__dirname), 'tsconfig.json')],
			})
		);

		return config;
	},
};

module.exports = config;
