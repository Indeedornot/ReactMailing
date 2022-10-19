import {EmailModel} from '../../models/EmailModel';
import {faker} from '@faker-js/faker';

/**
 * Fetches emails from the server.
 * @param startIndex The index of the first email to fetch. The first email has index 0. If fromLatest counts from the latest email.
 * @param stopIndex The index of the last email to fetch. If fromLatest counts from the latest email.
 * @param fromLatest Defaults to true
 */
export async function fetchEmails(startIndex: number, stopIndex: number, fromLatest = true): Promise<EmailModel[]> {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			const emails: EmailModel[] = [];
			for (let i = startIndex; i < stopIndex; i++) {
				emails.push({
					id: faker.datatype.uuid(),
					SenderEmail: faker.internet.email(),
					Subject: faker.lorem.sentence(),
					Body: faker.lorem.paragraphs(),
					Date: faker.date.past().toString(),
					SenderName: faker.name.fullName(),
				});
			}
			resolve(emails);
		}, 1000);
	});
	// const res = await fetch('http://localhost:5000/getEmails');
	// return await res.json();
}
