module.exports = {
	root: true,
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 2020,
		sourceType: 'module',
		ecmaFeatures: {
			jsx: true,
		},
	},
	settings: {
		react: {
			version: 'detect',
		},
	},
	env: {
		browser: true,
		amd: true,
		node: true,
	},
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:react/recommended',
		'plugin:jsx-a11y/recommended',
		'prettier',
	],
	plugins: ['prettier'],
	rules: {
		'@typescript-eslint/explicit-function-return-type': 'off',
		'react/prop-types': 'warn',
		'react/react-in-jsx-scope': 'off',
		'react/no-unescaped-entities': 'warn',
		'react/jsx-curly-brace-presence': [2, {props: 'never', children: 'never', propElementValues: 'always'}],
		'prefer-const': 'error',
	},
};

