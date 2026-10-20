import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

export default function VerifiedEmployer() {
    const { user, isLoggedIn } = useSelector(state => state.user);
    if (!isLoggedIn) return <Navigate to="/login" replace />;
    if (user?.userType !== 'employer') return <Navigate to="/" replace />;
    return <Outlet />;
}
