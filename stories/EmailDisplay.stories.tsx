import React, {useState} from 'react';
import EmailDisplay from '../client/components/email/EmailDisplay';
import {EmailModel, EmailModelSortArgs} from '../shared/emails/models/EmailModel';
import {sort} from '../client/scripts/sort';
import {EmailList} from '../client/components/email/EmailList';

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
		setEmails(sort(emails, sortBy));
		sortedBy = sortBy;
	};

	return (
		<EmailDisplay flush={args.flush} sortEmails={sortEmails}>
			<EmailList emails={emails} scrollbar={false} flush={true} />
		</EmailDisplay>
	);
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
