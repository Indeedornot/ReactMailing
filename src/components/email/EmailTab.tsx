import {EmailModel} from '@/components/email/EmailModel';
import parse from 'html-react-parser';
import {sort} from '../../scripts/sort';
import tw, {css} from 'twin.macro';
import {useState} from 'react';
import AccordionItem from '@/components/accordion/AccordionItem';

export default function EmailTab(props: EmailTabProps) {
    const [emails, SetEmails] = useState([...props.emails]);
    const [sortedBy, setSorted] = useState('');

    const sortBy = (property: keyof EmailModel) => {
        console.log(sortedBy);
        if (sortedBy != property) {
            SetEmails(sort(emails, property));
            setSorted(property);
        } else {
            SetEmails(sort(emails, `-${property}`));
            setSorted(`-${property}`);
        }
    };

    const buttonStyleless = css`
      background: none;
      color: inherit;
      border: none;
      padding: 0;
      font: inherit;
      cursor: pointer;
      outline: inherit;
    `;

    const styles = {
        emailTab: css`
            ${tw``}
        `,
        emailTabHeader: css`
            ${tw`
                w-full py-3.5 rounded-t-lg
                bg-indigo-200 dark:bg-gray-900
                shadow-lg
                border-b-2 border-blue-400
            `}
        `,
        emailTabContent: css`
            ${tw`
                w-full rounded-b-lg bg-white shadow-lg
            `}    
        `,
        emailItem: css`
            ${tw`
                w-full border-b-2 border-blue-400
            `}
        `,
        emailItemHeader: css`
            ${tw`
                h-full w-full py-2.5
                grid grid-cols-12
                bg-white text-center
                border-b-2 border-green-400
            `}
        `,
        emailItemBody: css`
            ${tw`

            `}
        `,

    };
    return (
        <div className="emailTab" css={styles.emailTab}>
            <div className='emailTabHeader' css={styles.emailTabHeader}>
                    <div tw={'grid grid-cols-12 text-center'}>
                        <button
                            tw={'col-span-3'}
                            css={buttonStyleless}
                            onClick={() => sortBy('SenderName')}
                        >
                            From
                        </button>
                        <button
                            tw={'col-span-6'}
                            css={buttonStyleless}
                            onClick={() => sortBy('Subject')}
                        >
                            Subject
                        </button>
                        <button
                            tw={'col-span-3'}
                            css={buttonStyleless}
                            onClick={() => sortBy('Date')}
                        >
                            Date
                        </button>
                    </div>
            </div>
            <div css={styles.emailTabContent} className='emailTabContent'>
                {emails.map((email, index) => (
                    <AccordionItem key={index} css={styles.emailItem} flush={true} className='emailItem' open={false}
                    header={
                        <div key={index} className='emailItemHeader' css={styles.emailItemHeader}>
                            <div tw={'col-span-3 flex items-center justify-center'}>{email.SenderName}</div>
                            <div tw={'col-span-6 flex items-center justify-center'}>{email.Subject}</div>
                            <div tw={'col-span-3 flex items-center justify-center'}>{email.Date}</div>
                        </div>
                    }>
                        <div className='emailItemBody' css={styles.emailItemBody}>
                            {parse(email.Body)}
                        </div>
                    </AccordionItem>
                ))}
            </div>
        </div>
    );
}

type EmailTabProps = {
    emails: EmailModel[];
};
