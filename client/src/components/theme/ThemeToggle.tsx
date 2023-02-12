import {FaMoon, FaSun} from 'react-icons/fa';
import React from 'react';
import {useMutationObservable} from '../../scripts/client/MutationObserverHook';

export function ThemeToggle() {
	const [darkMode, setDarkMode] = React.useState(false);

	const documentClassChanged = () => {
		const darkMode = document.body.classList.contains('dark');
		setDarkMode(darkMode);
	};

	useMutationObservable(document.body, documentClassChanged, {config: {attributes: true, attributeFilter: ['class']}});

	const toggleDarkMode = () => {
		setDarkMode((mode) => !mode);
		document.body.classList.toggle('dark');
	};

	return (
		<button className='button_styleless text-font-primary' onClick={toggleDarkMode}>
			{darkMode ? <FaMoon /> : <FaSun />}
		</button>
	);
}
