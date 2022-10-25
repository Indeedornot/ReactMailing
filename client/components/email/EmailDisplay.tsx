import {EmailModel} from '@/shared/emails/models/EmailModel';
import Dropdown from '@/components/dropdown/Dropdown';
import {FaSort} from 'react-icons/fa';
import DropdownItem from '@/components/dropdown/DropdownItem';
import {MdRestartAlt} from 'react-icons/md';
import React, {HTMLAttributes} from 'react';
import {cx} from 'twind';

const EmailDisplayStyles = {
	Container: 'h-full w-full flex flex-col',
	Header: {
		Container: 'grid grid-cols-12 w-full py-2 px-4 bg-primary border-b-2 border-accent text-font-primary',
		Dropdown: 'flex self-center justify-self-center',
		Restart: 'flex col-start-12 self-center justify-self-center w-fit',
	},
};
export default function EmailDisplay({
	refreshEmails,
	sortEmails,
	children,
	flush = false,
	className,
	...atr
}: EmailTabProps) {
	const sortBy = (by: keyof EmailModel) => {
		sortEmails && sortEmails(by);
	};
	const refresh = () => {
		refreshEmails && refreshEmails();
	};

	return (
		<div className='h-full w-full flex flex-col'>
			<div className={cx(EmailDisplayStyles.Container, !flush && 'rounded-t-lg', className)}>
				<div className={cx(EmailDisplayStyles.Header.Container)}>
					<div className={cx(EmailDisplayStyles.Header.Dropdown)}>
						<Dropdown header={<FaSort />}>
							<DropdownItem>
								<button onClick={() => sortBy('SenderName')}>By Sender</button>
							</DropdownItem>
							<DropdownItem>
								<button onClick={() => sortBy('Subject')}>By Subject</button>
							</DropdownItem>
							<DropdownItem>
								<button onClick={() => sortBy('Date')}>By Date</button>
							</DropdownItem>
						</Dropdown>
					</div>
					<button className={EmailDisplayStyles.Header.Restart} onClick={() => refresh()}>
						<MdRestartAlt />
					</button>
				</div>
				{children}
			</div>
			{/*<EmailList emails={emails} scrollbar={false} flush={true} className={`${!flush && `rounded-b-md`}`} />*/}
		</div>
	);
}

type EmailTabProps = HTMLAttributes<HTMLDivElement> & {
	children: React.ReactNode;
	refreshEmails?: () => void;
	sortEmails?: (sortType: keyof EmailModel) => any;
	flush?: boolean;
};
