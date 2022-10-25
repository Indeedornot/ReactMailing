import React, {HTMLAttributes} from 'react';
import {ToggleHeader} from '@/components/accordion/ToggleHeader';
import {ButtonHeader} from '@/components/accordion/ButtonHeader';
import useCollapse from 'react-collapsed';
import {cx} from 'twind';

const AccordionItemStyles = {
	Header: {
		Container: 'items-center w-full bg-primary transition text-font-primary',
		ContainerRounded: 'first:rounded-t-lg px-5',
	},
	Body: {
		Container: 'bg-primary text-font-primary w-full h-full',
		ContainerRounded: 'last:rounded-b-lg px-5 py-2',
	},
};

//TODO: Block AccordionItem from being used when animation is set to true
export default function AccordionItem(props: AccordionItemProps) {
	const {children, header, headerType = 'button', open = false, flush = false, onToggle, ...atr} = props;

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

	const Header =
		headerType == 'button' ? (
			<ButtonHeader onClick={() => setExpanded((expanded) => !expanded)} header={header} />
		) : (
			<ToggleHeader initialState={open} onClick={() => setExpanded((expanded) => !expanded)} header={header} />
		);

	// eslint-disable-next-line react/display-name
	const AccordionHeader = React.forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>((props, ref) => {
		const {children, className, ...atr} = props;
		return (
			<div
				ref={ref}
				className={cx(
					AccordionItemStyles.Header.Container,
					!flush && AccordionItemStyles.Header.ContainerRounded,
					className
				)}
				{...atr}>
				{children}
			</div>
		);
	});

	const AccordionBody = ({children}: {children: React.ReactNode}) => {
		return (
			<div className={cx(AccordionItemStyles.Body.Container, !flush && AccordionItemStyles.Body.ContainerRounded)}>
				{children}
			</div>
		);
	};

	return (
		<div>
			<AccordionHeader {...atr}>{Header}</AccordionHeader>
			<div {...getCollapseProps()}>
				<AccordionBody>{children}</AccordionBody>
			</div>
		</div>
	);
}

type AccordionItemProps = HTMLAttributes<HTMLDivElement> & {
	children: React.ReactNode;
	header: React.ReactNode;
	headerType?: 'button' | 'toggle';
	open?: boolean;
	flush?: boolean;
	onToggle?: (isOpen: boolean) => void;
};

export const MemoAccordionItem = React.memo(AccordionItem);
