import {css, styled} from 'twin.macro';

export const buttonStyleless = css`
	background: none;
	color: inherit;
	border: none;
	padding: 0;
	font: inherit;
	cursor: pointer;
	outline: inherit;
	text-align: inherit;
`;

export const scrollBarless = css`
	scrollbar-width: none;
	-ms-overflow-style: none;

	&::-webkit-scrollbar {
		width: 0;
		height: 0;
	}
`;
