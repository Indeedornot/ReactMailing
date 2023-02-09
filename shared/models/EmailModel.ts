export type EmailModel = {
	id: string | undefined;
	Body: string | undefined;
	Subject: string | undefined;
	Date: string | undefined;
	SenderName: string | undefined;
	SenderEmail: string | undefined;
};

export type EmailModelSortArgs = keyof EmailModel | `-${string & keyof EmailModel}`;
