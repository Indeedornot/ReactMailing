export const isNumber = (value: any): value is number => {
	return typeof value === 'number';
};

export const isString = (value: any): value is string => {
	return typeof value === 'string';
};
