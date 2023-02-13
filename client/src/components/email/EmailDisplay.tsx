import {EmailModelSortArgs} from '@/shared/models/EmailModel';
import Dropdown from '@/components/dropdown/Dropdown';
import {FaSort} from 'react-icons/fa';
import DropdownItem from '@/components/dropdown/DropdownItem';
import {MdRestartAlt} from 'react-icons/md';
import {useContext, useEffect, useState} from 'react';
import EmailsVirtualized from './EmailsVirtualized';
import {EmailContext} from '@/context/EmailsContext';

export default function EmailDisplay() {
	const {emails, loadNextPage, isFetching, refreshEmails, sortEmailsBy} = useContext(EmailContext);

	const sortBy = (by: EmailModelSortArgs) => {
		sortEmailsBy(by);
	};

	const [showList, setShowList] = useState(false);

	useEffect(() => {
		const show = emails.length > 0 || isFetching;
		setShowList(show);
	}, [emails, isFetching]);

	return (
		<div className='h-full w-full flex flex-col overflow-y-hidden'>
			{/* Header */}
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
				<button className='flex col-start-12 self-center justify-self-center w-fit' onClick={refreshEmails}>
					<MdRestartAlt />
				</button>
			</div>
			{/* Body */}
			{showList && <EmailsVirtualized loadNextPage={loadNextPage} emails={emails} />}
		</div>
	);
}
