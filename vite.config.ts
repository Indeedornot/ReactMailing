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
    plugins: [
        react({
            jsxImportSource: '@emotion/react',
            babel: {
                plugins: ['@emotion/babel-plugin',
                    'babel-plugin-macros',
                    [
                        '@emotion/babel-plugin-jsx-pragmatic',
                        {
                            export: 'jsx',
                            import: '__cssprop',
                            module: '@emotion/react',
                        },
                    ],
                    [
                        '@babel/plugin-transform-react-jsx',
                        {pragma: '__cssprop'},
                        'twin.macro',
                    ],],
            },
        }),
    ],
    esbuild: {
        // https://github.com/vitejs/vite/issues/8644#issuecomment-1159308803
        logOverride: {'this-is-undefined-in-esm': 'silent'},
    },
    resolve: {
        alias: [
            {
                find: '@/bootstrap',
                replacement: path.resolve(__dirname, 'node_modules/bootstrap'),
            },
            {find: '@/styles', replacement: path.resolve(__dirname, 'client/styles')},
            {
                find: '@/components',
                replacement: path.resolve(__dirname, 'client/components'),
            },
            {find: '@/shared', replacement: path.resolve(__dirname, 'shared')},
        ],
    },
    server: {port: 3000},
    root: ''
});
