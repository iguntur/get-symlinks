import path from 'path';
import test from 'ava';
import fn from '.';

const fixturePath = path.resolve(__dirname, 'fixtures');

function expected(links) {
	return [].concat(links).map(link => path.join(fixturePath, 'symlinks', link));
}

test('async: return symbolic links, except .*', async t => {
	const links = await fn(['**/*'], {cwd: fixturePath});
	t.deepEqual(links, expected(['a.txt', 'b.json']));
});

test('async: return all symbolic links', async t => {
	const links = await fn(['**/*', '**/.*'], {cwd: fixturePath});
	t.deepEqual(links, expected(['a.txt', 'b.json', '.dotrc']));
});

test('async: return one symbolic links, `.dot`', async t => {
	const actuals = await fn('**/.*', {cwd: fixturePath});
	t.deepEqual(actuals, expected(['.dotrc']));
});

test('async: symlinks not found', async t => {
	const inFolder = await fn(['**/*'], {cwd: path.join(fixturePath, 'folders')});
	t.deepEqual(inFolder, []);

	const inFile = await fn(['**/*'], {cwd: path.join(fixturePath, 'files')});
	t.deepEqual(inFile, []);
});

test('sync: return symbolic links, except .*', t => {
	const links = fn.sync(['**/*'], {cwd: fixturePath});
	t.deepEqual(links, expected(['a.txt', 'b.json']));
});

test('sync: return all symbolic links', t => {
	const links = fn.sync(['**/*', '**/.*'], {cwd: fixturePath});
	t.deepEqual(links, expected(['a.txt', 'b.json', '.dotrc']));
});

test('sync: return one links', t => {
	const links = fn.sync(['**/.*'], {cwd: fixturePath});
	t.deepEqual(links, expected(['.dotrc']));
});

test('sync: symlinks not found', t => {
	const inFolder = fn.sync(['**/*'], {cwd: path.join(fixturePath, 'folders')});
	t.deepEqual(inFolder, []);

	const inFile = fn.sync(['**/*'], {cwd: path.join(fixturePath, 'files')});
	t.deepEqual(inFile, []);
});
