import {EmailModel} from '@/shared/emails/models/EmailModel';
import tw, {css} from 'twin.macro';
import {useState} from 'react';
import AccordionItem from '@/components/accordion/AccordionItem';
import {useDispatch} from 'react-redux';
import {sortEmails} from '@/client/redux/emails/emailsSlice';

export default function EmailTab({emails}: EmailTabProps) {
	const buttonStyleless = css`
		background: none;
		color: inherit;
		border: none;
		padding: 0;
		font: inherit;
		cursor: pointer;
		outline: inherit;
	`;

	const dispatch = useDispatch();

	return (
		<div className='h-full w-full flex flex-col'>
			<div
				className='
								flex flex-grow-0 flex-shrink-0
                w-full py-3.5 rounded-t-lg
                bg-indigo-200 dark:bg-gray-900 shadow-lg
                border-b-2 border-blue-400'>
				<div className='grid grid-cols-12 text-center h-full w-full'>
					<button className='col-span-3' css={buttonStyleless} onClick={() => dispatch(sortEmails('SenderName'))}>
						From
					</button>
					<button className='col-span-6' css={buttonStyleless} onClick={() => dispatch(sortEmails('Subject'))}>
						Subject
					</button>
					<button className='col-span-3' css={buttonStyleless} onClick={() => dispatch(sortEmails('Date'))}>
						Date
					</button>
				</div>
			</div>
			<div
				className='flex flex-auto flex-col
                	 w-full rounded-b-lg
                	 bg-white shadow-lg overflow-y-auto'
				css={css`
					scrollbar-width: none;
					-ms-overflow-style: none;

					&::-webkit-scrollbar {
						width: 0;
						height: 0;
					}
				`}>
				{emails.map((email, index) => (
					<AccordionItem
						key={index}
						className='w-full h-[115px] border-b-2 border-blue-400'
						flush={true}
						open={false}
						header={
							<div
								key={index}
								className='h-full w-full
                 					 grid grid-cols-12 grid-rows-2
                					 bg-white border-b-2 border-green-400'>
								<div className='col-span-9 row-span-1 overflow-hidden text-ellipsis whitespace-nowrap'>{email.SenderName}</div>
								<div className='col-span-3 row-span-1 overflow-hidden text-ellipsis whitespace-nowrap'>{email.Date}</div>
								<div className='col-span-12 row-span-1 overflow-hidden text-ellipsis text-sm whitespace-nowrap'>
									{email.Subject ? email.Subject : '<No Subject>'}
								</div>
							</div>
						}>
						<div className='w-full'>
							<iframe className='m-0 p-0 w-full break-words' srcDoc={email.Body} title={'Email Body'}></iframe>
						</div>
					</AccordionItem>
				))}
			</div>
		</div>
	);
}

type EmailTabProps = {
	emails: EmailModel[];
};
