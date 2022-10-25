import {EmailModel} from '../../models/EmailModel';
import {ImapDataModel} from '@/shared/emails/models/ImapDataModel';

/**
 * Fetches emails from the server.
 * @param startIndex The index of the first email to fetch. The first email has index 0
 * @param stopIndex The index of the last email to fetch
 * @param imapData The IMAP data to use to connect to the server
 */
export async function fetchEmails(
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
