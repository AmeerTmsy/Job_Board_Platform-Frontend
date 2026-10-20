import test from 'node:test';
import assert from 'node:assert/strict';
import { createInfiniteList } from '../src/lib/infiniteList.js';
const response = (page, count, total = 23) => ({ data: Array.from({ length: count }, (_, i) => ({ _id: `${(page - 1) * 9 + i}` })), pagination: { page, total, hasMore: page * 9 < total } });

test('fetches nine at a time, appends, and stops at the final page', async () => {
    const pages = [];
    const list = createInfiniteList(async (page, limit) => { pages.push(page); assert.equal(limit, 9); return response(page, page === 3 ? 5 : 9); });
    for (const count of [9, 18, 23]) { await list.loadMore(); assert.equal(list.getSnapshot().items.length, count); }
    await list.loadMore();
    assert.deepEqual(pages, [1, 2, 3]);
    assert.equal(list.getSnapshot().hasMore, false);
});

test('overlapping observer events issue only one request', async () => {
    let finish; let requests = 0;
    const list = createInfiniteList(() => { requests++; return new Promise(resolve => { finish = resolve; }); });
    const pending = list.loadMore(); await list.loadMore();
    assert.equal(requests, 1); finish(response(1, 9)); await pending;
});

test('failed later page preserves previous results and retries the same page', async () => {
    let fail = true;
    const list = createInfiniteList(async page => { if (page === 2 && fail) throw new Error('Offline'); return response(page, 9); });
    await list.loadMore(); await list.loadMore();
    assert.equal(list.getSnapshot().items.length, 9);
    assert.equal(list.getSnapshot().page, 1);
    assert.equal(list.getSnapshot().error, 'Offline');
    fail = false; await list.loadMore();
    assert.equal(list.getSnapshot().items.length, 18);
});

test('deduplicates records between pages', async () => {
    const list = createInfiniteList(async page => { const result = response(page, 9); if (page === 2) result.data[0]._id = '0'; return result; });
    await list.loadMore(); await list.loadMore();
    assert.equal(list.getSnapshot().items.length, 17);
});

test('ignores stale responses after filters change or component unmounts', async () => {
    let finish;
    const list = createInfiniteList(() => new Promise(resolve => { finish = resolve; }));
    const pending = list.loadMore(); list.dispose(); finish(response(1, 9)); await pending;
    assert.equal(list.getSnapshot().items.length, 0);
});

test('supports StrictMode cleanup and activation without stale responses', async () => {
    const callbacks = [];
    const list = createInfiniteList(() => new Promise(resolve => callbacks.push(resolve)));
    const first = list.loadMore(); list.dispose(); list.activate(); const second = list.loadMore();
    callbacks[0](response(1, 9)); await first;
    assert.equal(list.getSnapshot().items.length, 0);
    callbacks[1](response(1, 9)); await second;
    assert.equal(list.getSnapshot().items.length, 9);
});

test('rejects an unpaginated backend instead of rendering every record', async () => {
    const list = createInfiniteList(async () => ({ data: Array.from({ length: 20 }, (_, i) => ({ _id: `${i}` })) }));
    await list.loadMore();
    assert.equal(list.getSnapshot().items.length, 0);
    assert.ok(list.getSnapshot().error);
});
