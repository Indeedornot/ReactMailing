import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {EmailModel} from '@/shared/emails/models/EmailModel';
import {sort} from '@/client/scripts/sort';
import {RootState} from '@/client/redux/store';

interface EmailState {
	emails: EmailModel[];
	sortedBy: string;
}

const sampleEmails: EmailModel[] = [
	{
		id: '1',
		SenderName: 'Sender 1',
		SenderEmail: 'Sender1@email.com',
		Subject: 'Subject 1',
		Date: 'Date 1',
		Body: 'Body 1',
	},
	{
		id: '2',
		SenderName: 'Sender 2',
		SenderEmail: 'Sender2@email.com',
		Subject: 'Subject 2',
		Date: 'Date 2',
		Body: 'Body 2',
	},
	{
		id: '3',
		SenderName: 'Sender 3',
		Subject: 'Subject 3',
		SenderEmail: 'Sender3@email.com',
		Date: 'Date 3',
		Body: 'Body 3',
	},
];

const initialState: EmailState = {
	emails: sampleEmails,
	sortedBy: '',
};

export const emailsSlice = createSlice({
	name: 'emailsData',
	initialState,
	reducers: {
		setEmails: (state, action: PayloadAction<EmailModel[]>) => {
			console.table(action.payload);
			state.emails = action.payload;
		},

		sortEmails: (state, action: PayloadAction<keyof EmailModel>) => {
			if (state.sortedBy != action.payload) {
				state.emails = sort(state.emails, action.payload);
			} else {
				state.emails = sort(state.emails, `-${action.payload}`);
			}

			state.sortedBy = action.payload;
		},

		removeEmails: (state, action) => {
			state.emails.splice(action.payload, 1);
		},
	},
});

// Action creators are generated for each case reducer function
export const {setEmails, sortEmails, removeEmails} = emailsSlice.actions;

export const selectEmails = (state: RootState) => state.emailsData.emails;

export default emailsSlice.reducer;
