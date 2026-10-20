import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Pencil, Mail, BriefcaseBusiness, LogOut, Bookmark, Send, Building2, WifiOff } from 'lucide-react';
import axios from 'axios';
import { toast } from '@/hooks/use-toast';
import { unAuthenticatUser } from '@/redux/slices/userSlice';
import { useFetchDataDetail } from '@/myHooks/fetchDataDetail';
import { SkeletonCard } from '@/myComponents/SkeletonCard';
import AccountLayout from '@/myComponents/AccountLayout';
import ProfileAvatar from '@/myComponents/ProfileAvatar';
export default function Account() {
    const { user } = useSelector(state => state.user);
    const dispatch = useDispatch();
    const [loggingOut, setLoggingOut] = useState(false);
    const [account, loading, error] = useFetchDataDetail(`${user.userType === 'employee' ? 'users' : 'employers'}/${user.id || user._id}`);
    const profile = user.userType === 'admin' ? user : account;
    const logout = async () => {
        setLoggingOut(true);
        try { await axios.get(`${import.meta.env.VITE_API_BASE_URL}/${user.userType === 'employer' ? 'employer' : 'user'}/auth/logout`, { withCredentials: true }); dispatch(unAuthenticatUser()); window.location.assign('/'); }
        catch { toast({ description: 'Unable to log out. Please try again.', variant: 'destructive' }); setLoggingOut(false); }
    };
    const employee = user.userType === 'employee';
    return <AccountLayout eyebrow="YOUR SPACE TO GROW" title="A little more you." description="Your story, your experience, and everything that comes next.">
        {loading && user.userType !== 'admin' ? <section className="detail-panel detail-loading" aria-label="Loading account"><SkeletonCard /></section> : !profile || error && user.userType !== 'admin' ? <div className="empty-jobs"><WifiOff size={30} /><h2>We couldn’t load your profile.</h2><p>Please try again in a moment.</p></div> : <><section className="profile-panel"><div className="profile-cover" aria-hidden="true"><span>YOUR NEXT CHAPTER IS YOURS TO WRITE.</span><span>✳</span></div><div className="profile-panel-body"><div className="profile-top"><ProfileAvatar profile={profile} />{user.userType !== 'admin' && <Link className="outline-action" to={`/${user.userType}/account_edit`}><Pencil size={15} />Edit profile</Link>}</div><h2>{profile.name}</h2><p className="profile-profession">{profile.profession || 'Add your profession to tell your story.'}</p><div className="profile-contact"><span><Mail size={15} />{profile.email}</span>{profile.experienced !== undefined && profile.experienced !== null && <span><BriefcaseBusiness size={15} />{profile.experienced} {Number(profile.experienced) === 1 ? 'year' : 'years'} of experience</span>}</div></div></section><section className="detail-panel profile-about"><span className="eyebrow">THE PERSON BEHIND THE PROFILE</span><h2>About me</h2><p className="job-description">{profile.bio || 'What drives you? Add a short introduction to help your next team get to know you.'}</p></section></>}
        {user.userType !== 'admin' && <div className="account-shortcuts"><Link to={employee ? '/employee/saved_jobs' : '/employer/employer_jobs_listed'}>{employee ? <Bookmark size={22} /> : <BriefcaseBusiness size={22} />}<strong>{employee ? 'Your shortlist' : 'Your job listings'}</strong><p>{employee ? 'Good opportunities, kept close.' : 'Find the people who move you forward.'}</p><span>{employee ? 'View saved jobs' : 'Manage listings'} <ArrowUpRight size={17} /></span></Link><Link to={employee ? '/employee/applied_jobs' : '/employer/my_companies'}>{employee ? <Send size={22} /> : <Building2 size={22} />}<strong>{employee ? 'Your next steps' : 'Your companies'}</strong><p>{employee ? 'Every application is a new possibility.' : 'Give your team a place to shine.'}</p><span>{employee ? 'View applications' : 'Manage companies'} <ArrowUpRight size={17} /></span></Link></div>}
        <div className="account-session"><p>All done for now? You can pick up here anytime.</p><button className="outline-action" disabled={loggingOut} onClick={logout}><LogOut size={15} />{loggingOut ? 'Logging out…' : 'Log out'}</button></div>
    </AccountLayout>;
}
