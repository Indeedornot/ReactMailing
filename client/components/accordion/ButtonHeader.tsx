import React from 'react';
import {css} from 'twin.macro';
import {buttonStyleless} from '@/styles/PublicStyles';

export function ButtonHeader(props: ButtonHeaderProps) {
	const {header, onClick} = props;

	return (
		<button onClick={onClick} className='h-full w-full p-0 m-0' css={buttonStyleless}>
			{header}
		</button>
	);
}

type ButtonHeaderProps = {
	onClick: () => void;
	header: React.ReactNode;
};
