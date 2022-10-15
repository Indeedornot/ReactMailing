import React, {createRef, HTMLAttributes, useEffect, useState} from 'react';
import tw, {css} from 'twin.macro';
import {ToggleHeader} from '@/components/accordion/ToggleHeader';
import {ButtonHeader} from '@/components/accordion/ButtonHeader';

import styled from '@emotion/styled';

export default function AccordionItem(props: AccordionItemProps) {
	const {
		children = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
		header = 'This is an accordion header example',
		headerType = 'button',
		open = false,
		flush = false,
		...atr
	} = props;

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

	const AccordionHeader = styled.div`
		${!flush && tw`px-5`}

		${tw`		flex flex-grow-0 flex-shrink items-center w-full h-full
            bg-indigo-50 dark:bg-gray-900
            dark:text-blue-50
            transition 
		`}
	`;

	const AccordionCollapse = styled.div`
		transition: max-height 0.3s ease-out, padding 0.3s ease;
		${open ? 'max-height: 100%' : 'max-height: 0px'};

		${tw`overflow-hidden flex-shrink-0 flex-grow-0 flex`}
	`;
	const AccordionBody = styled.div`
		${tw`
            pt-2 pb-3.5
            bg-white dark:bg-gray-800 
            dark:text-blue-50
            w-full h-full
    `}

		${!flush && tw`px-5`}
	`;

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
	children?: React.ReactNode;
	header?: React.ReactNode;
	headerType?: 'button' | 'toggle';
	open?: boolean;
	flush?: boolean;
};
