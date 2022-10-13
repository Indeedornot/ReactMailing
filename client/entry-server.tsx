import React from 'react';
import ReactDOMServer from 'react-dom/server';
import './index.css';
import App from '@/components/app/App';
import GlobalStyles from './styles/GlobalStyles';

export function render(url: string) {
  return ReactDOMServer.renderToString(
    <React.StrictMode>
      <GlobalStyles />
      <App />
    </React.StrictMode>
  );
}
