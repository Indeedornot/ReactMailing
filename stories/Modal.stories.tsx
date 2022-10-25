import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';

import {FaReact, FaAngular, FaVuejs} from 'react-icons/fa';

import RotatingIcon from '../client/components/animated/RotatingIcon';
import Modal from '../client/components/modal/Modal';

export default {
	title: 'Components/Modal',
	component: Modal,
};

const Template = (args) => <Modal {...args} />;

export const Default = Template.bind({});
Default.args = {};
