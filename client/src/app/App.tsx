import {useContext, useState} from 'react';

import EmailDisplay from '@/components/email/EmailDisplay';
import {fetchEmails} from '@/scripts/api/EmailFetcher';

import {EmailModel, EmailModelSortArgs, } from '@/shared/models/EmailModel';
import {sort} from '@/scripts/helpers/sort';
import {ThemeToggle} from '@/components/theme/ThemeToggle';
import {LoginButton} from '@/components/Login/LoginButton';
import {ImapDataContext} from '@/context/ImapDataContext';

export default function App() {
	//	const [sortedBy, setSortedBy] = useState<EmailModelSortArgs>('Date');

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
				<EmailDisplay />
			</div>
		</div>
	);
}
