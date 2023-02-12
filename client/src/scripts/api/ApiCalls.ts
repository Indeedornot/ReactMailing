import {EmailModel} from '@/shared/models/EmailModel';
import {ImapDataModel} from '@/shared/models/ImapDataModel';
import {SequenceSet} from '@/shared/models/SequenceSet';

const ApiBaseUrl = 'http://localhost:5000';

const ApiRoutes = {
	getEmails: ApiBaseUrl + '/getEmails',
};

/**
 * Fetches emails from the server.
 * @param startIndex The index of the first email to fetch. The first email has index 0
 * @param stopIndex The index of the last email to fetch
 * @param imapData The IMAP data to use to connect to the server
 * @returns The fetched emails
 */
export async function fetchEmailsApi(sequenceSet: SequenceSet, imapData: ImapDataModel): Promise<EmailModel[]> {
	console.log(
		'fetchEmails',
		JSON.stringify({
			sequenceSet,
			imapData,
		})
	);

	return fetch(ApiRoutes.getEmails, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			range: sequenceSet,
			imapData,
		}),
	}).then((emails) => {
		return emails.json();
	});
}
