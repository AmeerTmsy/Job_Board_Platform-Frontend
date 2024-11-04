import { setEmployeeSavedJobs } from '@/redux/slices/employee/savedJobsSlice';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function JobCard({ job }) {
    const { user } = useSelector(state => state.user);
    const { employeeSavedJobs } = useSelector(state => state.employeeSavedJobs);
    const { employerJobs } = useSelector(state => state.employerJobs);
    const [badgColor, setBadgColor] = useState('');
    const [saveJobColor, setSaveJobColor] = useState('');
    const [myJob, setMyJob] = useState(false);
    const dispatch = useDispatch();

    // Badge color for job verification status
    useEffect(() => {
        if (job.verifiedJob === 'approved') setBadgColor('bg-green-200 text-green-700');
        else if (job.verifiedJob === 'rejected') setBadgColor('bg-red-200 text-red-600');
        else if (job.verifiedJob === 'pending') setBadgColor('bg-yellow-200 text-yellow-700');
    }, [job]);

    // Update save button color based on saved status
    useEffect(() => {
        // console.log('Updated employeeSavedJobs:', employeeSavedJobs);
        const isSaved = employeeSavedJobs.some(item => {
            // console.log(item.jobId)
            return item.jobId._id === job._id
        });
        // console.log(isSaved);
        setSaveJobColor(isSaved ? 'text-red-500' : 'text-gray-400');
        // console.log(saveJobColor)
    }, [employeeSavedJobs, saveJobColor, job]);

    useEffect(() => {
        setMyJob(employerJobs.some(item => item._id === job._id) ? true : false)
        // console.log(myJob)
    }, [employerJobs])

    // Toggle job save status
    const manageJobSave = async () => {
        const data = { jobId: job._id, jobTitle: job.title };
        try {
            if (saveJobColor === 'text-gray-400') {
                const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/saveJob`, data, { withCredentials: true });
                // console.log(response?.data?.data)
                dispatch(setEmployeeSavedJobs(response?.data?.data));
            } else {
                const response = await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/saveJob/${job._id}`, { withCredentials: true });
                dispatch(setEmployeeSavedJobs(response?.data?.data));
            }
            // Debugging output
            // console.log('Updated employeeSavedJobs:', employeeSavedJobs);
        } catch (error) {
            console.error("Error saving or deleting job:", error);
        }
    };

    return (
        <div className='relative py-4 sm:px-5 px-10 w-[21rem] sm:w-1/2 rounded-md ease-in-out duration-300 hover:shadow-md bg-lime-50 text-black '>
            {/* Approved Label */}
            {user?.userType === 'admin' && (
                <span className={`absolute top-3 right-0 ${badgColor} text-xs font-semibold px-2 py-1 rounded-l`}>
                    {job.verifiedJob}
                </span>
            )}
            {user?.userType === 'employee' && (
                <span className={`absolute top-0 right-0 text-xs font-semibold px-2 py-1 rounded-l`}>
                    <i onClick={manageJobSave} className={`ri-heart-fill font-normal text-xl ${saveJobColor} cursor-pointer`}></i>
                </span>
            )}
            {user?.userType === 'employer' && myJob && (
                <span className={`absolute top-3 right-0 bg-gray-700 text-white text-xs font-semibold px-2 py-1 rounded-l`}>
                    Your Job
                </span>
            )}

            {/* Job Details */}
            <h3 className="text-lg font-bold">{job.title}</h3>
            <p className="pb-2">Location: {job.location}</p>
            <hr />
            <p>Requirement: {job.headline}</p>
            <p>Starts from: ₹{job.salary}</p>
            <p>{job.company.name}</p>
            <Link to={`/jobs/${job._id}`} className="text-blue-400 underline">See more</Link>
        </div>
    );
}

export default JobCard;
