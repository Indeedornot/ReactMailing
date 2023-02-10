import {EmailModel} from '@/shared/models/EmailModel';
import Dropdown from '@/components/dropdown/Dropdown';
import {FaSort} from 'react-icons/fa';
import DropdownItem from '@/components/dropdown/DropdownItem';
import {MdRestartAlt} from 'react-icons/md';
import React, {HTMLAttributes} from 'react';
import cx from 'classnames';

const ContainerStyle = 'h-full w-full flex flex-col';

export default function EmailDisplay({refreshEmails, sortEmails, children, flush = false, className}: EmailTabProps) {
	const sortBy = (by: keyof EmailModel) => {
		sortEmails && sortEmails(by);
	};
	const refresh = () => {
		refreshEmails && refreshEmails();
	};

	return (
		<div className='h-full w-full flex flex-col'>
			<div className={cx(ContainerStyle, !flush && 'rounded-t-lg', className)}>
				<div className='grid grid-cols-12 w-full py-2 px-4 bg-primary border-b-2 border-accent text-font-primary'>
					<div className='flex self-center justify-self-center'>
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
					<button className='flex col-start-12 self-center justify-self-center w-fit' onClick={() => refresh()}>
						<MdRestartAlt />
					</button>
				</div>
				{children}
			</div>
		</div>
	);
}

type EmailTabProps = HTMLAttributes<HTMLDivElement> & {
	children: React.ReactNode;
	refreshEmails?: () => void;
	sortEmails?: (sortType: keyof EmailModel) => any;
	flush?: boolean;
};
