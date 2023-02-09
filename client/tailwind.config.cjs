/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				primary: 'rgb(var(--color-primary) / <alpha-value>)',
				secondary: 'rgb(var(--color-secondary) / <alpha-value>)',
				accent: 'rgb(var(--color-accent) / <alpha-value>)',
				'font-primary': 'rgb(var(--color-text-primary) / <alpha-value>)',
				'font-secondary': 'rgb(var(--color-text-secondary) / <alpha-value>)',
				'font-accent': 'rgb(var(--color-text-accent) / <alpha-value>)',
			},
		},
	},

	plugins: [require('@tailwindcss/forms')],
	darkMode: 'class',
};

