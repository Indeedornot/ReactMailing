// context/todoContext.tsx
import {EmailModel} from '@/shared/models/EmailModel';
import {ReactNode, createContext, useContext, useEffect, useState} from 'react';
import {ImapDataContext} from './ImapDataContext';
import {fetchEmails} from '@/scripts/api/EmailFetcher';

export type EmailContextType = {
	emails: EmailModel[];
	setEmails: (emails: EmailModel[]) => void;
	clearEmails: () => void;
	loadNextPage: () => Promise<void>;
	refreshEmails: () => Promise<void>;
	isFetching: boolean;
};

//@ts-expect-error - It is initialized in the provider before it is used
export const EmailContext = createContext<EmailContextType>();

export const emailsPerPage = 20;
export const EmailProvider = ({children}: {children: ReactNode}) => {
	const [emails, internalSetEmails] = useState<EmailModel[]>([]);
	const [isFetching, setIsFetching] = useState(false);

	const {imapData} = useContext(ImapDataContext);

	const setEmails = (newEmails: EmailModel[]) => {
		internalSetEmails(newEmails);
	};

	const clearEmails = () => {
		internalSetEmails([]);
		localStorage.removeItem('imapData');
	};

	const refreshEmails = async () => {
		if (isFetching) return;
		if (!imapData) return;

		internalSetEmails([]);
		setIsFetching(true);

		try {
			const fetchedEmails = await fetchEmails(0, emailsPerPage, imapData);
			console.log(fetchedEmails.length + emails.length);
			internalSetEmails(fetchedEmails);
		} catch (err) {
			console.error(err);
		}

		setIsFetching(false);
	};

	const loadNextPage = async () => {
		if (isFetching) return;
		if (!imapData) return;

		setIsFetching(true);

		try {
			const fetchedEmails = await fetchEmails(emails.length, emailsPerPage, imapData);
			console.log(fetchedEmails.length + emails.length);
			internalSetEmails((emails) => [...emails, ...fetchedEmails]);
		} catch (err) {
			console.error(err);
		}

		setIsFetching(false);
	};

	/**
	 * Possible problems - if the user changes the imapData during the loading of the emails,
	 * the emails will be loaded for the new imapData
	 */
	useEffect(() => {
		if (emails.length > 0) clearEmails();
		loadNextPage();
	}, [imapData]);

	return (
		<EmailContext.Provider
			value={{
				emails,
				setEmails,
				clearEmails,
				loadNextPage,
				isFetching,
				refreshEmails,
			}}>
			{children}
		</EmailContext.Provider>
	);
};
