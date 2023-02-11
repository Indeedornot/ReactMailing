import {EmailModel} from '@/shared/models/EmailModel';
import {ImapDataModel} from '@/shared/models/ImapDataModel';

/**
 * Fetches emails from the server.
 * @param startIndex The index of the first email to fetch. The first email has index 0
 * @param stopIndex The index of the last email to fetch
 * @param imapData The IMAP data to use to connect to the server
 * @returns The fetched emails
 */
export async function fetchEmailsApi(
	startIndex: number,
	stopIndex: number,
	imapData: ImapDataModel
): Promise<EmailModel[]> {
	console.log('fetchEmails', startIndex, stopIndex, imapData);
	console.log(
		'fetchEmails',
		JSON.stringify({
			startIndex,
			stopIndex,
			imapData,
		})
	);
	return fetch('http://localhost:5000/getEmails', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			startIndex,
			stopIndex,
			imapData,
		}),
	}).then((emails) => {
		return emails.json();
	});
}

/**
 * Fetches emails from the server. Used for ease of use
 * @param from The amount of emails already fetched. The first email has index 0
 * @param emailCount The amount of emails to fetch
 * @param imapData The IMAP data to use to connect to the server
 * @returns The fetched emails
 */
export async function fetchEmails(from: number, emailCount: number, imapData: ImapDataModel): Promise<EmailModel[]> {
	return fetchEmailsApi(-from, -(from + emailCount), imapData);
}
