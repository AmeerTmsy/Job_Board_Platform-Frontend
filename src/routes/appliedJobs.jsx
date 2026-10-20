import { Link } from 'react-router-dom';
import { Send, ArrowUpRight, WifiOff } from 'lucide-react';
import { useFetchList } from '@/myHooks/fetchList';
import AppliedJobCard from '@/myComponents/appliedJobCard';
import AccountLayout from '@/myComponents/AccountLayout';
import { SkeletonCard } from '@/myComponents/SkeletonCard';
export default function AppliedJobs() {
    const [applications, loading, error] = useFetchList('applications/applied_jobs');
    const items = Array.isArray(applications) ? applications : [];
    const failed = error && !/not any applications|not found/i.test(error);
    return <AccountLayout eyebrow="EVERY STEP IS A NEW POSSIBILITY" title="Moves you’ve made." description="Your applications, all in one place. Here’s to the doors you’re opening."><div className="collection-toolbar"><span>{loading ? 'Finding your applications…' : failed ? 'Applications unavailable' : `${items.length} ${items.length === 1 ? 'application' : 'applications'}`}</span><Link to="/">Explore opportunities <ArrowUpRight size={16} /></Link></div>{loading ? <div className="application-list" aria-label="Loading applications">{[0, 1, 2].map(index => <div className="loading-card" key={index}><SkeletonCard /></div>)}</div> : failed ? <div className="empty-jobs"><WifiOff size={30} /><h2>We couldn’t load your applications.</h2><p>Please try again in a moment.</p></div> : !items.length ? <div className="empty-jobs account-empty"><Send size={32} /><h2>Your next chapter starts with a first step.</h2><p>When you apply for a role, you can find it here.</p><Link className="primary-link" to="/">Explore open roles <ArrowUpRight size={17} /></Link></div> : <div className="application-list">{items.map(item => <AppliedJobCard key={item._id} application={item} />)}</div>}</AccountLayout>;
}
