import React, {useState} from 'react';

import EmailDisplay from '@/components/email/EmailDisplay';
import {fetchEmails} from '@/shared/emails/scripts/client/EmailFetcher';

import {EmailModel, EmailModelSortArgs} from '@/shared/emails/models/EmailModel';
import {sort} from '@/client/scripts/sort';

export default function App() {
	const [emails, setEmails] = useState<EmailModel[]>([]);
	const [sortedBy, setSortedBy] = useState<EmailModelSortArgs>('Date');

	const refreshEmails = () => {
		fetchEmails()
			.then((data) => setEmails(data))
			.then(() => console.log(emails));
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
							<div>asd</div>
							<div>asd</div>
							<div>asd</div>
						</div>
						<div className='h-4/5 flex items-center justify-center'>
							<div className='bg-secondary h-4/5 w-11/12 rounded-lg'>
								<button className='h-full w-full bg-primary'></button>
							</div>
						</div>
					</div>
					<div className='h-2/3 w-full flex justify-center'>
						<div className='w-11/12'>
							<EmailDisplay emails={emails} refreshEmails={refreshEmails} sortEmails={sortEmailsBy} />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
