import '../index.css';
import GlobalStyles from './styles/GlobalStyles';

import React from 'react';
import {render, hydrate} from 'react-dom';

import App from '@/components/app/App';
import {DevSupport} from '@react-buddy/ide-toolbox';

import {ComponentPreviews, useInitial} from '../.reactbuddy';

const container = document.getElementById('root');

const FullApp = () => {
  return (
    <React.StrictMode>
      <GlobalStyles />
      <DevSupport
        ComponentPreviews={ComponentPreviews}
        useInitialHook={useInitial}>
        <App />
      </DevSupport>
    </React.StrictMode>
  );
};

if (!container?.innerText) {
  render(<FullApp />, container);
} else {
  hydrate(<FullApp />, container);
}
