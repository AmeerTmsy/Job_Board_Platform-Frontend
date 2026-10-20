import test from 'node:test';
import assert from 'node:assert/strict';
import { configureStore } from '@reduxjs/toolkit';
import userReducer, { authenticatUser } from '../src/redux/slices/userSlice.js';
import { createSessionLoader } from '../src/auth/sessionLoader.js';

const setup = get => {
    const store = configureStore({ reducer: { user: userReducer } });
    const loader = createSessionLoader({ client: { get }, dispatch: store.dispatch, baseUrl: 'https://api.example.test' });
    return { store, loader };
};

for (const userType of ['employee', 'employer', 'admin']) {
    test(`refresh restores ${userType} before the router can render a guard`, async () => {
        let finishVerification;
        const { loader, store } = setup((url, options) => {
            assert.equal(url, 'https://api.example.test/user/auth/verify');
            assert.equal(options.withCredentials, true);
            return new Promise(resolve => { finishVerification = resolve; });
        });
        const pending = loader();
        assert.equal(store.getState().user.isLoggedIn, false);
        finishVerification({ data: { data: { id: 'user-123', userType } } });
        assert.deepEqual(await pending, { sessionError: false });
        assert.equal(store.getState().user.isLoggedIn, true);
        assert.equal(store.getState().user.user.userType, userType);
    });
}

test('an expired session clears previous authentication', async () => {
    const { store, loader } = setup(async () => { throw { response: { status: 401 } }; });
    store.dispatch(authenticatUser({ id: 'user-123', userType: 'employee' }));
    assert.deepEqual(await loader(), { sessionError: false });
    assert.equal(store.getState().user.isLoggedIn, false);
});

for (const error of [new Error('Network unavailable'), { response: { status: 500 } }]) {
    test('temporary verification failure is not treated as logout', async () => {
        const { store, loader } = setup(async () => { throw error; });
        store.dispatch(authenticatUser({ id: 'user-123', userType: 'employee' }));
        assert.deepEqual(await loader(), { sessionError: true });
        assert.equal(store.getState().user.isLoggedIn, true);
    });
}

test('malformed verification cannot authenticate a user', async () => {
    const { store, loader } = setup(async () => ({ data: { data: {} } }));
    assert.deepEqual(await loader(), { sessionError: true });
    assert.equal(store.getState().user.isLoggedIn, false);
});

test('aborted verification cannot clear an existing session', async () => {
    const controller = new AbortController();
    const cancelled = new Error('Request cancelled');
    const { store, loader } = setup(async (_url, options) => {
        assert.equal(options.signal, controller.signal);
        controller.abort();
        throw cancelled;
    });
    store.dispatch(authenticatUser({ id: 'user-123', userType: 'employee' }));
    await assert.rejects(loader({ request: { signal: controller.signal } }), cancelled);
    assert.equal(store.getState().user.isLoggedIn, true);
});

test('normalizes MongoDB ids for account routes', async () => {
    const { store, loader } = setup(async () => ({ data: { data: { _id: 'user-123', userType: 'employee' } } }));
    await loader();
    assert.equal(store.getState().user.user.id, 'user-123');
});
