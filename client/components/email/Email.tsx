import {EmailModel} from '@/shared/emails/models/EmailModel';
import AccordionItem from '@/components/accordion/AccordionItem';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import {HTMLAttributes} from 'react';

dayjs.extend(relativeTime);

export default function Email({email, flush, onToggle, ...atr}: EmailProps) {

	const getSender = () => {
		if(!email || (!email.SenderName && !email.SenderEmail)) return 'Unknown';

		if(email.SenderName){
			return email.SenderName;
		}
		else if (email.SenderEmail) {
			return email.SenderEmail;
		}
	}

	const getSubject = () => {
		if (email && email.Subject) {
			return email.Subject;
		}

		return 'No Subject';
	}

	const getDate = () => {
		if (email && email.Date) {
			return dayjs(email.Date).fromNow();
		}

		return 'Unknown';
	}

	return (
		<AccordionItem
			className='w-full h-[60px]'
			flush={flush}
			open={false}
			{...atr}
			onToggle={onToggle}
			header={
				<div
					className='h-full w-full px-2
                 					 grid grid-cols-12 grid-rows-2
                 					 border-b
                					 bg-primary border-accent
                					 py-1.5
                					'>
					<div className='col-span-9 row-span-1 overflow-hidden text-ellipsis whitespace-nowrap'>
						{getSender()}
					</div>
					<div className='col-span-3 row-span-1 overflow-hidden text-ellipsis text-right whitespace-nowrap'>
						{getDate()}
					</div>
					<div className='col-span-12 row-span-1 overflow-hidden text-ellipsis text-sm whitespace-nowrap'>
						{getSubject()}
					</div>
				</div>
			}>
			<div className='w-full h-[200px]'>
				<iframe
					className='m-0 p-0 w-full h-full break-words
																border-b-2 border-accent
																bg-secondary overflow-auto'
					srcDoc={email && email.Body}
					title={'Email Body'}></iframe>
			</div>
		</AccordionItem>
	);
}

type EmailProps = HTMLAttributes<HTMLDivElement> & {
	email: EmailModel;
	flush?: boolean;
	onToggle?: (isOpen: boolean) => void;
};
