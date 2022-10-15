import tw, {css} from 'twin.macro';

import React, {useState} from 'react';

import EmailTab from '@/components/email/EmailTab';
import {fetchEmails} from '@/shared/emails/scripts/client/EmailFetcher';
import {setEmails} from '@/client/redux/emails/emailsSlice';
import {useAppDispatch, useAppSelector} from '@/client/redux/hooks';

export default function App() {
	const emails = useAppSelector((state) => state.emailsData.emails);
	const dispatch = useAppDispatch();

	return (
		<div className='flex items-center justify-center'>
			<div
				className='App'
				css={css`
					height: 844px;
					width: 390px;

					${tw`bg-white dark:bg-gray-900`}
				`}>
				<div className='h-full'>
					<div className='h-1/3 w-full'>
						<div className='h-1/5 bg-indigo-200 dark:bg-gray-900'></div>
						<div className='h-4/5 flex items-center justify-center'>
							<div className='bg-indigo-200 dark:bg-gray-900 h-4/5 w-11/12 rounded-lg'>
								<button
									className='h-full w-full bg-black'
									onClick={() =>
										fetchEmails()
											.then((data) => dispatch(setEmails(data)))
											.then(() => console.log(emails))
									}></button>
							</div>
						</div>
					</div>
					<div className='h-2/3 w-full flex justify-center'>
						<div className='w-11/12'>
							<EmailTab emails={emails} />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
