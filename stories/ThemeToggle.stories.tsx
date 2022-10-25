import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';

import {FaReact, FaAngular, FaVuejs} from 'react-icons/fa';

import RotatingIcon from '../client/components/animated/RotatingIcon';
import {ThemeToggle} from '../client/components/theme/ThemeToggle';

export default {
	title: 'Components/ThemeToggle',
	component: ThemeToggle,
} as ComponentMeta<typeof RotatingIcon>;

const Template: ComponentStory<typeof ThemeToggle> = (args) => <ThemeToggle {...args} />;

export const Default = Template.bind({});
Default.args = {};
