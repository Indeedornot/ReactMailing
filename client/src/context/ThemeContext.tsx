// context/todoContext.tsx
import {ReactNode, createContext, useEffect, useState, useCallback, useMemo} from 'react';

export type Theme = 'light' | 'dark';

export type ThemeContextType = {
	theme: Theme;
	resetTheme: () => void;
	setTheme: (newTheme: Theme) => void;
};

//@ts-expect-error - It is initialized in the provider before it is used
export const ThemeContext = createContext<ThemeContextType>();

export const ThemeProvider = ({children}: {children: ReactNode}) => {
	const [theme, internalSetTheme] = useState<Theme>('dark');

	useEffect(() => getInitTheme, []);
	const getInitTheme = useCallback(() => {
		const darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
		if (darkMode) {
			internalSetTheme('dark');
			document.body.classList.add('dark');
		} else {
			internalSetTheme('light');
			document.body.classList.remove('dark');
		}
	}, [internalSetTheme]);

	const setTheme = useCallback(
		(newTheme: Theme) => {
			internalSetTheme(newTheme);
			if (newTheme === 'dark') {
				document.body.classList.add('dark');
			} else {
				document.body.classList.remove('dark');
			}
		},
		[internalSetTheme]
	);

	const resetTheme = useCallback(() => {
		getInitTheme();
	}, [getInitTheme]);

	const value = useMemo(() => {
		return {
			theme,
			resetTheme,
			setTheme,
		};
	}, [theme, resetTheme, setTheme]);

	return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};
