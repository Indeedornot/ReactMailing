import {EmailModel} from '@/shared/models/EmailModel';
import AccordionItem from '@/components/accordion/AccordionItem';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import React, {useMemo} from 'react';
import cx from 'classnames';

dayjs.extend(relativeTime);

const HeaderItemsStyle = 'row-span-1 overflow-hidden text-ellipsis whitespace-nowrap';

// eslint-disable-next-line react/display-name
const MemoIFrame = React.memo(({srcDoc}: {srcDoc: string}) => {
	return (
		<iframe
			className='m-0 p-0 w-full h-full break-words border-b-2 border-accent bg-transparent text-primary overflow-auto'
			srcDoc={srcDoc}
			title='Email Body'
		/>
	);
});

const headerHeight = 60;
export default function Email({email, onToggle, maxHeight}: EmailProps) {
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

	const bodyHeight = useMemo(() => {
		return maxHeight - headerHeight;
	}, [maxHeight]);

	return (
		<AccordionItem
			className='flex flex-none flex-col w-full'
			style={{maxHeight: maxHeight}}
			open={false}
			onToggle={onToggle}
			header={
				<div
					style={{height: headerHeight}}
					className='flex-none w-full px-2 grid grid-cols-12 grid-rows-2 border-b bg-primary border-accent py-1.5 text-primary'>
					<div className={cx('col-span-9', HeaderItemsStyle)}>{getSender()}</div>
					<div className={cx('col-span-3 text-end', HeaderItemsStyle)}>{getDate()}</div>
					<div className={cx('col-span-12 text-sm', HeaderItemsStyle)}>{getSubject()}</div>
				</div>
			}>
			<div style={{height: bodyHeight}} className='w-full flex flex-grow bg-white'>
				<MemoIFrame srcDoc={email.Body ? email.Body : ''}></MemoIFrame>
			</div>
		</AccordionItem>
	);
}

type EmailProps = {
	email: EmailModel;
	onToggle?: (isOpen: boolean) => void;
	maxHeight: number;
};
