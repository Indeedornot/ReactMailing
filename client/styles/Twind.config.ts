import {defineConfig} from 'twind';
import presetTailwind from '@twind/preset-tailwind';
import presetTailwindForms from '@twind/preset-tailwind-forms';

export const sharedConfig = defineConfig({
	presets: [presetTailwind(), presetTailwindForms()],
	hash: false, // hash all generated class names (default: false)
	darkMode: 'class', // use a different dark mode strategy (default: 'media')
	// sheet: voidSheet, // use custom sheet (default: cssomSheet in a browser or no-op)
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
		// animation: {
		// 	// Not being used.J ust for reference
		// 	// See src/animations for active animations
		// 	spinner: "spin 4s linear infinite"
		// },
	},
});
