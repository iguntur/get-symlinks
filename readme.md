# get-symlinks

[![Travis CI](https://img.shields.io/travis/iguntur/get-symlinks.svg?style=flat-square)](https://travis-ci.org/iguntur/get-symlinks)
[![node](https://img.shields.io/node/v/get-symlinks.svg?style=flat-square)](#)
[![npm](https://img.shields.io/npm/v/get-symlinks.svg?style=flat-square)](https://www.npmjs.org/package/get-symlinks)
[![PRs](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](#)

---

> Get all symbolic link (file symlinks) using glob


## Install

```console
$ npm install get-symlinks
```


## Usage

```js
const getSymlinks = require('get-symlinks');

getSymlinks(['/home/guntur/.*']).then(symlinks => {
    console.log(symlinks);
});

const symlinks = getSymlinks.sync(['/home/guntur/.*', '!/home/guntur/.*rc']);
console.log(symlinks);
```


## API

### getSymlinks(`patterns`, `[options]`)

- Params:
  - `patterns`: `<string | string[]>` _(required)_ - See the [globby patterns](https://github.com/sindresorhus/globby#patterns).
  - `options`: `<object>` _(optional)_ - See the [globby options](https://github.com/sindresorhus/globby#options).
- Returns: `<Promise<string[]>` - An array of symlinks paths.

### getSymlinks.sync(`patterns`, `[options]`)

- Params:
  - `patterns`: `<string | string[]>` _(required)_ - See the [globby patterns](https://github.com/sindresorhus/globby#patterns).
  - `options`: `<object>` _(optional)_ - See the [globby options](https://github.com/sindresorhus/globby#options).
- Returns: `<string[]>` - An array of symlinks paths.


## Related

- [del-symlinks](https://github.com/iguntur/del-symlinks) - Delete symlinks using glob.
- [is-symbolic-link](https://github.com/iguntur/is-symbolic-link) - Check if PATH is symbolic link
- [make-symlinks](https://github.com/iguntur/make-symlinks) - Create symbolic link (symlinks) using glob.


## License

MIT © [Guntur Poetra](https://github.com/iguntur)
