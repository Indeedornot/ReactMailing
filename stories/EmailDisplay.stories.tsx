import React, {useState} from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import EmailDisplay from '../client/components/email/EmailDisplay';
import {EmailModel, EmailModelSortArgs} from '../shared/emails/models/EmailModel';
import {sort} from '../client/scripts/sort';

export default {
	title: 'Components/EmailDisplay',
	component: EmailDisplay,
	argTypes: {
		emails: {
			control: {
				type: 'object',
			},
		},
		flush: {
			control: {
				type: 'boolean',
			},
			type: {
				required: false,
			},
		},
	},
};

let sortedBy = '';
const Template = (args: {emails: object; flush: boolean}) => {
	const parsedEmails = JSON.parse(JSON.stringify(args.emails)) as EmailModel[];
	const [emails, setEmails] = useState(parsedEmails);
	const sortEmails = (by: keyof EmailModel) => {
		const sortBy: EmailModelSortArgs = sortedBy == by ? `-${by}` : by;
		console.log('New call');
		console.log(`Sorted by ${sortedBy}`);
		console.log(`Sorting by ${sortBy}`);
		setEmails(sort(emails, sortBy));
		sortedBy = sortBy;
		console.log(`Sorted by ${sortedBy}`);
	};

	return <EmailDisplay emails={emails} flush={args.flush} sortEmails={sortEmails} />;
};
export const Default = Template.bind({});

const sampleEmails = [
	{
		id: '1',
		SenderName: 'Sender 1',
		SenderEmail: 'Sender1@email.com',
		Subject: 'Subject 1',
		Date: 'Date 1',
		Body: 'Body 1',
	},
	{
		id: '2',
		SenderName: 'Sender 2',
		SenderEmail: 'Sender2@email.com',
		Subject: 'Subject 2',
		Date: 'Date 2',
		Body: 'Body 2',
	},
	{
		id: '3',
		SenderName: 'Sender 3',
		Subject: 'Subject 3',
		SenderEmail: 'Sender3@email.com',
		Date: 'Date 3',
		Body: 'Body 3',
	},
];

Default.args = {
	emails: sampleEmails,
};
