import React, {HTMLAttributes} from 'react';
import {ButtonHeader} from '@/components/accordion/ButtonHeader';
import useCollapse from 'react-collapsed';

export default function AccordionItem(props: AccordionItemProps) {
	const {children, header, open = false, onToggle} = props;

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

	return (
		<div>
			<div className='items-center w-full bg-primary transition text-font-primary'>
				<ButtonHeader onClick={() => setExpanded((expanded) => !expanded)} header={header} />
			</div>
			<div {...getCollapseProps()}>
				<div className='bg-primary text-font-primary w-full h-full'>{children}</div>
			</div>
		</div>
	);
}

type AccordionItemProps = HTMLAttributes<HTMLDivElement> & {
	children: React.ReactNode;
	header: React.ReactNode;
	open?: boolean;
	onToggle?: (isOpen: boolean) => void;
};

export const MemoAccordionItem = React.memo(AccordionItem);
