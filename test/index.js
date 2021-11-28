'use strict';

const path = require('path');
const test = require('tape');

const lockfileInfo = require('../');

test('lockfile-info', async (t) => {
	t.equal(typeof lockfileInfo, 'function', 'exports a function');

	const p = lockfileInfo(path.join(__dirname, '..'));

	t.ok(p instanceof Promise, 'returns a Promise instance');
	t.equal(p, Promise.resolve(p), 'returns a Promise');

	const results = await p;

	t.deepEqual(
		results,
		{
			hasPackageJSON: true,
			hasNodeModulesDir: true,
			hasLockfile: false,
			hasPackageLock: false,
			hasShrinkwrap: false,
			lockfileVersion: NaN,
		},
		'results are as expected',
	);
});
