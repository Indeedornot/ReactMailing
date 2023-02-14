import React, {HTMLAttributes} from 'react';
import cx from 'classnames';

const DropdownItemStyle = 'px-3 py-1 hover:bg-accent text-primary bg-primary first:rounded-t-md last:rounded-b-md';

export default function DropdownItem({children, parent = false, ...atr}: DropdownProps) {
	return (
		<li className={cx(DropdownItemStyle, parent && 'relative')} {...atr}>
			{children}
		</li>
	);
}

type DropdownProps = {
	children: React.ReactNode;
	parent?: boolean;
};
