import React from 'react';
import useCollapse from 'react-collapsed';

export default function AccordionItem(props: AccordionItemProps) {
	const {children, header, open = false, onToggle, className} = props;

	const {getCollapseProps, setExpanded} = useCollapse({
		duration: 300,
		onCollapseEnd: () => {
			onToggle && onToggle(false);
		},
		onExpandEnd: () => {
			onToggle && onToggle(true);
		},
		defaultExpanded: open,
	});

	const toggleOpen = () => {
		setExpanded((open) => !open);
	};

	return (
		<div>
			<button onClick={toggleOpen} className='h-full w-full p-0 m-0 button_styleless'>
				{header}
			</button>
			<div {...getCollapseProps()}>
				<div>{children}</div>
			</div>
		</div>
	);
}

type AccordionItemProps = {
	children: React.ReactNode;
	header: React.ReactNode;
	open?: boolean;
	onToggle?: (isOpen: boolean) => void;
	className?: string;
};
