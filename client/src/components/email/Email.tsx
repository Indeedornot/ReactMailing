import {EmailModel} from '@/shared/models/EmailModel';
import AccordionItem from '@/components/accordion/AccordionItem';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import React, {HTMLAttributes} from 'react';
import cx from 'classnames';

dayjs.extend(relativeTime);

const HeaderItemsStyle = 'row-span-1 overflow-hidden text-ellipsis whitespace-nowrap';

// eslint-disable-next-line react/display-name
const MemoIFrame = React.memo(({srcDoc}: {srcDoc: string}) => {
	return (
		<iframe
			className='m-0 p-0 w-full h-full break-words border-b-2 border-accent bg-transparent text-font-primary overflow-auto'
			srcDoc={srcDoc}
			title='Email Body'
		/>
	);
});

export default function Email({email, onToggle}: EmailProps) {
	const getSender = () => {
		if (!email?.SenderName && !email?.SenderEmail) return 'Unknown';

		if (email.SenderName) {
			return email.SenderName;
		} else if (email.SenderEmail) {
			return email.SenderEmail;
		}
	};
	const getSubject = () => {
		if (email && email.Subject) {
			return email.Subject;
		}

		return 'No Subject';
	};
	const getDate = () => {
		if (email && email.Date) {
			return dayjs(email.Date).fromNow();
		}

		return 'Unknown';
	};

	return (
		<AccordionItem
			className='w-full h-[60px]'
			open={false}
			onToggle={onToggle}
			header={
				<div className='h-full w-full px-2 grid grid-cols-12 grid-rows-2 border-b bg-primary border-accent py-1.5'>
					<div className={cx('col-span-9', HeaderItemsStyle)}>{getSender()}</div>
					<div className={cx('col-span-3 text-end', HeaderItemsStyle)}>{getDate()}</div>
					<div className={cx('col-span-12 text-sm', HeaderItemsStyle)}>{getSubject()}</div>
				</div>
			}>
			<div className='w-full h-[200px] bg-white'>
				<MemoIFrame srcDoc={email.Body ? email.Body : ''}></MemoIFrame>
			</div>
		</AccordionItem>
	);
}

type EmailProps = HTMLAttributes<HTMLDivElement> & {
	email: EmailModel;
	onToggle?: (isOpen: boolean) => void;
};
