import React, {HTMLAttributes} from 'react';
import {EmailModel} from '@/shared/emails/models/EmailModel';
import {Virtuoso} from 'react-virtuoso';
import Email from './Email';
import {scrollBarless} from '@/styles/PublicStyles';
import {cx} from 'twind';

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

export default function EmailsVirtualized({
	emails,
	loadNextPage,
	scrollbar = false,
	className,
	...atr
}: EmailsVirtualizedProps) {
	const loadMore = (index: number) => {
		return loadNextPage(index);
	};

	const MemoizedEmail = React.memo(Email);
	return (
		<Virtuoso
			className={cx(VirtuosoStyle, !scrollbar && scrollBarless, className)}
			data={emails}
			endReached={loadMore}
			overscan={25}
			itemContent={(index, email) => {
				return <MemoizedEmail email={email} flush={true}></MemoizedEmail>;
			}}></Virtuoso>
	);
}

type EmailsVirtualizedProps = HTMLAttributes<HTMLDivElement> & {
	// Array of items loaded so far.
	emails: EmailModel[];
	// Callback function responsible for loading the next page of items.
	loadNextPage: (index: number) => void;
	scrollbar?: boolean;
};
