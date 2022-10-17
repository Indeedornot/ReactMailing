import React, {HTMLAttributes} from 'react';
import tw, {css} from 'twin.macro';

export default function DropdownItemGroup({children, parent = false, ...atr}: DropdownItemGroupProps) {
	return (
		<ul
			className={`bg-primary border border-accent rounded-md min-w-32 absolute ease-in-out transition duration-150 
			${parent ? 'transform scale-0 group-hover:scale-100 origin-top' : 'top-0 right-0 origin-top-left'}`}
			css={css`
				& > :first-of-type {
					${tw`rounded-t-md`}
				}
				& > :last-of-type {
					${tw`rounded-b-md`}
				}
			`}
			{...atr}>
			{children}
		</ul>
		//<ul className='bg-white border rounded-sm min-w-32 absolute ease-in-out transition duration-150 '>
		//bg-white border rounded-sm transform scale-0 group-hover:scale-100 absolute transition duration-150 ease-in-out origin-top min-w-32
	);
}

type DropdownItemGroupProps = HTMLAttributes<HTMLUListElement> & {
	children: React.ReactNode;
	parent?: boolean;
};
