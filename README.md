# get-symlinks [![Build Status](https://travis-ci.org/iguntur/get-symlinks.svg?branch=master)](https://travis-ci.org/iguntur/get-symlinks) [![npm](https://img.shields.io/npm/v/get-symlinks.svg?style=flat-square)](https://npmjs.com/package/get-symlinks) [![npm](https://img.shields.io/npm/l/get-symlinks.svg?style=flat-square)](#)

> Get all symbolic link in directory

## Install

```
$ npm install --save get-symlinks
```


## Usage

**async**

```js
const getSymlinks = require('get-symlinks');

getSymlinks(['/home/guntur/.*']).then(symlinks => {
	console.log(symlinks);
});
```

**sync**

```js
const getSymlinks = require('get-symlinks');

const symlinks = getSymlinks.sync(['/home/guntur/.*', '!/home/guntur/.*rc']);

console.log(symlinks);
```


## API

### getSymlinks(patterns, [options])

Returns a promise for an array of symlinks paths.

### getSymlinks.sync(patterns, [options])

Returns an array of symlinks paths.


#### patterns

Type: `string`, `array`

See supported minimatch [patterns](https://github.com/isaacs/minimatch#usage).

- [Pattern examples with expected matches](https://github.com/sindresorhus/multimatch/blob/master/test.js)
- [Quick globbing pattern overview](https://github.com/sindresorhus/multimatch#globbing-patterns)


#### options

Type: `object`

See the `node-glob` [options](https://github.com/isaacs/node-glob#options).


## License

MIT © [Guntur](http://guntur.starmediateknik.com)
