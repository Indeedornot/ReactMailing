import AccordionItem from '@/components/accordion/AccordionItem';
import {css} from 'twin.macro';
import {EmailModel} from '@/shared/emails/models/EmailModel';
import {HTMLAttributes} from 'react';
import cx from 'classnames';
import Email from '@/components/email/Email';
import {scrollBarless} from '@/styles/PublicStyles';

export function EmailList({emails, scrollbar, flush, className, ...atr}: EmailListProps) {
	return (
		<div
			className={cx('flex flex-auto flex-col w-full overflow-y-auto', className)}
			css={!scrollbar && scrollBarless}
			{...atr}>
			{emails && emails.map((email, index) => <Email key={index} flush={flush} email={email} />)}
		</div>
	);
}

type EmailListProps = HTMLAttributes<HTMLDivElement> & {
	emails: EmailModel[];
	scrollbar: boolean;
	flush: boolean;
};
