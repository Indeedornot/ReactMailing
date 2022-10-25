import {EmailModel} from '@/shared/emails/models/EmailModel';
import {HTMLAttributes} from 'react';
import Email from '@/components/email/Email';
import {scrollBarless} from '@/styles/PublicStyles';
import {cx} from 'twind';

const EmailListStyle = 'flex flex-auto flex-col w-full overflow-y-auto';
export function EmailList({emails, scrollbar, flush, className, ...atr}: EmailListProps) {
	return (
		<div className={cx(EmailListStyle, !scrollbar && scrollBarless, className)} {...atr}>
			{emails && emails.map((email, index) => <Email key={index} flush={flush} email={email} />)}
		</div>
	);
}

type EmailListProps = HTMLAttributes<HTMLDivElement> & {
	emails: EmailModel[];
	scrollbar: boolean;
	flush: boolean;
};
