import React from 'react';

export function DropdownButton({children}: {children: React.ReactNode}) {
	return (
		<button className='outline-none focus:outline-none border-accent border px-3 py-1 bg-primary rounded-md flex items-center min-w-32 text-font-primary'>
			<span className='pr-1 font-semibold flex-1'>{children}</span>
			<span>
				<svg
					className='fill-current h-4 w-4 transform group-hover:-rotate-180
        transition duration-150 ease-in-out'
					xmlns='http://www.w3.org/2000/svg'
					viewBox='0 0 20 20'>
					<path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
				</svg>
			</span>
		</button>
	);
}
