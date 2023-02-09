import {EmailModel} from '@/shared/models/EmailModel';
import {HTMLAttributes} from 'react';
import Email from '@/components/email/Email';
import cx from 'classnames';

const EmailListStyle = 'flex flex-auto flex-col w-full overflow-y-auto';
export function EmailList({emails, scrollbar, flush, className, ...atr}: EmailListProps) {
	return (
		<div className={cx(EmailListStyle, !scrollbar && 'scrollbar_hidden', className)} {...atr}>
			{emails && emails.map((email, index) => <Email key={index} flush={flush} email={email} />)}
		</div>
	);
}

type EmailListProps = HTMLAttributes<HTMLDivElement> & {
	emails: EmailModel[];
	scrollbar: boolean;
	flush: boolean;
};
