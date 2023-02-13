import React from 'react';
import {createRoot} from 'react-dom/client';
import './globalStyles.css';
import App from './app/App';
import {ImapDataProvider} from './context/ImapDataContext';
import {EmailProvider} from './context/EmailsContext';
import {ThemeProvider} from './context/ThemeContext';

const container = document.getElementById('root') as HTMLElement;

const MainEntry = () => {
	return (
		<React.StrictMode>
			<ThemeProvider>
				<ImapDataProvider>
					<EmailProvider>
						<App />
					</EmailProvider>
				</ImapDataProvider>
			</ThemeProvider>
		</React.StrictMode>
	);
};

createRoot(container).render(<MainEntry />);
