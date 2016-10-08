import test from 'ava';
import gs from '../';

/**
 * async
 */

test('@async: is symlinks', t => {
	gs(['links/*.txt', 'links/a.txt']).then(V => {
		t.true(V.length > 0);
		t.true(Array.isArray(V));
	});
});

test('@async: is not symlinks', t => {
	gs(['files', 'links', 'files/*.txt']).then(V => {
		t.false(V.length > 0);
		t.true(V.length === 0);
		t.true(Array.isArray(V));
	});
});

test('@async: is empty files and symlinks', t => {
	gs(['links/*.js', 'files/*.js', 'files/*.txt']).then(V => {
		t.false(V.length > 0);
		t.true(V.length === 0);
		t.true(Array.isArray(V));
	});
});

test('@async: not deep equal', t => {
	gs(['files', 'links', 'files/*.txt']).then(X => {
		gs(['links/*.txt', 'links/a.txt']).then(Y => {
			t.notDeepEqual(X, Y);
		});
	});
});

/**
 * sync
 */

test('@sync: is symlinks', t => {
	const V = gs.sync(['links/*.txt', 'links/a.txt']);
	t.true(V.length > 0);
	t.true(Array.isArray(V));
});

test('@sync: is not symlinks', t => {
	const V = gs.sync(['files', 'links', 'files/*.txt']);
	t.false(V.length > 0);
	t.true(V.length === 0);
	t.true(Array.isArray(V));
});

test('@sync: is empty files and symlinks', t => {
	const V = gs.sync(['links/*.js', 'files/*.js', 'files/*.txt']);
	t.false(V.length > 0);
	t.true(V.length === 0);
	t.true(Array.isArray(V));
});

test('@sync: not deep equal', t => {
	const X = gs.sync(['files', 'links', 'files/*.txt']);
	const Y = gs.sync(['links/*.txt', 'links/a.txt']);
	t.notDeepEqual(X, Y);
});
