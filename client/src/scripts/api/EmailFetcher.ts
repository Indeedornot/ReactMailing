import {EmailModel} from '@/shared/models/EmailModel';
import {ImapDataModel} from '@/shared/models/ImapDataModel';
import {fetchEmailsApi} from './ApiCalls';

/**
 * Fetches emails from the server from latest to oldest.
 * @param from The amount of emails already fetched. The first email has index 0
 * @param emailCount The amount of emails to fetch
 * @param imapData The IMAP data to use to connect to the server
 * @returns The fetched emails
 */
export async function fetchEmails(from: number, emailCount: number, imapData: ImapDataModel): Promise<EmailModel[]> {
	const startIndex = from === 0 ? '*' : -from;
	const stopIndex = -(from + emailCount);
	return fetchEmailsApi({from: startIndex, to: stopIndex}, imapData);
}
