import React from 'react';
import {buttonStyleless} from '@/styles/PublicStyles';
import {cx} from 'twind';

const ButtonHeaderStyle = cx('h-full w-full p-0 m-0', buttonStyleless);

export function ButtonHeader(props: ButtonHeaderProps) {
	const {header, onClick} = props;

	return (
		<button onClick={onClick} className={ButtonHeaderStyle}>
			{header}
		</button>
	);
}

type ButtonHeaderProps = {
	onClick: () => void;
	header: React.ReactNode;
};
