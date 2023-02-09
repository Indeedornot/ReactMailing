import DropdownGroup from '@/components/dropdown/DropdownGroup';
import React, {HTMLAttributes} from 'react';
import cx from 'classnames';
import './Dropdown.css';

export default function Dropdown({children, header, className, ...atr}: DropdownProps) {
	return (
		<div className={cx('group inline-block z-[1]', className)} {...atr}>
			{header}
			<DropdownGroup parent={true}>{children}</DropdownGroup>
		</div>
	);
}

type DropdownProps = HTMLAttributes<HTMLDivElement> & {
	children: React.ReactNode;
	header: React.ReactNode;
};
