import React, {HTMLAttributes} from 'react';
import {cx} from 'twind';

const DropdownItemGroupStyles = {
	Container: 'bg-primary border border-accent rounded-md min-w-32 absolute ease-in-out transition duration-150',
	Parent: 'transform scale-0 group-hover:scale-100 origin-top',
	NotParent: 'top-0 right-0 origin-top-left',
};

export default function DropdownGroup({children, parent = false, ...atr}: DropdownItemGroupProps) {
	return (
		<ul
			className={cx(
				DropdownItemGroupStyles.Container,
				parent ? DropdownItemGroupStyles.Parent : DropdownItemGroupStyles.NotParent
			)}
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
