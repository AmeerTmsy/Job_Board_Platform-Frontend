import PropTypes from 'prop-types';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { UserRound, Bookmark, Send, Building2, BriefcaseBusiness, ArrowUpRight } from 'lucide-react';
import ProfileAvatar from './ProfileAvatar';
export default function AccountLayout({ eyebrow, title, description, children }) {
    const { user } = useSelector(state => state.user);
    const location = useLocation();
    const isEmployer = user.userType === 'employer';
    const base = `/${user.userType}`;
    const links = [{ to: `${base}/account`, label: 'My profile', Icon: UserRound }, ...(user.userType === 'employee' ? [{ to: '/employee/saved_jobs', label: 'Saved jobs', Icon: Bookmark }, { to: '/employee/applied_jobs', label: 'Applications', Icon: Send }] : user.userType === 'employer' ? [{ to: '/employer/employer_jobs_listed', label: 'My job listings', Icon: BriefcaseBusiness }, { to: '/employer/my_companies', label: 'My companies', Icon: Building2 }] : [])];
    return <main className="account-page"><aside className="account-sidebar"><div className="sidebar-profile"><ProfileAvatar profile={user} /><div><strong>{user.name || 'Your workspace'}</strong><span>{user.userType === 'employer' ? 'Employer account' : user.userType === 'admin' ? 'Admin account' : 'Your career workspace'}</span></div></div><nav aria-label="Account navigation">{links.map(({ to, label, Icon }) => <NavLink key={to} to={to} end className={({ isActive }) => isActive || to === `${base}/account` && location.pathname === `${base}/account_edit` ? 'active' : ''}><Icon size={18} />{label}</NavLink>)}</nav><div className="sidebar-note"><span className="eyebrow">{isEmployer ? 'BUILD YOUR NEXT GREAT TEAM' : 'KEEP MOVING FORWARD'}</span><p>{isEmployer ? <>Your next teammate<br />is out there.</> : <>Your next chapter<br />is out there.</>}</p><Link to={isEmployer ? '/employer/employees' : '/'}>{isEmployer ? 'Explore candidates' : 'Explore opportunities'} <ArrowUpRight size={15} /></Link></div></aside><div className="account-content"><div className="account-page-heading"><span className="eyebrow">{eyebrow}</span><h1>{title}</h1><p>{description}</p></div>{children}</div></main>;
}
AccountLayout.propTypes = { eyebrow: PropTypes.string.isRequired, title: PropTypes.string.isRequired, description: PropTypes.string.isRequired, children: PropTypes.node.isRequired };
