import {ImapFlow} from 'imapflow';
import {EmailModel} from '@/shared/emails/models/EmailModel';
import {simpleParser} from 'mailparser';
import {privateCredentials} from './PrivateCredentials';

//useful
//https://afterlogic.com/mailbee-net/docs/MailBee.ImapMail.SystemMessageFlags.html

export async function getEmails(args: SequenceSet): Promise<EmailModel[]> {
	const emails: EmailModel[] = [];

	const client = new ImapFlow({
		host: privateCredentials.host,
		port: privateCredentials.port,
		secure: true,
		auth: {
			user: privateCredentials.username,
			pass: privateCredentials.password,
		},
		logger: false,
	});

	// Wait until client connects and authorizes
	await client.connect();

	// Select and lock a mailbox. Throws if mailbox does not exist
	const lock = await client.getMailboxLock('INBOX');
	try {
		if (args.from == 0) return [];
		if (args.from < 0) {
			if (args.to !== '*') return [];
			if (typeof client.mailbox === 'boolean') return [];
			const messageCount = client.mailbox.exists;
			args.from = messageCount + args.from + 1;
		}

		//let messages = client.fetch(`${from}:${to}`, {uid: true, envelope: true, bodyStructure: true, headers: true, bodyParts: ['']});
		const messages = client.fetch(`${args.from}:${args.to}`, {uid: true});
		const seqs: number[] = [];
		for await (const message of messages) {
			seqs.push(message.seq);
		}

		for await (const seq of seqs) {
			const {content} = await client.download(seq.toString());

			const parsed = await simpleParser(content);
			emails.push({
				SenderEmail: parsed.from?.value?.[0]?.address,
				Date: parsed.date?.toString(),
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

type SequenceSet = {from: number; to: number | string};
