import test from 'node:test';
import assert from 'node:assert/strict';
import { configureStore } from '@reduxjs/toolkit';
import reducer, { authenticatUser } from '../src/redux/slices/userSlice.js';
import { logoutSession } from '../src/auth/logout.js';
import { getSignedInHome } from '../src/auth/guestRoute.js';

for (const userType of ['employee', 'employer', 'admin']) {
    for (const expired of [false, true]) {
        test(`${userType} logout ${expired ? 'with expired session' : 'succeeds'}`, async () => {
            const store = configureStore({ reducer: { user: reducer } });
            store.dispatch(authenticatUser({ id: 'test-user', userType }));
            let destination;
            await logoutSession({
                client: { async get(url, options) {
                    assert.equal(url, `https://api.example.test/${userType === 'employer' ? 'employer' : 'user'}/auth/logout`);
                    assert.equal(options.withCredentials, true);
                    assert.equal(store.getState().user.isLoggedIn, true);
                    if (expired) throw { response: { status: 401 } };
                } },
                dispatch: store.dispatch,
                baseUrl: 'https://api.example.test', userType,
                navigate(path) { assert.equal(store.getState().user.isLoggedIn, false); destination = path; },
            });
            assert.equal(destination, '/login');
            assert.deepEqual(store.getState().user.user, {});
        });
    }
    test(`${userType} has an authenticated destination outside login and signup`, () => {
        assert.equal(getSignedInHome(userType), userType === 'employer' ? '/employer/employer_jobs_listed' : '/');
    });
}
for (const failure of [new Error('Offline'), { response: { status: 500 } }]) {
    test('failed logout preserves authentication and does not navigate', async () => {
        const store = configureStore({ reducer: { user: reducer } });
        store.dispatch(authenticatUser({ id: 'test-user', userType: 'employee' }));
        await assert.rejects(logoutSession({
            client: { get: async () => { throw failure; } },
            dispatch: store.dispatch, baseUrl: '', userType: 'employee',
            navigate() { assert.fail('Must not navigate on failure'); },
        }));
        assert.equal(store.getState().user.isLoggedIn, true);
    });
}
