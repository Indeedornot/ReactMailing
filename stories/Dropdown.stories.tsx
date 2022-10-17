import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';

import Dropdown from '../client/components/dropdown/Dropdown';
import DropdownItem from '../client/components/dropdown/DropdownItem';
import DropdownItemGroup from '../client/components/dropdown/DropdownItemGroup';
import DropdownGroupHover from '../client/components/dropdown/DropdownGroupHover';
import {PayloadAction} from '@reduxjs/toolkit';
import {EmailModel, EmailModelSortArgs} from '../shared/emails/models/EmailModel';
import {sort} from '../client/scripts/sort';

export default {
	title: 'Components/Dropdown',
	component: Dropdown,
	argTypes: {
		children: {
			control: {
				type: 'object',
			},
		},
		header: {
			control: {
				type: 'text',
			},
			type: {
				required: false,
			},
		},
	},
};

type argType = {
	children: object;
	header: string;
};

const Template = (args: argType) => {
	return <Dropdown header={args.header}>{args.children && deconstructArray(Object.values(args.children))}</Dropdown>;
};
export const Default = Template.bind({});
Default.args = {
	children: {
		'1': 1,
		'2': 2,
		'3': {
			'0': 3,
			'1': 1,
			'2': 2,
		},
		'4': 4,
	},
	header: (
		<button className='outline-none focus:outline-none border-accent border px-3 py-1 bg-primary rounded-md flex items-center min-w-32 text-font-primary'>
			<span className='pr-1 font-semibold flex-1'>Dropdown</span>
			<span>
				<svg
					className='fill-current h-4 w-4 transform group-hover:-rotate-180
        transition duration-150 ease-in-out'
					xmlns='http://www.w3.org/2000/svg'
					viewBox='0 0 20 20'>
					<path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
				</svg>
			</span>
		</button>
	),
};

const deconstructArray = (array: any[]) => {
	const items = [];
	for (let i = 0; i < array.length; i++) {
		if (typeof array[i] !== 'object') {
			items.push(<DropdownItem>{array[i]}</DropdownItem>);
		} else {
			const childArray = Object.values(array[i]);
			console.log(childArray);
			items.push(
				<DropdownItem parent={true}>
					<DropdownGroupHover>{childArray[0]}</DropdownGroupHover>
					<DropdownItemGroup>{deconstructArray(childArray.splice(1))}</DropdownItemGroup>
				</DropdownItem>
			);
		}
	}
	return items;
};
