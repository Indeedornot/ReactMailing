import React, {useState} from 'react';

import EmailDisplay from '@/components/email/EmailDisplay';
import {fetchEmails} from '@/scripts/api/EmailFetcher';

import {EmailModel, EmailModelSortArgs} from '@/shared/models/EmailModel';
import {sort} from '@/scripts/helpers/sort';
import EmailsVirtualized from '@/components/email/EmailsVirtualized';
import {ThemeToggle} from '@/components/theme/ThemeToggle';
import {ImapDataModel, isValidImapData} from '@/shared/models/ImapDataModel';
import {LoginButton} from '@/components/Login/LoginButton';

export default function App() {
	const [emails, setEmails] = useState<EmailModel[]>([]);
	//	const [sortedBy, setSortedBy] = useState<EmailModelSortArgs>('Date');
	const chunkSize = 21;
	const [isFetching, setIsFetching] = useState(false);

	const getImapData = () => {
		const imapData = JSON.parse(localStorage.getItem('imapData') || '{}') as ImapDataModel;
		return isValidImapData(imapData) ? imapData : null;
	};

	const getEmails = () => {
		if (isFetching) return;

		const imapData = getImapData();
		if (!imapData) return;

		const start = emails.length;
		const end = start + chunkSize;

		setIsFetching(true);
		fetchEmails(-end, -start, imapData)
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
		getEmails();
	};

	// const sortEmailsBy = (by: keyof EmailModel) => {
	// 	const sortBy: EmailModelSortArgs = sortedBy === by ? `-${by}` : by;
	// 	const sorted = sort(emails, sortBy);
	// 	setEmails(sorted);
	// 	setSortedBy(sortBy);
	// };

	return (
		<div className='flex w-full h-full items-center justify-center'>
			<div className='App bg-secondary w-full h-full'>
				<div className='h-full flex flex-col'>
					<div className='h-[11%] w-full'>
						<div className='h-1/3 bg-primary text-font-primary grid grid-cols-12 flex justify-items-center items-center'>
							<div className='col-span-3 flex'>
								<ThemeToggle />
							</div>
							<div className='col-span-6'></div>
							<div className='col-span-3'>
								<LoginButton />
							</div>
						</div>
						{/*<div className='h-4/5 flex items-center justify-center'>*/}
						{/*	<div className='bg-secondary h-4/5 w-11/12 rounded-lg'>*/}
						{/*		<button className='h-full w-full bg-primary'></button>*/}
						{/*	</div>*/}
						{/*</div>*/}
					</div>
					<div className='overflow-y-hidden flex-grow'>
						<EmailDisplay className='overflow-y-hidden' flush={true} refreshEmails={refreshEmails}>
							<EmailsVirtualized emails={emails} loadNextPage={getEmails} className='overflow-y-hidden' />
						</EmailDisplay>
						{/*<EmailDisplay emails={emails} refreshEmails={refreshEmails} sortEmails={sortEmailsBy} flush={true} />*/}
					</div>
				</div>
			</div>
		</div>
	);
}

