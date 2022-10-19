import React from 'react';
import Email from "../client/components/email/Email";
import {EmailModel} from "../shared/emails/models/EmailModel";

export default {
    title: 'Components/Email',
    component: Email,
    argTypes: {
        email: {
            control: {
                type: 'object',
            },
        },
        flush: {
            control: {
                type: 'boolean',
            },
        },
    },
};

const Template = (args: {email: object; flush: boolean}) => {
    return <Email flush={args.flush} email={JSON.parse(JSON.stringify(args.email)) as EmailModel} />;
};
export const Default = Template.bind({});

Default.args = {
    email: {
        id: '1',
        SenderName: 'Sender 1',
        SenderEmail: 'g@.pl',
        Subject: 'Subject 1',
        Date: 'Date 1',
        Body: 'Body 1',
    } as EmailModel,
    flush: true,
};
