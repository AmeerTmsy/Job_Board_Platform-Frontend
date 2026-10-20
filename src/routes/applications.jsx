import PropTypes from 'prop-types';
import { Users, WifiOff } from 'lucide-react';
import ApplicationCard from '@/myComponents/applicationCard';
import { SkeletonCard } from '@/myComponents/SkeletonCard';
import { useFetchList } from '@/myHooks/fetchList';

export default function Applications({ job }) {
    const [applications, loading, error] = useFetchList(`applications?jobId=${encodeURIComponent(job._id)}`);
    const items = Array.isArray(applications) ? applications : [];
    return <><div className="section-heading"><div><span className="eyebrow">YOUR HIRING PIPELINE</span><h2>Applications</h2><p>People who’ve taken the first step toward joining your team.</p></div>{!loading && !error && <span className="listing-count">{items.length} {items.length === 1 ? 'application' : 'applications'}</span>}</div>
        {loading ? <div className="applicant-grid" aria-label="Loading applications">{[0, 1].map(index => <div className="loading-card" key={index}><SkeletonCard /></div>)}</div> : error ? <div className="empty-jobs"><WifiOff size={28} /><h3>We couldn’t load the applications.</h3><p>Please try again in a moment.</p></div> : !items.length ? <div className="empty-jobs applicant-empty"><Users size={30} /><h3>No applications yet.</h3><p>When someone applies for this role, their profile and resume will appear here.</p></div> : <div className="applicant-grid">{items.map(application => <ApplicationCard key={application._id} application={application} />)}</div>}
    </>;
}
Applications.propTypes = { job: PropTypes.object.isRequired };
