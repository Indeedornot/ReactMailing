import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';

import {FaReact, FaAngular, FaVuejs} from 'react-icons/fa';

import RotatingIcon from '../client/components/animated/RotatingIcon';

export default {
	title: 'Components/RotatingIcon',
	component: RotatingIcon,
	argTypes: {
		children: {
			options: ['React', 'Angular', 'Vue'],
			mapping: {
				React: <FaReact />,
				Angular: <FaAngular />,
				Vue: <FaVuejs />,
			},
		},
		from: {
			control: {
				type: 'number',
			},
		},
		to: {
			control: {
				type: 'number',
			},
		},
		time: {
			control: {
				type: 'number',
			},
		},
		alternate: {
			control: {
				type: 'boolean',
			},
		},
	},
} as ComponentMeta<typeof RotatingIcon>;

const Template: ComponentStory<typeof RotatingIcon> = (args) => <RotatingIcon {...args} />;

export const Default = Template.bind({});
Default.args = {
	children: <FaReact />,
	from: 0,
	to: 360,
	time: 2,
	alternate: false,
};
