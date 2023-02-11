module.exports = {
	root: true,
	parser: '@typescript-eslint/parser',
	env: {
		node: true,
	},
	extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'prettier'],
	plugins: ['prettier'],
	rules: {
		'@typescript-eslint/explicit-function-return-type': 'off',
		'prefer-const': 'error',
		eqeqeq: ['error', 'always'],
	},
};

