import {isUndefined} from '../jsUtils';

export type SequenceSet = {from: number | '*'; to: number | '*'};

/**
 *
 * @param sequenceSet SequenceSet to expand
 * @param maxValue Max value of the range
 * @returns String representation of the expanded sequence set or null if both are out of bounds
 *
 * @example
 * 		expandSequenceSet({from: 1, to: 5}, 10) // '1:5'
 * 		expandSequenceSet({from: 1, to: 5}, 3) // '1:3'
 * 		expandSequenceSet({from: 1, to: 5}, 1) // '1'
 *
 * 		expandSequenceSet({from: 1, to: -1}, 10) // '1:9'
 * 		expandSequenceSet({from: 1, to: -1}, 3) // '1:2'
 *
 * 		expandSequenceSet({from: 1, to: *}, 10) // '1:10'
 */

export const expandSequenceSet = (sequenceSet: SequenceSet, maxValue: number): string | null => {
	const {from, to} = sequenceSet;

	if (from === '*' || to === '*') {
		return handleAsterix(sequenceSet, maxValue);
	}

	if (from === to) {
		if (from < 0) {
			const nonNegativeNum = positiveOrZero(maxValue + from);
			return `${nonNegativeNum}`;
		}

		if (from > maxValue) {
			return null;
		}
		return `${from}`;
	}

	if (from > 0 && to > 0) {
		return toRangeOrSingle(from, to, maxValue);
	}

	//has a zero
	if (from * to === 0) {
		const otherNum = from === 0 ? to : from;

		if (otherNum < 0) {
			const nonNeg = positiveOrZero(maxValue + otherNum);
			return toRangeOrSingle(0, nonNeg);
		}

		return toRangeOrSingle(0, otherNum, maxValue);
	}

	if (from < 0 && to < 0) {
		const nonNegFrom = positiveOrZero(maxValue + from);
		const nonNegTo = positiveOrZero(maxValue + to);
		return toRangeOrSingle(nonNegFrom, nonNegTo);
	}

	if (from * to < 0) {
		const neg = Math.min(from, to);
		const pos = Math.max(from, to);

		const loopedNeg = positiveOrZero(maxValue + neg);
		return toRangeOrSingle(loopedNeg, pos, maxValue);
	}

	return null;
};

const handleAsterix = (sequenceSet: SequenceSet, maxValue: number): string | null => {
	const {from, to} = sequenceSet;
	if (from === '*' && to === '*') {
		return `${maxValue}`;
	}

	const num = (from === '*' ? to : from) as number;
	if (num >= 0) {
		return toRangeOrSingle(num, maxValue, maxValue);
	}

	const nonNegativeNum = positiveOrZero(maxValue + num);
	return toRangeOrSingle(nonNegativeNum, maxValue);
};

const positiveOrZero = (value: number) => Math.max(0, value);

/**
 *
 * @param first Number in the range
 * @param second Number in the range
 * @param maxValue Optional max value of the range, not needed for certain cases
 * @returns String representation of the range or null if both are out of bounds
 */
const toRangeOrSingle = (first: number, second: number, maxValue?: number): string | null => {
	//both are out of bounds
	if (!isUndefined(maxValue) && first > maxValue && second > maxValue) {
		return null;
	}

	const min = Math.min(first, second);
	let max = Math.max(first, second);

	//Pad it to not exceed the max value
	if (!isUndefined(maxValue) && max > maxValue) {
		max = maxValue;
	}

	if (min === max) {
		return `${min}`;
	}

	return `${min}:${max}`;
};
