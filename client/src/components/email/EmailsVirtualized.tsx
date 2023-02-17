import React, {useRef} from 'react';
import {EmailModel} from '@/shared/models/EmailModel';
import {Virtuoso, VirtuosoHandle} from 'react-virtuoso';
import Email from './Email';
import cx from 'classnames';
import {emailsPerPage} from '@/context/EmailsContext';
import {useCallback} from 'react';

const Footer = () => {
	return (
		<div
			style={{
				padding: '2rem',
				display: 'flex',
				justifyContent: 'center',
			}}>
			Loading...
		</div>
	);
};

const MemoizedEmail = React.memo(Email);

export default function EmailsVirtualized({emails, loadNextPage, scrollbar = false}: EmailsVirtualizedProps) {
	const ref = useRef<HTMLDivElement>(null);

	const getMemoizedEmail = useCallback(
		(index: number, email: EmailModel) => {
			return <MemoizedEmail email={email} maxHeight={ref?.current?.clientHeight || 100}></MemoizedEmail>;
		},
		[ref]
	);

	return (
		<div ref={ref} className='w-full h-full'>
			<Virtuoso
				className={cx('h-full w-full', !scrollbar && 'scrollbar_hidden')}
				data={emails}
				endReached={loadNextPage}
				overscan={emailsPerPage}
				itemContent={(i, e) => getMemoizedEmail(i, e)}
				components={{
					Footer,
				}}
			/>
		</div>
	);
}

type EmailsVirtualizedProps = {
	// Array of items loaded so far.
	emails: EmailModel[];
	// Callback function responsible for loading the next page of items.
	loadNextPage: (index: number) => void;
	scrollbar?: boolean;
};
