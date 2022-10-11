import tw, {css} from 'twin.macro';

import React from 'react';

import EmailTab from '@/components/email/EmailTab';
import {EmailModel} from '@/components/email/EmailModel';

export default function App() {
    const emails: EmailModel[] = [
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

    return (
        <div className='flex items-center justify-center'>
            <div className='App' css={css`
                  height: 896px;
                  width: 414px;
        
                  ${tw`bg-white dark:bg-gray-900`}
                `}>
                <div className='h-full'>
                    <div className='h-1/3 w-full'>

                    </div>
                    <div className='h-2/3 w-full flex justify-center'>
                        <div className='w-11/12'>
                            <EmailTab emails={emails}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
