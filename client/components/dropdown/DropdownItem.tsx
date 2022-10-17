import React, {HTMLAttributes} from 'react';

export default function DropdownItem({children, parent = false, ...atr}: DropdownProps) {
	{
		/*rounded-sm*/
	}
	return (
		<li className={`px-3 py-1 hover:bg-accent text-font-primary bg-primary ${parent && 'relative'}`} {...atr}>
			{children}
		</li>
	);
}

type DropdownProps = HTMLAttributes<HTMLLIElement> & {
	children: React.ReactNode;
	parent?: boolean;
};
