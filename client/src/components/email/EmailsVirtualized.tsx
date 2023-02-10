import React, {HTMLAttributes} from 'react';
import {EmailModel} from '@/shared/models/EmailModel';
import {Virtuoso} from 'react-virtuoso';
import Email from './Email';
import cx from 'classnames';

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

const VirtuosoStyle = `h-full w-full`;
const MemoizedEmail = React.memo(Email);
const getMemoizedEmail = (index: number, email: EmailModel) => {
	return <MemoizedEmail email={email}></MemoizedEmail>;
};

export default function EmailsVirtualized({
	emails,
	loadNextPage,
	scrollbar = false,
	className,
}: EmailsVirtualizedProps) {
	const loadMore = (index: number) => {
		return loadNextPage(index);
	};

	return (
		<Virtuoso
			className={cx(VirtuosoStyle, !scrollbar && 'scrollbar_hidden', className)}
			data={emails}
			endReached={loadMore}
			overscan={25}
			itemContent={getMemoizedEmail}
			components={{
				Footer,
			}}
		/>
	);
}

type EmailsVirtualizedProps = HTMLAttributes<HTMLDivElement> & {
	// Array of items loaded so far.
	emails: EmailModel[];
	// Callback function responsible for loading the next page of items.
	loadNextPage: (index: number) => void;
	scrollbar?: boolean;
};
