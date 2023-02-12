export const setDefaultTheme = () => {
	const darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
	if (!darkMode) return;
	document.body.classList.add('dark');
};
