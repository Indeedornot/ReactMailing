import {z} from 'zod';

export type ImapDataModel = {
	username: string;
	password: string;
	host: string;
	port: number;
	tls: boolean;
};

export const MaxPort = 999;
export const MinPort = 1;

export const ImapDataSchema = z.object({
	username: z.string().email({message: 'Username must be a valid email address'}),
	password: z.string().min(1, {message: 'Password must not be empty'}),
	host: z.string().min(1, {message: 'Host must not be empty'}),
	port: z.coerce
		.number()
		.int()
		.min(MinPort, {message: `Port must be greater than ${MinPort}`})
		.max(MaxPort, {message: `Port must be less than ${MaxPort}`}),
	tls: z.coerce.boolean(),
});

export const isValidImapData = (imapData: any): imapData is ImapDataModel => {
	const parseData = ImapDataSchema.safeParse(imapData);
	return parseData.success;
};
