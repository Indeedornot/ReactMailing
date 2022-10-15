import React from 'react';
import {css} from 'twin.macro';

export function ButtonHeader(props: ButtonHeaderProps) {
	const {header, onClick} = props;
	const buttonStyleless = css`
		background: none;
		color: inherit;
		border: none;
		padding: 0;
		font: inherit;
		cursor: pointer;
		outline: inherit;
		text-align: left;
	`;

	return (
		<button onClick={onClick} className={'h-full w-full p-0 m-0'} css={buttonStyleless}>
			{header}
		</button>
	);
}

type ButtonHeaderProps = {
	onClick: () => void;
	header: React.ReactNode;
};
