'use strict';
const path = require('path');
const globby = require('globby');
const isSymbolicLink = require('is-symbolic-link');

module.exports = function (patterns, opts) {
	opts = Object.assign({}, opts);

	return globby(patterns, opts)
		.then(files => {
			return Promise.all(files.map(fp => {
				fp = path.resolve(opts.cwd || '', fp);

				return isSymbolicLink(fp).then(val => {
					return val ? fp : null;
				});
			}));
		})
		.then(fp => {
			return fp.filter(Boolean);
		});
};

module.exports.sync = function (patterns, opts) {
	opts = Object.assign({}, opts);

	return globby.sync(patterns, opts)
		.map(fp => {
			return path.resolve(opts.cwd || '', fp);
		})
		.filter(fp => {
			return isSymbolicLink.sync(fp);
		});
};
