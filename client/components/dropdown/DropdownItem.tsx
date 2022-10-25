import React, {HTMLAttributes} from 'react';
import {cx} from 'twind';

const DropdownItemStyle = 'px-3 py-1 hover:bg-accent text-font-primary bg-primary first:rounded-t-md last:rounded-b-md';

export default function DropdownItem({children, parent = false, ...atr}: DropdownProps) {
	{
		/*rounded-sm*/
	}
	return (
		<li className={cx(DropdownItemStyle, parent && 'relative')} {...atr}>
			{children}
		</li>
	);
}

type DropdownProps = HTMLAttributes<HTMLLIElement> & {
	children: React.ReactNode;
	parent?: boolean;
};
