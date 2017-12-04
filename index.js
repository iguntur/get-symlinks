'use strict';
const path = require('path');
const globby = require('globby');
const isSymbolicLink = require('is-symbolic-link');

module.exports = (patterns, opts) => {
	opts = Object.assign({}, opts);

	return globby(patterns, opts)
		.then(files => Promise.all(files.map(fp => {
			fp = path.resolve(opts.cwd || '', fp);

			return isSymbolicLink(fp).then(val => val ? fp : null);
		})))
		.then(fp => fp.filter(Boolean));
};

module.exports.sync = (patterns, opts) => {
	opts = Object.assign({}, opts);

	return globby.sync(patterns, opts)
		.map(fp => path.resolve(opts.cwd || '', fp))
		.filter(fp => isSymbolicLink.sync(fp));
};
