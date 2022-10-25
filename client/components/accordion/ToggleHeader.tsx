import RotatingToggle from '@/components/animated/RotatingToggle';
import React from 'react';

const ToggleHeaderStyles = {
	Container: 'h-full w-full p-0 m-0 grid grid-cols-12',
	Header: {
		Container: 'col-span-10 h-full',
		Content: 'flex items-center h-full w-full',
	},
	Body: {
		Container: 'col-span-2 flex justify-center items-center',
		Content: 'flex justify-center items-center h-2/3 w-2/3',
	},
};

export function ToggleHeader({header, initialState, onClick}: ToggleHeaderProps) {
	return (
		<div className={ToggleHeaderStyles.Container}>
			<div className={ToggleHeaderStyles.Header.Container}>
				<div className={ToggleHeaderStyles.Header.Content}>{header}</div>
			</div>
			<div className={ToggleHeaderStyles.Body.Container}>
				<div className={ToggleHeaderStyles.Body.Content}>
					<RotatingToggle initialState={initialState} onClick={onClick} />
				</div>
			</div>
		</div>
	);
}

type ToggleHeaderProps = {
	header: React.ReactNode;
	initialState: boolean;
	onClick: () => void;
};
