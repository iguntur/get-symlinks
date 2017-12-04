import p from 'path';
import test from 'ava';
import fsE from 'fs-extra';
import tempfile from 'tempfile';
import fn from './';

const fixtures = ['bar', 'baz', 'foo', 'qux', '.dot'];

function expected(t, files) {
	return [].concat(files).map(fl => p.join(t.context.symlinks, fl));
}

test.beforeEach(t => {
	t.context.path = tempfile();
	t.context.files = p.join(t.context.path, 'files');
	t.context.folders = p.join(t.context.path, 'folders');
	t.context.symlinks = p.join(t.context.path, 'symlinks');

	fixtures.forEach(dirName => fsE.mkdirpSync(p.join(t.context.folders, dirName)));
	fixtures.forEach(fileName => {
		fsE.ensureFileSync(p.join(t.context.files, fileName));
		fsE.ensureSymlinkSync(p.join(t.context.files, fileName), p.join(t.context.symlinks, fileName));
	});
});

test('async: return all symlinks files without `.dot`', async t => {
	const files = await fn(['*'], {cwd: t.context.symlinks});

	t.true(Array.isArray(files));
	t.true(files.length > 0);
	t.true(files.length === 4);
	t.deepEqual(files, expected(t, ['bar', 'baz', 'foo', 'qux']));
	t.notDeepEqual(files, expected(t, ['bar', 'baz', 'foo', 'qux', '.dot']));
});

test('async: return all symlinks files', async t => {
	const files = await fn(['*', '.*'], {cwd: t.context.symlinks});

	t.true(Array.isArray(files));
	t.true(files.length > 0);
	t.true(files.length === 5);
	t.deepEqual(files, expected(t, ['bar', 'baz', 'foo', 'qux', '.dot']));
});

test('async: return one symlinks files, `.dot`', async t => {
	const files = await fn(['.*'], {cwd: t.context.symlinks});

	t.true(Array.isArray(files));
	t.true(files.length > 0);
	t.true(files.length === 1);
	t.deepEqual(files, expected(t, ['.dot']));
});

test('async: symlinks not found', async t => {
	const files = await fn(['*'], {cwd: t.context.files});

	t.true(Array.isArray(files));
	t.true(files.length === 0);
	t.notDeepEqual(files, expected(t, ['bar', 'baz', 'foo', 'qux']));
});

test('async: symlinks not found too', async t => {
	const files = await fn(['*'], {cwd: t.context.folders});

	t.true(Array.isArray(files));
	t.true(files.length === 0);
	t.notDeepEqual(files, expected(t, ['bar', 'baz', 'foo', 'qux']));
});

test('sync: return all symlinks files without `.dot`', t => {
	const files = fn.sync(['*'], {cwd: t.context.symlinks});

	t.true(Array.isArray(files));
	t.true(files.length > 0);
	t.true(files.length === 4);
	t.deepEqual(files, expected(t, ['bar', 'baz', 'foo', 'qux']));
	t.notDeepEqual(files, expected(t, ['bar', 'baz', 'foo', 'qux', '.dot']));
});

test('sync: return all symlinks files', t => {
	const files = fn.sync(['*', '.*'], {cwd: t.context.symlinks});

	t.true(Array.isArray(files));
	t.true(files.length > 0);
	t.true(files.length === 5);
	t.deepEqual(files, expected(t, ['bar', 'baz', 'foo', 'qux', '.dot']));
});

test('sync: return one symlinks files, `.dot`', t => {
	const files = fn.sync(['.*'], {cwd: t.context.symlinks});

	t.true(Array.isArray(files));
	t.true(files.length > 0);
	t.true(files.length === 1);
	t.deepEqual(files, expected(t, ['.dot']));
});

test('sync: symlinks not found', t => {
	const files = fn.sync(['*'], {cwd: t.context.files});

	t.true(Array.isArray(files));
	t.true(files.length === 0);
	t.notDeepEqual(files, expected(t, ['bar', 'baz', 'foo', 'qux']));
});

test('sync: symlinks not found too', t => {
	const files = fn.sync(['*'], {cwd: t.context.folders});

	t.true(Array.isArray(files));
	t.true(files.length === 0);
	t.notDeepEqual(files, expected(t, ['bar', 'baz', 'foo', 'qux']));
});
