import React, {useEffect, useState} from 'react';

import EmailDisplay from '@/components/email/EmailDisplay';
import {fetchEmails} from '@/shared/emails/scripts/client/EmailFetcher';

import {EmailModel, EmailModelSortArgs} from '@/shared/emails/models/EmailModel';
import {sort} from '@/client/scripts/sort';
import EmailsVirtualized from '@/components/email/EmailsVirtualized';

export default function App() {
	const [emails, setEmails] = useState<EmailModel[]>([]);
	const [sortedBy, setSortedBy] = useState<EmailModelSortArgs>('Date');
	const chunkSize = 20;

	useEffect(() => {
		getEmails(0);
		console.log('emails', emails);
	}, []);

	const getEmails = (index: number) => {
		fetchEmails(index, chunkSize + index)
			.then((fetchedEmails) => {
				setEmails((emails) => [...emails, ...fetchedEmails]);
			})
			.catch((err) => {
				console.error(err);
			});
	};

	const sortEmailsBy = (by: keyof EmailModel) => {
		const sortBy: EmailModelSortArgs = sortedBy === by ? `-${by}` : by;
		const sorted = sort(emails, sortBy);
		setEmails(sorted);
		setSortedBy(sortBy);
	};

	return (
		<div className='flex items-center justify-center'>
			<div
				className='App bg-secondary'
				style={{
					height: '844px',
					width: '390px',
				}}>
				<div className='h-full'>
					<div className='h-1/3 w-full'>
						<div className='h-1/5 bg-primary text-font-primary grid grid-cols-3'>
							<div></div>
							<div></div>
							<div></div>
						</div>
						<div className='h-4/5 flex items-center justify-center'>
							<div className='bg-secondary h-4/5 w-11/12 rounded-lg'>
								<button className='h-full w-full bg-primary'></button>
							</div>
						</div>
					</div>
					<div className='h-2/3 h-full overflow-y-hidden'>
						<EmailDisplay className='overflow-y-hidden'>
							<EmailsVirtualized emails={emails} loadNextPage={getEmails} />
						</EmailDisplay>
						{/*<EmailDisplay emails={emails} refreshEmails={refreshEmails} sortEmails={sortEmailsBy} flush={true} />*/}
					</div>
				</div>
			</div>
		</div>
	);
}
