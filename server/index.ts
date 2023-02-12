import 'module-alias/register';

import express, {Request, Response} from 'express';
import cors from 'cors';

import {getEmails} from './EmailController';
import {ImapDataModel} from '@/shared/models/ImapDataModel';
import {EmailModel} from '@/shared/models/EmailModel';
import {SequenceSet} from '@/shared/models/SequenceSet';

const PORT = process.env.PORT || 5000;

type RequestBody<T> = Request<unknown, unknown, T>;
// for .params
type RequestParams<T> = Request<T>;
// for .query
type RequestQuery<T> = Request<unknown, unknown, unknown, T>;

async function createServer() {
	const app = express();
	app.use(cors());

	app.post(
		'/getEmails',
		express.json(),
		async (req: RequestBody<{range: SequenceSet; imapData: ImapDataModel}>, res: Response<EmailModel[]>) => {
			const {range, imapData} = req.body;
			const emails = await getEmails(range, imapData);
			res.json(emails);
		}
	);

	app.get('/api/v1', (req, res: Response<{message: string}>) => {
		res.send({message: 'Hello from server!'});
	});

	return {app};
}

createServer().then(({app}) => {
	app.listen(PORT, () => {
		console.log(`Server running at http://localhost:${PORT}`);
	});
});
