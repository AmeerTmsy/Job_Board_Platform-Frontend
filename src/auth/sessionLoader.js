import { authenticatUser, unAuthenticatUser } from '../redux/slices/userSlice.js';

// Router loaders finish before route components mount, so guards see the
// verified session on their very first render after a refresh.
export function createSessionLoader({ client, dispatch, baseUrl }) {
    return async function sessionLoader({ request } = {}) {
        try {
            const response = await client.get(`${baseUrl}/user/auth/verify`, {
                withCredentials: true,
                signal: request?.signal,
            });
            const user = response?.data?.data;
            if (!(user?.id || user?._id) || !['employee', 'employer', 'admin'].includes(user?.userType)) {
                return { sessionError: true };
            }
            dispatch(authenticatUser({ ...user, id: user.id || user._id }));
            return { sessionError: false };
        } catch (error) {
            if (request?.signal?.aborted) throw error;
            if (error?.response?.status === 401) {
                dispatch(unAuthenticatUser());
                return { sessionError: false };
            }
            // An unavailable API does not prove the user has logged out.
            return { sessionError: true };
        }
    };
}
