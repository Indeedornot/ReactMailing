import react from '@vitejs/plugin-react';
import {defineConfig} from 'vite';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react({
            jsxImportSource: '@emotion/react',
            babel: {
                plugins: ['@emotion/babel-plugin'],
            },
        }),
    ],
    resolve: {
        alias: [
            {
                find: '@/bootstrap',
                replacement: path.resolve(__dirname, 'node_modules/bootstrap'),
            },
            {find: '@/scss', replacement: path.resolve(__dirname, 'src/scss')},
            {
                find: '@/components',
                replacement: path.resolve(__dirname, 'src/components'),
            },
        ],
    },
    server: {port: 3000},
    root: ''
});
