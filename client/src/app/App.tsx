import React, {useState} from 'react';

import EmailDisplay from '@/components/email/EmailDisplay';
import {fetchEmails} from '@/scripts/api/EmailFetcher';

import {EmailModel, EmailModelSortArgs, SampleData} from '@/shared/models/EmailModel';
import {sort} from '@/scripts/helpers/sort';
import {ThemeToggle} from '@/components/theme/ThemeToggle';
import {ImapDataModel, isValidImapData} from '@/shared/models/ImapDataModel';
import {getImapData, setImapData, clearImapData} from '@/scripts/client/ImapData';
import {LoginButton} from '@/components/Login/LoginButton';

export default function App() {
	const [emails, setEmails] = useState<EmailModel[]>(SampleData);
	//	const [sortedBy, setSortedBy] = useState<EmailModelSortArgs>('Date');
	const chunkSize = 21;
	const [isFetching, setIsFetching] = useState(false);

	const getEmails = () => {
		if (isFetching) return;

		const imapData = getImapData();
		if (!imapData) return;

		setIsFetching(true);
		fetchEmails(emails.length, chunkSize, imapData)
			.then((fetchedEmails) => {
				console.log(fetchedEmails.length + emails.length);
				setEmails((emails) => [...emails, ...fetchedEmails]);
				setIsFetching(false);
			})
			.catch((err) => {
				console.error(err);
				setIsFetching(false);
			});
	};

	const refreshEmails = () => {
		setEmails([]);
		//watchout, due to them being cached, it will not apply
		//coming from sampleData does not work, fetching from -21, rather than 0
		getEmails();
	};

	// const sortEmailsBy = (by: keyof EmailModel) => {
	// 	const sortBy: EmailModelSortArgs = sortedBy === by ? `-${by}` : by;
	// 	const sorted = sort(emails, sortBy);
	// 	setEmails(sorted);
	// 	setSortedBy(sortBy);
	// };

	return (
		<div className='flex flex-col bg-secondary w-full h-full'>
			{/* Header */}
			<div className='h-[11%] w-full'>
				<div className='h-1/3 bg-primary text-font-primary grid grid-cols-12 justify-items-center items-center'>
					<div className='col-span-3 flex'>
						<ThemeToggle />
					</div>
					<div className='col-span-6'></div>
					<div className='col-span-3'>
						<LoginButton />
					</div>
				</div>
			</div>
			{/* Body */}
			<div className='flex-grow'>
				<EmailDisplay refreshEmails={refreshEmails} emails={emails} loadNextPage={getEmails} isFetching={isFetching} />
			</div>
		</div>
	);
}
