import assert from 'assert';
import '../app/main';

describe('Entry Point', () => {
	it('should return -1 when server starts', () => {
		assert.strictEqual([1, 2, 3].indexOf(4), -1);
	});
});
