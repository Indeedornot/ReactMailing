import react from '@vitejs/plugin-react';
import {defineConfig} from 'vite';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
	optimizeDeps: {
		esbuildOptions: {
			target: 'es2020',
		},
	},
	plugins: [react()],
	esbuild: {
		// https://github.com/vitejs/vite/issues/8644#issuecomment-1159308803
		logOverride: {'this-is-undefined-in-esm': 'silent'},
	},
	resolve: {
		alias: [
			{
				find: '@/components',
				replacement: path.resolve(__dirname, 'src/components'),
			},
			{find: '@/shared', replacement: path.resolve(__dirname).replace('client', 'shared')},
			{find: '@/scripts', replacement: path.resolve(__dirname, 'src/scripts')},
		],
	},
	server: {port: 3000},
	root: '',
});
