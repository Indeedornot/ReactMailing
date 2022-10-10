import React from 'react';
import ReactDOMServer from 'react-dom/server';
import './index.css';
import App from '@/components/app/App';

export function render(url: string) {
    return ReactDOMServer.renderToString(
        <React.StrictMode>
            Hi
                <App/>
        </React.StrictMode>,
    );
}
