'use strict';

const fs = require('fs');
const { join } = require('path');
const callBind = require('call-bind');
const callBound = require('call-bind/callBound');

const $Promise = Promise;
const $all = callBind(Promise.all, Promise);
const $then = callBound('Promise.prototype.then');

const TRUE = () => true;
const FALSE = () => false;

function exists(file) {
	return $then(
		new $Promise((resolve, reject) => {
			fs.stat(file, (err, result) => {
				if (err) {
					reject(err);
				} else {
					resolve(result);
				}
			});
		}),
		TRUE,
		FALSE,
	);
}

module.exports = async function npmInfo(cwd = process.cwd()) {
	const pHasNodeModulesDir = exists(join(cwd, 'node_modules'));

	const packageJSONPath = join(cwd, 'package.json');
	const pHasPackage = exists(packageJSONPath);

	const packageLockPath = join(cwd, 'package-lock.json');
	const pHasPackageLock = exists(packageLockPath);

	const shrinkwrapPath = join(cwd, 'npm-shrinkwrap.json');
	const pHasShrinkwrap = exists(shrinkwrapPath);

	const pLockfileVersion = $then(
		$all([pHasPackageLock, pHasShrinkwrap]),
		async ([hasPackageLock, hasShrinkwrap]) => {
			/* eslint-disable global-require */
			if (hasPackageLock) {
				return require(packageLockPath).lockfileVersion || 1;
			}
			if (hasShrinkwrap) {
				return require(shrinkwrapPath).lockfileVersion || 1;
			}
			/* eslint-enable global-require */
			return NaN;
		},
	);

	const [
		hasPackageJSON,
		hasNodeModulesDir,
		hasPackageLock,
		hasShrinkwrap,
		lockfileVersion,
	] = await $all([
		pHasPackage,
		pHasNodeModulesDir,
		pHasPackageLock,
		pHasShrinkwrap,
		pLockfileVersion,
	]);

	const hasLockfile = hasPackageLock || hasShrinkwrap;

	return {
		hasPackageJSON,
		hasNodeModulesDir,
		hasLockfile,
		hasPackageLock,
		hasShrinkwrap,
		lockfileVersion,
	};
};

