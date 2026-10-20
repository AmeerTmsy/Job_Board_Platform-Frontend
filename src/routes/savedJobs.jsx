import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Bookmark, ArrowUpRight, WifiOff } from 'lucide-react';
import { useFetchList } from '@/myHooks/fetchList';
import { setEmployeeSavedJobs } from '@/redux/slices/employee/savedJobsSlice';
import JobCard from '@/myComponents/JobCard';
import AccountLayout from '@/myComponents/AccountLayout';
import { SkeletonCard } from '@/myComponents/SkeletonCard';
export default function SavedJobs() {
    const [savedJobs, loading, error] = useFetchList('saveJob');
    const { employeeSavedJobs } = useSelector(state => state.employeeSavedJobs);
    const dispatch = useDispatch();
    useEffect(() => { if (Array.isArray(savedJobs)) dispatch(setEmployeeSavedJobs(savedJobs)); }, [savedJobs, dispatch]);
    const jobs = employeeSavedJobs.filter(item => item.jobId?._id);
    const failed = error && !/nothing found|not saved|not found/i.test(error);
    return <AccountLayout eyebrow="GOOD OPPORTUNITIES, KEPT CLOSE" title="Your shortlist." description="A collection of possibilities. Come back when you’re ready to make your move."><div className="collection-toolbar"><span>{loading ? 'Finding your saved roles…' : failed ? 'Saved roles unavailable' : `${error ? 0 : jobs.length} saved ${!error && jobs.length === 1 ? 'role' : 'roles'}`}</span><Link to="/">Discover more jobs <ArrowUpRight size={16} /></Link></div>{loading ? <div className="account-jobs-grid" aria-label="Loading saved jobs">{[0, 1, 2, 3].map(index => <div className="loading-card" key={index}><SkeletonCard /></div>)}</div> : failed ? <div className="empty-jobs"><WifiOff size={30} /><h2>We couldn’t load your saved jobs.</h2><p>Please try again in a moment.</p></div> : !jobs.length || error ? <div className="empty-jobs account-empty"><Bookmark size={32} /><h2>Keep a good possibility close.</h2><p>Save the roles that catch your eye. You’ll find them here when you’re ready.</p><Link className="primary-link" to="/">Find your next role <ArrowUpRight size={17} /></Link></div> : <div className="account-jobs-grid">{jobs.map(item => <JobCard key={item.jobId._id} job={item.jobId} />)}</div>}</AccountLayout>;
}
