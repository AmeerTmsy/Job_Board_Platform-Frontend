import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

export default function VerifiedUser() {
    const { user, isLoggedIn } = useSelector(state => state.user);
    if (!isLoggedIn) return <Navigate to="/login" replace />;
    if (user?.userType !== 'employee') return <Navigate to="/" replace />;
    return <Outlet />;
}
