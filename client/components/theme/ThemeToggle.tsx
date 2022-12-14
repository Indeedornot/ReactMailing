import {FaMoon, FaSun} from 'react-icons/fa';
import React from 'react';
import {buttonStyleless} from '@/styles/PublicStyles';
import {cx} from 'twind';

export function ThemeToggle() {
	const [darkMode, setDarkMode] = React.useState(false);

	React.useEffect(() => {
		if (window.window !== undefined && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
			document.body.classList.add('dark');
			setDarkMode(true);
		}
		return setDarkMode(false);
	}, []);

	const toggleDarkMode = () => {
		setDarkMode((mode) => !mode);
		document.body.classList.toggle('dark');
	};

	return (
		<button className={cx(buttonStyleless, 'text-font-primary')} onClick={toggleDarkMode}>
			{darkMode ? <FaMoon /> : <FaSun />}
		</button>
	);
}
