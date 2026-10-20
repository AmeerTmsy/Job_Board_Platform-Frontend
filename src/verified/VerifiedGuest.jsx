import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { getSignedInHome } from '../auth/guestRoute.js';

export default function VerifiedGuest() {
    const { user, isLoggedIn } = useSelector(state => state.user);
    return isLoggedIn ? <Navigate to={getSignedInHome(user?.userType)} replace /> : <Outlet />;
}
