import React from 'react';
import ReactDOMServer from 'react-dom/server';
import './index.css';
import App from '@/components/app/App';
import GlobalStyles from './styles/GlobalStyles';
import {DevSupport} from '@react-buddy/ide-toolbox';
import {ComponentPreviews, useInitial} from '../.reactbuddy';
import {Provider} from 'react-redux';
import {store} from '@/client/redux/store';

export function render(url: string) {
	return ReactDOMServer.renderToString(
		<React.StrictMode>
			<GlobalStyles />
			<DevSupport ComponentPreviews={ComponentPreviews} useInitialHook={useInitial}>
				<Provider store={store}>
					<App />
				</Provider>
			</DevSupport>
		</React.StrictMode>
	);
}
