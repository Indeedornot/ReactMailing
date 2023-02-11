import {ImapDataModel, isValidImapData} from '@/shared/models/ImapDataModel';

const imapDataKey = 'imapData';

export const getImapData = () => {
	const imapJson = localStorage.getItem(imapDataKey);
	if (imapJson === null) return null;

	const imapData = JSON.parse(imapJson);
	return isValidImapData(imapData) ? imapData : null;
};

/** Returns true if the data was set, false if it was invalid */
export const setImapData = (imapData: ImapDataModel): boolean => {
	if (!isValidImapData(imapData)) return false;
	localStorage.setItem(imapDataKey, JSON.stringify(imapData));
	return true;
};

export const clearImapData = () => {
	localStorage.removeItem(imapDataKey);
};
