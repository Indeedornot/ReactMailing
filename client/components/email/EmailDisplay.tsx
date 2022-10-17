import {EmailModel} from '@/shared/emails/models/EmailModel';
import Dropdown from '@/components/dropdown/Dropdown';
import {FaSort} from 'react-icons/fa';
import DropdownItem from '@/components/dropdown/DropdownItem';
import {MdRestartAlt} from 'react-icons/md';
import {EmailList} from '@/components/email/EmailList';

export default function EmailDisplay({emails, refreshEmails, sortEmails, flush = false}: EmailTabProps) {
	const sortBy = (by: keyof EmailModel) => {
		sortEmails && sortEmails(by);
	};
	const refresh = () => {
		refreshEmails && refreshEmails();
	};

	return (
		<div className='h-full w-full flex flex-col'>
			<div
				className={`
								flex flex-grow-0 flex-shrink-0
                w-full py-3.5 ${!flush && 'rounded-t-lg'}
                bg-primary
                border-b-2 border-accent`}>
				<div className='h-full w-full grid grid-rows-1 grid-cols-12 px-3 text-font-primary'>
					<div className='flex col-start-1'>
						<Dropdown header={<FaSort />}>
							<DropdownItem>
								<button className='text-start w-full' onClick={() => sortBy('SenderName')}>
									By Sender
								</button>
							</DropdownItem>
							<DropdownItem>
								<button className='text-start w-full' onClick={() => sortBy('Subject')}>
									By Subject
								</button>
							</DropdownItem>
							<DropdownItem>
								<button className='text-left w-full' onClick={() => sortBy('Date')}>
									By Date
								</button>
							</DropdownItem>
						</Dropdown>
					</div>
					<button className='flex justify-self-end col-start-12' onClick={() => refresh()}>
						<MdRestartAlt />
					</button>
					{/*<button className='col-span-3' css={buttonStyleless} onClick={() => dispatch(sortEmails('SenderName'))}>
						From
					</button>
					<button className='col-span-6' css={buttonStyleless} onClick={() => dispatch(sortEmails('Subject'))}>
						Subject
					</button>
					<button className='col-span-3' css={buttonStyleless} onClick={() => dispatch(sortEmails('Date'))}>
						Date
					</button>*/}
				</div>
			</div>
			<EmailList emails={emails} scrollbar={false} className='rounded-b-md' />
		</div>
	);
}

type EmailTabProps = {
	emails: EmailModel[];
	refreshEmails?: () => void;
	sortEmails?: (sortType: keyof EmailModel) => any;
	flush?: boolean;
};
