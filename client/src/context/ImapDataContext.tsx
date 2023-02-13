// context/todoContext.tsx
import {ImapDataModel} from '@/shared/models/ImapDataModel';
import {isValidImapData} from '@/shared/models/ImapDataModel';
import {ReactNode, createContext, useEffect, useState} from 'react';

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

	const setImapData = (imapData: ImapDataModel) => {
		if (!isValidImapData(imapData)) return false;

		internalSetImapData(imapData);
		localStorage.setItem('imapData', JSON.stringify(imapData));
		return true;
	};

	const deleteImapData = () => {
		internalSetImapData(null);
		localStorage.removeItem('imapData');
	};

	useEffect(() => getInitImapData, []);
	const getInitImapData = () => {
		const imapData = localStorage.getItem('imapData');
		if (!imapData) return;

		const parsedImapData = JSON.parse(imapData);
		if (!isValidImapData(parsedImapData)) return;

		internalSetImapData(parsedImapData);
	};

	return (
		<ImapDataContext.Provider
			value={{
				imapData,
				setImapData,
				deleteImapData,
				isLoggedIn,
			}}>
			{children}
		</ImapDataContext.Provider>
	);
};
