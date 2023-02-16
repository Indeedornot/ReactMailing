import {expandSequenceSet} from './SequenceSet';

describe('SequenceSet', () => {
	test('The same value', () => {
		expect(expandSequenceSet({from: '*', to: '*'}, 10)).toBe('10');
		expect(expandSequenceSet({from: 1, to: 1}, 10)).toBe('1');
		expect(expandSequenceSet({from: -1, to: -1}, 10)).toBe('9');
		expect(expandSequenceSet({from: 0, to: 0}, 10)).toBe('0');
	});

	describe('Numbers only', () => {
		test('Positive only', () => {
			expect(expandSequenceSet({from: 1, to: 5}, 10)).toBe('1:5');
			expect(expandSequenceSet({from: 1, to: 3}, 10)).toBe('1:3');
		});

		test('Negative', () => {
			expect(expandSequenceSet({from: -5, to: -1}, 10)).toBe('5:9');
			expect(expandSequenceSet({from: -5, to: -3}, 10)).toBe('5:7');

			expect(expandSequenceSet({from: 1, to: -1}, 10)).toBe('1:9');
			expect(expandSequenceSet({from: 1, to: -3}, 10)).toBe('1:7');

			expect(expandSequenceSet({from: -5, to: 5}, 10)).toBe('5');
			expect(expandSequenceSet({from: -5, to: 3}, 10)).toBe('3:5');
		});
	});

	describe('Asterix', () => {
		test('Asterix Positive', () => {
			expect(expandSequenceSet({from: 1, to: '*'}, 10)).toBe('1:10');
			expect(expandSequenceSet({from: 5, to: '*'}, 10)).toBe('5:10');

			expect(expandSequenceSet({from: '*', to: 1}, 10)).toBe('1:10');
			expect(expandSequenceSet({from: '*', to: 3}, 10)).toBe('3:10');
		});

		test('Asterix Negative', () => {
			expect(expandSequenceSet({from: -1, to: '*'}, 10)).toBe('9:10');
			expect(expandSequenceSet({from: -5, to: '*'}, 10)).toBe('5:10');

			expect(expandSequenceSet({from: '*', to: -5}, 10)).toBe('5:10');
			expect(expandSequenceSet({from: '*', to: -1}, 10)).toBe('9:10');
		});
	});

	describe('Overflow', () => {
		test('Negative values bigger than total', () => {
			expect(expandSequenceSet({from: -5, to: -1}, 3)).toBe('0:2');
			expect(expandSequenceSet({from: -5, to: -3}, 3)).toBe('0');
			expect(expandSequenceSet({from: -5, to: -1}, 2)).toBe('0:1');
			expect(expandSequenceSet({from: -5, to: -11}, 10)).toBe('0:5');
			expect(expandSequenceSet({from: -5, to: 11}, 5)).toBe('0:5');
		});

		test('Positive values bigger than total', () => {
			expect(expandSequenceSet({from: 1, to: 5}, 3)).toBe('1:3');
			expect(expandSequenceSet({from: 1, to: 5}, 1)).toBe('1');
			expect(expandSequenceSet({from: 1, to: 5}, 0)).toBe(null);
			expect(expandSequenceSet({from: 1, to: 11}, 10)).toBe('1:10');
			expect(expandSequenceSet({from: 1, to: 11}, 5)).toBe('1:5');
		});

		test('Asterix values bigger than total', () => {
			expect(expandSequenceSet({from: '*', to: 5}, 3)).toBe('3');
			expect(expandSequenceSet({from: '*', to: 5}, 0)).toBe('0');
			expect(expandSequenceSet({from: '*', to: 5}, 1)).toBe('1');
		});
	});
});
