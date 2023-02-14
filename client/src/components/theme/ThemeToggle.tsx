import {FaMoon, FaSun} from 'react-icons/fa';
import {useContext} from 'react';
import {ThemeContext} from '@/context/ThemeContext';

export function ThemeToggle() {
	const {theme, setTheme} = useContext(ThemeContext);

	const toggleDarkMode = () => setTheme(theme === 'dark' ? 'light' : 'dark');

	return (
		<button className='button_styleless text-primary' onClick={toggleDarkMode}>
			{theme === 'dark' ? <FaMoon /> : <FaSun />}
		</button>
	);
}
