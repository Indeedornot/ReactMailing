import React, {createRef, HTMLAttributes, useEffect, useState} from 'react';
import tw, {styled} from 'twin.macro';
import {ToggleHeader} from '@/components/accordion/ToggleHeader';
import {ButtonHeader} from '@/components/accordion/ButtonHeader';
import cx from 'classnames';

export default function AccordionItem(props: AccordionItemProps) {
	const {children, header, headerType = 'button', open = false, flush = false, ...atr} = props;

	const headerRef = createRef<HTMLDivElement>();
	const bodyRef = createRef<HTMLDivElement>();

	const [isOpen, setIsOpen] = useState(open);

	useEffect(() => {
		if (!bodyRef.current) return;
		const accordionContent = bodyRef.current;

		if (isOpen) accordionContent.style.maxHeight = `${accordionContent.scrollHeight + 32}px`;
		else accordionContent.style.maxHeight = '0px';
	}, [isOpen]);

	const getHeader = () => {
		switch (headerType) {
			case 'button':
				return <ButtonHeader onClick={() => setIsOpen(!isOpen)} header={header} />;
			case 'toggle':
				return <ToggleHeader header={header} initialState={isOpen} onClick={() => setIsOpen(!isOpen)} />;
		}
	};

	const AccordionItem = styled.div`
		${!flush &&
		`&:first-of-type {
			& > .accordion-header {
				${tw`rounded-t-lg`}
			}
		}

		&:last-of-type {
			& > .accordion-collapse > .accordion-body {
				${tw`rounded-b-lg`}
			}
		}`}

		${tw`flex flex-col`}
	`;

	// eslint-disable-next-line react/display-name
	const AccordionHeader = React.forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>((props, ref) => {
		const {children, className, ...atr} = props;
		return (
			<div
				ref={ref}
				className={cx(`${!flush && 'px-5'} flex flex-grow-0 flex-shrink items-center w-full bg-primary transition text-font-primary`, className)}
				{...atr}>
				{children}
			</div>
		);
	});
	const AccordionCollapse = styled.div`
		transition: max-height 0.3s ease-out, padding 0.3s ease;
		${open ? 'max-height: 100%' : 'max-height: 0px'};

		${tw`overflow-hidden flex-shrink-0 flex-grow-0 flex`}
	`;
	const AccordionBody = ({children}: {children: React.ReactNode}) => {
		return <div className={`${!flush && 'px-5 pt-2'} bg-primary text-font-primary w-full h-full`}>{children}</div>;
	};

	return (
		<AccordionItem>
			<AccordionHeader ref={headerRef} {...atr}>
				{getHeader()}
			</AccordionHeader>
			<AccordionCollapse ref={bodyRef}>
				<AccordionBody>{children}</AccordionBody>
			</AccordionCollapse>
		</AccordionItem>
	);
}

type AccordionItemProps = HTMLAttributes<HTMLDivElement> & {
	children: React.ReactNode;
	header: React.ReactNode;
	headerType?: 'button' | 'toggle';
	open?: boolean;
	flush?: boolean;
};
