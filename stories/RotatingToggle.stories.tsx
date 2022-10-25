import React from 'react';
import {ComponentMeta} from '@storybook/react';

import RotatingToggle from '../client/components/animated/RotatingToggle';

const disabled = {
	buttonColor: {
		table: {
			disable: true,
		},
	},
	iconColor: {
		table: {
			disable: true,
		},
	},
	callback: {
		table: {
			disable: true,
		},
	},
	degrees: {
		table: {
			disable: true,
		},
	},
};
const argTypes = {
	buttonColorOn: {
		control: {
			type: 'color',
		},
	},
	buttonColorOff: {
		control: {
			type: 'color',
		},
	},
	iconColorOn: {
		control: {
			type: 'color',
		},
	},
	iconColorOff: {
		control: {
			type: 'color',
		},
	},
	degreesOn: {
		control: {
			type: 'number',
		},
	},
	degreesOff: {
		control: {
			type: 'number',
		},
	},
};

type argType = {
	buttonColorOn: string;
	buttonColorOff: string;
	iconColorOn: string;
	iconColorOff: string;
	degreesOn: number;
	degreesOff: number;
	initialState: boolean;
};

export default {
	title: 'Components/RotatingToggle',
	component: RotatingToggle,
	argTypes: {
		...argTypes,
		...disabled,
	},
} as ComponentMeta<typeof RotatingToggle>;

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
const Template = (args: argType) => (
	<RotatingToggle
		degrees={{on: args.degreesOn, off: args.degreesOff}}
		buttonColor={{on: args.buttonColorOn, off: args.buttonColorOff}}
		iconColor={{on: args.iconColorOn, off: args.iconColorOff}}
		initialState={args.initialState}
	/>
);

export const Default = Template.bind({});
Default.args = {
	degreesOff: 0,
	degreesOn: 90,
	buttonColorOn: '#4A3AFF',
	buttonColorOff: '#FFFFFF',
	iconColorOn: '#FFFFFF',
	iconColorOff: '#4A3AFF',
	initialState: false,
};
