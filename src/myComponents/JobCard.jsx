import { ArrowUpRight, Bookmark, MapPin, Banknote } from 'lucide-react';
import PropTypes from 'prop-types';
import { setEmployeeSavedJobs } from '@/redux/slices/employee/savedJobsSlice';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function JobCard({ job }) {
    const { user } = useSelector(state => state.user);
    const { employeeSavedJobs } = useSelector(state => state.employeeSavedJobs);
    const { employerJobs } = useSelector(state => state.employerJobs);
    const [saveJobColor, setSaveJobColor] = useState('');
    const [myJob, setMyJob] = useState(false);
    const dispatch = useDispatch();



    useEffect(() => {
        const isSaved = employeeSavedJobs.some(item => item.jobId?._id === job._id);
        setSaveJobColor(isSaved ? 'text-red-500' : 'text-gray-400');
    }, [employeeSavedJobs, saveJobColor, job]);

    useEffect(() => {
        setMyJob(employerJobs.some(item => item._id === job._id) ? true : false)
    }, [employerJobs, job._id])

    const manageJobSave = async () => {
        const data = { jobId: job._id, jobTitle: job.title };
        try {
            if (saveJobColor === 'text-gray-400') {
                const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/saveJob`, data, { withCredentials: true });
                dispatch(setEmployeeSavedJobs(response?.data?.data));
            } else {
                const response = await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/saveJob/${job._id}`, { withCredentials: true });
                dispatch(setEmployeeSavedJobs(response?.data?.data));
            }
        } catch (error) {
            console.error("Error saving or deleting job:", error);
        }
    };

    return <article className="job-card">
        <div className="job-card-header"><span className="company-monogram">{(job.company?.name || 'H').slice(0, 2).toUpperCase()}</span><span className="company-name">{job.company?.name || 'Company'}</span>{user?.userType === 'employee' && <button className={`save-job ${saveJobColor}`} aria-label={saveJobColor === 'text-red-500' ? 'Unsave job' : 'Save job'} aria-pressed={saveJobColor === 'text-red-500'} onClick={manageJobSave}><Bookmark size={19} fill={saveJobColor === 'text-red-500' ? 'currentColor' : 'none'} /></button>}</div>
        <h3><Link to={`/jobs/${job._id}`}>{job.title}</Link></h3><p className="job-headline">{job.headline}</p>
        <div className="job-meta"><span><MapPin size={15} />{job.location}</span>{job.salary && <span><Banknote size={15} />₹{Number(job.salary).toLocaleString('en-IN')}</span>}</div>
        <div className="job-card-footer"><span className={user?.userType === 'admin' ? `company-status status-${job.verifiedJob}` : 'job-tag'}>{user?.userType === 'admin' ? job.verifiedJob || 'Not provided' : myJob ? 'Your listing' : 'Explore opportunity'}</span><Link to={`/jobs/${job._id}`} className="job-detail-link">View role <ArrowUpRight size={17} /></Link></div>
    </article>;
}
JobCard.propTypes = { job: PropTypes.object.isRequired };
export default JobCard;
