import '../index.css';
import GlobalStyles from './styles/GlobalStyles';

import React from 'react';
import {render, hydrate} from 'react-dom';

import App from '@/components/app/App';
import {DevSupport} from '@react-buddy/ide-toolbox';

import {ComponentPreviews, useInitial} from '../.reactbuddy';

import {Provider} from 'react-redux';
import {store} from '@/client/redux/store';

const container = document.getElementById('root');

const FullApp = () => {
	return (
		<React.StrictMode>
			<GlobalStyles />
			<DevSupport ComponentPreviews={ComponentPreviews} useInitialHook={useInitial}>
				<Provider store={store}>
					<App />
				</Provider>
			</DevSupport>
		</React.StrictMode>
	);
};

if (!container?.innerText) {
	render(<FullApp />, container);
} else {
	hydrate(<FullApp />, container);
}
