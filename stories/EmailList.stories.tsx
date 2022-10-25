import React from 'react';
import {EmailModel} from '../shared/emails/models/EmailModel';
import {EmailList} from '../client/components/email/EmailList';

export default {
	title: 'Components/EmailList',
	component: EmailList,
	argTypes: {
		emails: {
			control: {
				type: 'object',
			},
		},
		scrollbar: {
			control: {
				type: 'boolean',
			},
		},
		flush: {
			control: {
				type: 'boolean',
			},
		},
	},
};

const Template = (args: {emails: object; scrollbar: boolean; flush: boolean}) => {
	const parsedEmails = JSON.parse(JSON.stringify(args.emails)) as EmailModel[];

	return <EmailList emails={parsedEmails} scrollbar={args.scrollbar} flush={args.flush} />;
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
	scrollbar: false,
	flush: true,
};
