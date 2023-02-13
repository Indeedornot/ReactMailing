import React from 'react';
import {ButtonHeader} from '@/components/accordion/ButtonHeader';
import useCollapse from 'react-collapsed';
import cx from 'classnames';

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
			<div className={cx('items-center w-full bg-primary transition text-font-primary', className)}>
				<ButtonHeader onClick={toggleOpen} header={header} />
			</div>
			<div {...getCollapseProps()}>
				<div className='bg-primary text-font-primary w-full h-full'>{children}</div>
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
