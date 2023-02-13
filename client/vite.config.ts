import react from '@vitejs/plugin-react';
import {defineConfig} from 'vite';
import path from 'path';

const aliasPath = (relativePath: string, alias: string) => {
	return {
		find: alias,
		replacement: path.resolve(__dirname, relativePath),
	};
};

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
			aliasPath('src/components', '@/components'),
			aliasPath('../shared', '@/shared'),
			aliasPath('src/scripts', '@/scripts'),
			aliasPath('src/context', '@/context'),
		],
	},
	server: {port: 3000},
	root: '',
});
