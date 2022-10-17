import AccordionItem from '@/components/accordion/AccordionItem';
import {css} from 'twin.macro';
import {EmailModel} from '@/shared/emails/models/EmailModel';
import {HTMLAttributes} from 'react';
import cx from 'classnames';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

export function EmailList({emails, scrollbar, flush, className, ...atr}: EmailListProps) {
	const scrollbarLess = css`
		scrollbar-width: none;
		-ms-overflow-style: none;

		&::-webkit-scrollbar {
			width: 0;
			height: 0;
		}
	`;

	return (
		<div className={cx('flex flex-auto flex-col w-full overflow-y-auto', className)} css={!scrollbar && scrollbarLess} {...atr}>
			{emails &&
				emails.map((email, index) => (
					<AccordionItem
						key={index}
						className='w-full h-[60px]'
						flush={flush}
						open={false}
						header={
							<div
								key={index}
								className='h-full w-full px-2
                 					 grid grid-cols-12 grid-rows-2
                 					 border-b
                					 bg-primary border-accent
                					 py-1.5
                					'>
								<div className='col-span-9 row-span-1 overflow-hidden text-ellipsis whitespace-nowrap'>
									{email.SenderName ? email.SenderName : email.SenderEmail}
								</div>
								<div className='col-span-3 row-span-1 overflow-hidden text-ellipsis text-right whitespace-nowrap'>{dayjs().to(email.Date)}</div>
								<div className='col-span-12 row-span-1 overflow-hidden text-ellipsis text-sm whitespace-nowrap'>
									{email.Subject ? email.Subject : '<No Subject>'}
								</div>
							</div>
						}>
						<div className='w-full'>
							<iframe
								className='m-0 p-0 w-full break-words
																border-b-2 border-accent
																bg-secondary'
								srcDoc={email.Body}
								title={'Email Body'}></iframe>
						</div>
					</AccordionItem>
				))}
		</div>
	);
}

type EmailListProps = HTMLAttributes<HTMLDivElement> & {
	emails: EmailModel[];
	scrollbar: boolean;
	flush: boolean;
};
