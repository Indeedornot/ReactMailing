import {z} from 'zod';

export type ImapDataModel = {
	username: string;
	password: string;
	host: string;
	port: number;
	tls: boolean;
};

export const ImapDataSchema = z.object({
	username: z.string().email(),
	password: z.string(),
	host: z.string(),
	port: z.number().positive(),
	tls: z.boolean(),
});

export const isValidImapData = (imapData: any): imapData is ImapDataModel => {
	const parseData = ImapDataSchema.safeParse(imapData);
	return parseData.success;
};
