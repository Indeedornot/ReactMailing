import {EmailModel} from '../../models/EmailModel';

export function fetchEmails(): Promise<EmailModel[]> {
	return fetch('http://localhost:5000/getEmails').then((res) => res.json());
}
