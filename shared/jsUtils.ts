export const isNumber = (value: any): value is number => {
	return typeof value === 'number';
};

export const isString = (value: any): value is string => {
	return typeof value === 'string';
};

export const isUndefined = (value: any): value is undefined => {
	return typeof value === 'undefined';
};
