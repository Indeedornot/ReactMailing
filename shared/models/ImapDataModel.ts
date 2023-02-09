export type ImapDataModel = {
	username: string;
	password: string;
	host: string;
	port: number;
	tls: boolean;
};

export const isValidImapData = (model: ImapDataModel) => {
	return (
		ValidateEmail(model.username) &&
		model.password !== undefined &&
		model.password !== '' &&
		model.host !== undefined &&
		model.port !== undefined &&
		model.port > 0 &&
		model.tls !== undefined
	);
};

const re =
	/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
export const ValidateEmail = (email: string | undefined) => {
	if (email === undefined || email === '') return false;
	return re.test(email.toLowerCase());
};
