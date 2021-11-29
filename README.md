# lockfile-info <sup>[![Version Badge][npm-version-svg]][package-url]</sup>

[![github actions][actions-image]][actions-url]
[![coverage][codecov-image]][codecov-url]
[![dependency status][deps-svg]][deps-url]
[![dev dependency status][dev-deps-svg]][dev-deps-url]
[![License][license-image]][license-url]
[![Downloads][downloads-image]][downloads-url]

[![npm badge][npm-badge-png]][package-url]

Info about an npm project - which lockfile version, which lockfile(s) are present, etc.

## Example

```js
const lockfileInfo = require('lockfile-info');
const assert = require('assert');

lockfileInfo().then((results) => {
	assert.deepEqual(Object.keys(results), [
		'hasPackageJSON',
		'hasNodeModulesDir',
		'hasLockfile',
		'hasPackageLock',
		'hasShrinkwrap',
		'lockfileVersion',
	]);

	assert.equal(typeof results.hasPackageJSON, 'boolean');
	assert.equal(typeof results.hasNodeModulesDir, 'boolean');
	assert.equal(typeof results.hasLockfile, 'boolean');
	assert.equal(typeof results.hasPackageLock, 'boolean');
	assert.equal(typeof results.hasShrinkwrap, 'boolean');
	assert.equal(typeof results.lockfileVersion, 'number'); // `NaN`, `1`, `2`, or `3`
});
```

[package-url]: https://npmjs.org/package/lockfile-info
[npm-version-svg]: https://versionbadg.es/ljharb/lockfile-info.svg
[deps-svg]: https://david-dm.org/ljharb/lockfile-info.svg
[deps-url]: https://david-dm.org/ljharb/lockfile-info
[dev-deps-svg]: https://david-dm.org/ljharb/lockfile-info/dev-status.svg
[dev-deps-url]: https://david-dm.org/ljharb/lockfile-info#info=devDependencies
[npm-badge-png]: https://nodei.co/npm/lockfile-info.png?downloads=true&stars=true
[license-image]: https://img.shields.io/npm/l/lockfile-info.svg
[license-url]: LICENSE
[downloads-image]: https://img.shields.io/npm/dm/lockfile-info.svg
[downloads-url]: https://npm-stat.com/charts.html?package=lockfile-info
[codecov-image]: https://codecov.io/gh/ljharb/lockfile-info/branch/main/graphs/badge.svg
[codecov-url]: https://app.codecov.io/gh/ljharb/lockfile-info/
[actions-image]: https://img.shields.io/endpoint?url=https://github-actions-badge-u3jn4tfpocch.runkit.sh/ljharb/lockfile-info
[actions-url]: https://github.com/ljharb/lockfile-info/actions
