import {FaMoon, FaSun} from 'react-icons/fa';
import {useCallback, useState} from 'react';
import {useMutationObservable} from '@/scripts/client/MutationObserverHook';

const mutationObserverOptions = {config: {attributes: true, attributeFilter: ['class']}};

export function ThemeToggle() {
	const [darkMode, setDarkMode] = useState(false);

	const documentClassChanged = useCallback(() => {
		const isDarkMode = document.body.classList.contains('dark');
		setDarkMode(isDarkMode);
	}, [setDarkMode]);

	useMutationObservable(document.body, documentClassChanged, mutationObserverOptions);

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
