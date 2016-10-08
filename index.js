'use strict';
const path = require('path');
const globby = require('globby');
const objectAssign = require('object-assign');
const isSymbolicLink = require('is-symbolic-link');

module.exports = (patterns, opts) => new Promise(resolve => {
	opts = objectAssign({}, opts);

	return globby(patterns, opts).then(files => {
		const symlinks = [];
		files.forEach(f => {
			f = path.resolve(opts.cwd || '', f);
			if (isSymbolicLink.sync(f)) {
				symlinks.push(f);
			}
		});

		resolve(symlinks);
	});
});

module.exports.sync = (patterns, opts) => {
	opts = objectAssign({}, opts);
	const symlinks = [];

	globby.sync(patterns, opts).forEach(f => {
		f = path.resolve(opts.cwd || '', f);
		if (isSymbolicLink.sync(f)) {
			symlinks.push(f);
		}
	});

	return symlinks;
};
