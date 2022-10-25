import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';

import AccordionItem, {MemoAccordionItem} from '../client/components/accordion/AccordionItem';

import {setup} from 'twind';
import {sharedConfig} from '../client/styles/Twind.config';

setup(sharedConfig);

export default {
	title: 'Components/AccordionItem',
	component: AccordionItem,
	argTypes: {
		children: {
			control: {
				type: 'text',
			},
		},
		header: {
			control: {
				type: 'text',
			},
		},
		headerType: {
			control: {
				type: 'select',
			},
		},
		memo: {
			control: {
				type: 'boolean',
			},
		},
	},
} as ComponentMeta<typeof AccordionItem>;

const Template: ComponentStory<typeof AccordionItem> = (args: {
	children: string;
	header: string;
	headerType: string;
	memo: boolean;
}) => {
	if (!args.memo)
		return (
			<AccordionItem header={args.header} headerType={args.headerType}>
				{args.children}
			</AccordionItem>
		);
	else
		return (
			<MemoAccordionItem header={args.header} headerType={args.headerType}>
				{args.children}
			</MemoAccordionItem>
		);
};

export const Default = Template.bind({});
Default.args = {
	children: 'Accordion Item Child',
	header: 'Accordion Item Header',
	memo: false,
};
// Path: stories\AccordionItem.stories.tsx
