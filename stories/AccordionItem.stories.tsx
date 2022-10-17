import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';

import AccordionItem from '../client/components/accordion/AccordionItem';

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
	},
} as ComponentMeta<typeof AccordionItem>;

const Template: ComponentStory<typeof AccordionItem> = (args) => <AccordionItem {...args} />;

export const Default = Template.bind({});
Default.args = {
	children: 'Accordion Item Child',
	header: 'Accordion Item Header',
};
// Path: stories\AccordionItem.stories.tsx
