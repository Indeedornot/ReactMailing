import React from 'react';

export default function DropdownGroupParent({children}: DropdownItemGroupProps) {
	return (
		<button className='w-full text-left flex items-center outline-none focus:outline-none text-primary'>
			<span className='pr-1 flex-1'>{children}</span>
			<span className='mr-auto'>
				<svg
					className='fill-current h-4 w-4 transition duration-150 ease-in-out'
					xmlns='http://www.w3.org/2000/svg'
					viewBox='0 0 20 20'>
					<path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
				</svg>
			</span>
		</button>
	);
}

type DropdownItemGroupProps = {
	children: React.ReactNode | string;
};
