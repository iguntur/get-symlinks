'use strict';
var path = require('path');
var globby = require('globby');
var Promise = require('pinkie-promise');
var objectAssign = require('object-assign');
var isSymbolicLink = require('is-symbolic-link');

module.exports = function (patterns, opts) {
	return new Promise(function (resolve) {
		opts = objectAssign({}, opts);
		var symlinks = [];

		return globby(patterns, opts).then(function (files) {
			files.forEach(function (f) {
				f = path.resolve(opts.cwd || '', f);
				if (isSymbolicLink.sync(f)) {
					symlinks.push(f);
				}
			});

			resolve(symlinks);
		});
	});
};

module.exports.sync = function (patterns, opts) {
	opts = objectAssign({}, opts);
	var symlinks = [];

	globby.sync(patterns, opts).forEach(function (f) {
		f = path.resolve(opts.cwd || '', f);
		if (isSymbolicLink.sync(f)) {
			symlinks.push(f);
		}
	});

	return symlinks;
};
