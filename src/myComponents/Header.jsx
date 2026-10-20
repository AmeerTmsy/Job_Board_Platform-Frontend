import { Link, NavLink } from 'react-router-dom';
import { ArrowUpRight, BriefcaseBusiness } from 'lucide-react';
import ThemeColor from './icon/ThemeColor';
import { useSelector } from 'react-redux';

export default function Header() {
    const { user, isLoggedIn } = useSelector(state => state.user);
    return <header className="site-header"><div className="header-inner">
        <Link to="/" className="brand" aria-label="Hired home"><span className="brand-mark"><BriefcaseBusiness size={21} /></span>hired<span className="brand-dot">.</span></Link>
        <nav aria-label="Main navigation"><NavLink to="/" end>{user?.userType === 'admin' ? 'Jobs' : 'Find a job'}</NavLink>{isLoggedIn && <NavLink to={`/${user?.userType}/companies`}>Companies</NavLink>}{isLoggedIn && user?.userType === 'employer' && <NavLink to="/employer/employees">Talent</NavLink>}</nav>
        <div className="header-actions"><ThemeColor />{isLoggedIn ? <Link className="account-link" aria-label="Your account" to={`/${user?.userType}/account`}>{user?.name?.charAt(0).toUpperCase() || 'A'}</Link> : <><Link className="login-link" to="/login">Log in</Link><Link className="primary-link" to="/sign_up">Get started <ArrowUpRight size={16} /></Link></>}</div>
    </div></header>;
}
