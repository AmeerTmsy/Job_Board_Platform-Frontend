import { unAuthenticatUser } from '../redux/slices/userSlice.js';

export async function logoutSession({ client, dispatch, baseUrl, userType, navigate }) {
    const role = userType === 'employer' ? 'employer' : 'user';
    try {
        await client.get(`${baseUrl}/${role}/auth/logout`, { withCredentials: true });
    } catch (error) {
        // An expired session is already signed out; a network failure is not.
        if (error?.response?.status !== 401) throw error;
    }
    dispatch(unAuthenticatUser());
    navigate('/login');
}
