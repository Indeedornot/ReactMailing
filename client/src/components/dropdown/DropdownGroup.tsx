import React, {HTMLAttributes} from 'react';
import cx from 'classnames';

const DropdownItemGroupStyles = {
	Container: 'bg-primary border border-accent rounded-md min-w-32 absolute ease-in-out transition duration-150',
	Parent: 'transform scale-0 group-hover:scale-100 origin-top',
	NotParent: 'top-0 right-0 origin-top-left',
};

export default function DropdownGroup({children, parent = false}: DropdownItemGroupProps) {
	return (
		<ul
			className={cx(
				DropdownItemGroupStyles.Container,
				parent ? DropdownItemGroupStyles.Parent : DropdownItemGroupStyles.NotParent
			)}>
			{children}
		</ul>
	);
}

type DropdownItemGroupProps = HTMLAttributes<HTMLUListElement> & {
	children: React.ReactNode;
	parent?: boolean;
};
