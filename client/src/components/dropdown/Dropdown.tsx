import DropdownGroup from '@/components/dropdown/DropdownGroup';
import React, {HTMLAttributes} from 'react';
import './Dropdown.css';

export default function Dropdown({children, header}: DropdownProps) {
	return (
		<div className='group inline-block z-[1]'>
			{header}
			<DropdownGroup parent={true}>{children}</DropdownGroup>
		</div>
	);
}

type DropdownProps = HTMLAttributes<HTMLDivElement> & {
	children: React.ReactNode;
	header: React.ReactNode;
};
