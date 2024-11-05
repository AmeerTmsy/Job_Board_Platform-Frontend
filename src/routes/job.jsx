import { toast } from '@/hooks/use-toast';
import ResumeAttachCard from '@/myComponents/resumeAttachCard';
import { SkeletonCard } from '@/myComponents/SkeletonCard';
import UploadAlert from '@/myComponents/uploadAlert';
import { useFetchDataDetail } from '@/myHooks/fetchDataDetail';
import { setEmployeeSavedJobs } from '@/redux/slices/employee/savedJobsSlice';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import Applications from './applications';

function Job(props) {
    const { user, isLoggedIn, isLoading } = useSelector(state => state.user);
    const { employeeSavedJobs } = useSelector(state => state.employeeSavedJobs);
    const { employerJobs } = useSelector(state => state.employerJobs);
    const { id } = useParams();
    
    const [job, loading, error] = useFetchDataDetail(`jobs/${id}`);
    
    const [badgColor, setBadgColor] = useState('');
    const [saveJobBadgColor, setSaveJobBadgColor] = useState('');
    const [myJob, setMyJob] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!loading) {
            if (job.verifiedJob == 'approved') setBadgColor('bg-green-200 text-green-700')
            if (job.verifiedJob == 'rejected') setBadgColor('bg-red-200 text-red-600')
            if (job.verifiedJob == 'pending') setBadgColor('bg-yellow-200 text-yellow-700')
        }
    }, [job, loading]);

    const companyVerification = async (verification) => {
        if (verification === 'approve') {
            console.log(verification);
            try {
                const url = `http://localhost:3000/jobs/${job._id}`;
                const response = await axios.patch(url, { verifiedJob: 'approved' }, { withCredentials: true });
                console.log("Job updated:", response);
                toast({
                    description: `${response?.data?.data?.name} has approved to publish`,
                    style: { backgroundColor: '#90ee90', color: 'black' },
                });
                setTimeout(() => {
                    window.location.reload()
                    // console.log("response?.data?.data?._id", response?.data?.data?._id)
                    // console.log('user.userType', user.userType)
                }, 1200);
            } catch (error) {
                console.error("Error approving job:", error);
                toast({
                    description: "Unable to approve, please try again in a while",
                    style: { backgroundColor: '#ff5151', color: 'black' },
                });
            }
        }
        else if (verification === 'regect') {
            console.log(verification);
            try {
                const url = `http://localhost:3000/jobs/${job._id}`;
                const response = await axios.patch(url, { verifiedJob: 'rejected' }, { withCredentials: true });
                console.log("Job updated:", response);
                toast({
                    description: `${response?.data?.data?.name} has regected to publish`,
                    style: { backgroundColor: '#90ee90', color: 'black' },
                });
                setTimeout(() => {
                    window.location.reload()
                    // console.log("response?.data?.data?._id", response?.data?.data?._id)
                    // console.log('user.userType', user.userType)
                }, 1200);
            } catch (error) {
                console.error("Error regecting Job:", error);
                toast({
                    description: "Unable to regect, please try again in a while",
                    style: { backgroundColor: '#ff5151', color: 'black' },
                });
            }
        }
    }

    useEffect(() => {
        const isSaved = job ? employeeSavedJobs.some(item => item.jobId._id === job._id) : false
        setSaveJobBadgColor(isSaved ? 'text-red-500' : 'text-gray-400');
    }, [employeeSavedJobs, saveJobBadgColor, job]);

    const manageJobSave = async () => {

        const data = { jobId: job._id, jobTitle: job.title };
        try {
            if (saveJobBadgColor === 'text-gray-400') {
                console.log('hello');
                const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/saveJob`, data, { withCredentials: true });
                console.log(response?.data?.data)
                dispatch(setEmployeeSavedJobs(response?.data?.data));
            } else {
                const response = await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/saveJob/${job._id}`, { withCredentials: true });
                dispatch(setEmployeeSavedJobs(response?.data?.data));
            }
        } catch (error) {
            console.error("Error saving or deleting job:", error);
        }
    };

    useEffect(() => {
        job && setMyJob(employerJobs.some(item => item._id === job._id))
    }, [employerJobs, job])

    return (
        <div className="max-w-4xl mx-auto mt-10">
            {isLoading && <UploadAlert />}
            <h2 className="text-center text-2xl font-bold mb-6">Job Details</h2>
            {loading ?
                <div className="w-full flex flex-row justify-center items-center">
                    <SkeletonCard />
                </div>
                :
                <div className="relative flex flex-col md:flex-row justify-between border border-gray-300 rounded-lg p-4 mx-2">
                    {user.userType === 'admin' && <span className={`absolute top-4 right-0 ${badgColor} text-xs font-semibold px-5 py-2 rounded-l`}>
                        {job.verifiedJob}
                    </span>}
                    {user.userType === 'employer' && myJob && <span className={`absolute top-2 right-0 bg-gray-700 text-white text-xs font-semibold px-5 py-2 rounded-l`}>
                        {'Your Job'}
                    </span>}
                    {user.userType === 'employee' && (
                        <span className={`absolute top-0 right-0 text-xs font-semibold px-2 py-1 rounded-l`}>
                            <i onClick={manageJobSave} className={`ri-heart-fill font-normal text-2xl ${saveJobBadgColor} cursor-pointer`}></i>
                        </span>
                    )}
                    <div className="w-full md:w-1/2 p-4 border-b md:border-b-0 md:border-r border-gray-200">
                        <h3 className="text-lg font-bold mb-2">{job.title}</h3>
                        <p className="text-gray-700">{job.company.name}</p>
                        <p className="text-gray-600">Location: {job.location}</p>
                        <p className="text-gray-600">Job type:{job.jobType}</p>
                        <p className="text-gray-600 mb-4">Salary: {job.salary}</p>
                        <hr />
                        {!isLoggedIn ?
                            <div className='flex flex-col justify-center items-center h-2/4'>
                                <p className='mb-5'>Login to apply for the job</p>
                                <Link to={'/login'} className="bg-blue-100 hover:bg-blue-200 text-blue-600 py-2 px-6 rounded">
                                    login
                                </Link>
                            </div>
                            :
                             user.userType === 'employee' && <ResumeAttachCard job={job} />
                            
                        }
                    </div>
                    <div className="flex flex-col justify-between items-center w-full md:w-1/2 p-4">
                        <h3 className="text-lg font-bold mb-4">
                            {job.headline}
                        </h3>
                        <p className="text-gray-700">
                            {job.description}
                        </p>
                        {
                            user.userType === "employer" && myJob && <Link to={`/employer/employer_job_detail/${job._id}`} className='self-start bg-blue-600 border mt-2 px-7 py-1 rounded' >chang job info</Link>
                        }
                        {user.userType === 'admin' &&
                            <div className='flex flex-row gap-3'>
                                <button onClick={() => companyVerification("approve")} className="bg-green-200 w-20  hover:shadow-md rounded-l-full text-green-800 focus:shadow-inner border border-r-4 border-gray-800">approved</button>
                                <button onClick={() => companyVerification("regect")} className="bg-red-200 w-20 hover:shadow-md rounded-r-full text-red-600 focus:shadow-inner border border-l-4 border-gray-800">regected</button>
                            </div>
                        }
                    </div>
                </div>
            }
            {user.userType === 'employer' && myJob && <Applications job={job} />}
        </div>
    );
}

export default Job;