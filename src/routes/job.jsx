import PropTypes from 'prop-types';
import { toast } from '@/hooks/use-toast';
import ResumeAttachCard from '@/myComponents/resumeAttachCard';
import { SkeletonCard } from '@/myComponents/SkeletonCard';
import UploadAlert from '@/myComponents/uploadAlert';
import { useFetchDataDetail } from '@/myHooks/fetchDataDetail';
import { setEmployeeSavedJobs } from '@/redux/slices/employee/savedJobsSlice';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import Applications from './applications';
import ModerationActions from '@/myComponents/ModerationActions';
import { ArrowLeft, ArrowUpRight, MapPin, Banknote, BriefcaseBusiness, Bookmark, Building2, WifiOff } from 'lucide-react';

function Job({ employerView = false }) {
    const { user, isLoggedIn, isLoading } = useSelector(state => state.user);
    const { employeeSavedJobs } = useSelector(state => state.employeeSavedJobs);
    const { employerJobs } = useSelector(state => state.employerJobs);
    const { id } = useParams();
    const isAdmin = user?.userType === 'admin';



    const [job, loading, error] = useFetchDataDetail(`jobs/${id}`);

    const [saveJobBadgColor, setSaveJobBadgColor] = useState('');
    const [moderation, setModeration] = useState(null);
    const [updating, setUpdating] = useState(false);
    const badgeText = moderation && moderation.id === id ? moderation.status : job?.verifiedJob;
    const ownerId = user?.id || user?._id;
    const myJob = Boolean(job && ((ownerId && (job.jobCreatedBy?._id || job.jobCreatedBy) === ownerId) || employerJobs.some(item => item._id === job._id)));
    const managing = employerView && user?.userType === 'employer' && myJob;
    const dispatch = useDispatch();

    const companyVerification = async (verification) => {

        const nextStatus = verification === 'approve' ? 'approved' : 'rejected';
        if (updating || badgeText === nextStatus) return;
        setUpdating(true);
        try {
            const url = `${import.meta.env.VITE_API_BASE_URL}/jobs/${job._id}`;
            const response = await axios.patch(url, { verifiedJob: verification === 'approve' ? 'approved' : 'rejected' }, { withCredentials: true });
            // console.log("Job updated:", response);
            toast({
                description: `${response?.data?.data?.title} has ${verification === 'approve' ? 'approved' : 'rejected'} to publish`,
                style: { backgroundColor: '#90ee90', color: 'black' },
            });

            setModeration({ id, status: nextStatus });
        } catch (error) {
            console.error("Error approving job:", error);
            toast({
                description: `Unable to ${verification === 'approve' ? 'approve' : 'rejecte'}, please try again in a while`,
                style: { backgroundColor: '#ff5151', color: 'black' },
            });
        } finally {
            setUpdating(false);
        }
    }

    useEffect(() => {
        const isSaved = job ? employeeSavedJobs.some(item => item.jobId?._id === job._id) : false
        setSaveJobBadgColor(isSaved ? 'text-red-500' : 'text-gray-400');
    }, [employeeSavedJobs, job]);

    const manageJobSave = async () => {

        const data = { jobId: job._id, jobTitle: job.title };
        // console.log(data)
        try {
            if (saveJobBadgColor === 'text-gray-400') {
                console.log('hello');
                const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/saveJob`, data, { withCredentials: true });
                // console.log(response?.data?.data)
                dispatch(setEmployeeSavedJobs(response?.data?.data));
            } else {
                const response = await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/saveJob/${job._id}`, { withCredentials: true });
                dispatch(setEmployeeSavedJobs(response?.data?.data));
            }
        } catch (error) {
            console.error("Error saving or deleting job:", error);
        }
    };

    return <main className={`job-detail-page ${isAdmin ? 'admin-detail-page' : ''}`}>
        {isLoading && <UploadAlert />}<Link className="back-link" to={employerView ? '/employer/employer_jobs_listed' : '/'}><ArrowLeft size={16} /> {employerView ? 'Back to my jobs' : isAdmin ? 'Back to jobs' : 'Back to opportunities'}</Link>
        {loading ? <section className="detail-panel detail-loading" aria-label="Loading job"><SkeletonCard /></section> : error || !job ? <section className="empty-jobs"><WifiOff size={32} /><h1>{isAdmin ? 'This job couldn’t be loaded.' : 'This opportunity couldn’t be loaded.'}</h1><p>{error || 'Please try again in a moment.'}</p><Link className="primary-link" to="/">{isAdmin ? 'Back to jobs' : 'Explore other opportunities'}</Link></section> : <>
        <section className="detail-hero"><div className="detail-hero-top"><span className="company-monogram">{(job.company?.name || 'H').slice(0, 2).toUpperCase()}</span><div><span className="eyebrow">{isAdmin ? 'JOB REVIEW' : managing ? 'YOUR JOB LISTING' : 'YOUR NEXT CHAPTER'}</span><p>{job.company?.name || 'Company'}</p></div>{user?.userType === 'employee' && <button className={`outline-action ${saveJobBadgColor}`} onClick={manageJobSave} aria-pressed={saveJobBadgColor === 'text-red-500'}><Bookmark size={17} fill={saveJobBadgColor === 'text-red-500' ? 'currentColor' : 'none'} />{saveJobBadgColor === 'text-red-500' ? 'Saved' : 'Save role'}</button>}{user?.userType === 'admin' && <span className={`company-status status-${badgeText}`}>{badgeText}</span>}{user?.userType === 'employer' && myJob && <span className={`company-status status-${job.verifiedJob}`}>{job.verifiedJob || 'Not provided'}</span>}</div><h1>{job.title}</h1><p className="detail-headline">{job.headline}</p><div className="detail-facts"><span><MapPin size={17} />{job.location || 'Location not specified'}</span><span><BriefcaseBusiness size={17} />{job.jobType || 'Type not specified'}</span><span><Banknote size={17} />{job.salary !== undefined && job.salary !== null && job.salary !== '' ? `₹${Number(job.salary).toLocaleString('en-IN')}` : 'Salary not specified'}</span></div></section>
        <div className="detail-columns"><div><section className="detail-panel">{!isAdmin && !managing && <><span className="eyebrow">THE OPPORTUNITY</span><h2>Work worth getting excited about.</h2></>}{isAdmin || managing ? <h2>Job description</h2> : <h3>About the role</h3>}<p className="job-description">{job.description || (isAdmin ? 'No description provided.' : 'Contact the hiring team to learn more about this role.')}</p></section><section className="detail-company"><span className="company-monogram"><Building2 size={22} /></span><div>{!isAdmin && <span className="eyebrow">{managing ? 'COMPANY' : 'MEET YOUR NEXT TEAM'}</span>}<h3>{job.company?.name || 'The hiring team'}</h3>{managing && job.company?._id ? <Link className="company-profile-link" to={`/employer/companies/${job.company._id}`}>View company <ArrowUpRight size={14} /></Link> : !isAdmin && <p>A new team. A fresh perspective. Your next possibility.</p>}</div></section></div>
        <aside className="detail-sidebar"><section className="detail-panel apply-panel">{isAdmin ? <><h2>Review job</h2><p>Approve this listing to publish it, or reject it.</p></> : managing ? <><span className="eyebrow">YOUR HIRING WORKSPACE</span><h2>Manage this role.</h2><p>Keep your listing up to date and get to know the people who applied.</p></> : <><span className="eyebrow">MAKE YOUR MOVE</span><h2>See yourself here?</h2><p>A great next chapter starts with a first step.</p></>}{!isLoggedIn ? <><Link to="/login" className="primary-link">Log in to apply <ArrowUpRight size={18} /></Link><p className="apply-signup">New to Hired? <Link to="/sign_up">Create an account ↗</Link></p></> : user?.userType === 'employee' ? <ResumeAttachCard job={job} /> : user?.userType === 'employer' ? myJob ? <Link className="primary-link" to={`/employer/employer_job_edit/${job._id}`}>{managing ? 'Edit job' : 'Edit job information'} <ArrowUpRight size={18} /></Link> : <p>Applications are open to job seeker accounts.</p> : null}
        {managing && <><a className="outline-action manage-applications-link" href="#job-applications">View applications <ArrowUpRight size={17} /></a><div className="job-management-status"><span>Hiring status</span><strong>{job.hiring === false ? 'Not hiring right now' : job.hiring === true ? 'Currently hiring' : 'Not provided'}</strong></div><Link className="job-preview-link" to={`/jobs/${job._id}`}>Preview listing <ArrowUpRight size={14} /></Link></>}
        {user?.userType === 'admin' && <ModerationActions status={badgeText} updating={updating} subject="listing" onApprove={() => companyVerification('approve')} onReject={() => companyVerification('reject')} />}</section>{!isAdmin && !managing && <div className="detail-note"><CompassMark /><p>Find work that fits your ambition.<br /><strong>Make your next move a good one.</strong></p></div>}</aside></div>
        {user?.userType === 'employer' && myJob && <section id="job-applications" className="job-applicants-section"><Applications job={job} /></section>}
        </>}
    </main>;
}
function CompassMark() { return <BriefcaseBusiness size={25} strokeWidth={1.3} />; }
Job.propTypes = { employerView: PropTypes.bool };
export default Job;
