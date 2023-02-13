// context/todoContext.tsx
import {ImapDataModel, isValidImapData} from '@/shared/models/ImapDataModel';
import {ReactNode, createContext, useEffect, useState, useCallback, useMemo} from 'react';

export type ImapDataContextType = {
	imapData: ImapDataModel | null;

	/** Returns true if the data was set, false if it was invalid */
	setImapData: (imapData: ImapDataModel) => boolean;
	deleteImapData: () => void;
	isLoggedIn: boolean;
};

//@ts-expect-error - It is initialized in the provider before it is used
export const ImapDataContext = createContext<ImapDataContextType>();

export const ImapDataProvider = ({children}: {children: ReactNode}) => {
	const [imapData, internalSetImapData] = useState<ImapDataModel | null>(null);
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	useEffect(() => {
		imapData !== null ? setIsLoggedIn(true) : setIsLoggedIn(false);
	}, [imapData]);

	const setImapData = useCallback(
		(newImapData: ImapDataModel) => {
			if (!isValidImapData(newImapData)) return false;

			internalSetImapData(newImapData);
			localStorage.setItem('imapData', JSON.stringify(newImapData));
			return true;
		},
		[internalSetImapData]
	);

	const deleteImapData = useCallback(() => {
		internalSetImapData(null);
		localStorage.removeItem('imapData');
	}, [internalSetImapData]);

	useEffect(() => getInitImapData, []);
	const getInitImapData = useCallback(() => {
		const imapData = localStorage.getItem('imapData');
		if (!imapData) return;

		const parsedImapData = JSON.parse(imapData);
		if (!isValidImapData(parsedImapData)) return;

		internalSetImapData(parsedImapData);
	}, [internalSetImapData]);

	const value = useMemo(() => {
		return {
			imapData,
			setImapData,
			deleteImapData,
			isLoggedIn,
		};
	}, [imapData, setImapData, deleteImapData, isLoggedIn]);

	return <ImapDataContext.Provider value={value}>{children}</ImapDataContext.Provider>;
};
