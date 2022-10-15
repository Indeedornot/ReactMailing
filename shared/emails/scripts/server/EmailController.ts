import {ImapFlow} from 'imapflow';
import {EmailModel} from '@/shared/emails/models/EmailModel';
import {simpleParser} from 'mailparser';

//useful
//https://afterlogic.com/mailbee-net/docs/MailBee.ImapMail.SystemMessageFlags.html

export async function getEmails(from: number, to: number): Promise<EmailModel[]> {
	const emails: EmailModel[] = [];

	const client = new ImapFlow({
		host: '',
		port: 993,
		secure: true,
		auth: {
			user: '',
			pass: '',
		},
		logger: false,
	});

	// Wait until client connects and authorizes
	await client.connect();

	// Select and lock a mailbox. Throws if mailbox does not exist
	const lock = await client.getMailboxLock('INBOX');
	try {
		//let messages = client.fetch(`${from}:${to}`, {uid: true, envelope: true, bodyStructure: true, headers: true, bodyParts: ['']});
		const messages = client.fetch(`${from}:${to}`, {uid: true});
		const seqs: number[] = [];
		for await (const message of messages) {
			seqs.push(message.seq);
		}

		for await (const seq of seqs) {
			//console.log(seq);
			const {content} = await client.download(seq.toString());

			const parsed = await simpleParser(content);
			emails.push({
				SenderEmail: parsed.from?.value?.[0]?.address,
				Date: parsed.date?.toDateString(),
				Subject: parsed.subject,
				Body: parsed.html ? parsed.html : parsed.textAsHtml,
				id: parsed.messageId,
				SenderName: parsed.from?.value?.[0]?.name,
			});
		}
	} finally {
		// Make sure lock is released, otherwise next `getMailboxLock()` never returns
		lock.release();
	}

	// log out and close connection
	await client.logout();

	return emails;
}
