import React from 'react';
import {ComponentMeta} from '@storybook/react';

import {LoginButton} from '../client/components/Login/LoginButton';
export default {
	title: 'Components/LoginButton',
	component: LoginButton,
} as ComponentMeta<typeof LoginButton>;

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
const Template = (args: argType) => <LoginButton />;

export const Default = Template.bind({});
Default.args = {};
