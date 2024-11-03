import { useFetchList } from "@/myHooks/fetchList";
// import { jobs } from "../fakeUtilities/myUtils"
import JobCard from '../myComponents/JobCard';
import { useEffect, useState } from "react";
import { SkeletonCard } from "@/myComponents/SkeletonCard";
// import { useLoaderData } from 'react-router-dom';
// import axios from 'axios';

function SavedJobs(props) {
    const [savedJobs, loading, error] = useFetchList("saveJob");
    const [jobs, setJobs] = useState([]);
    const [jobsCount, setJobsCount] = useState([]);

    useEffect(() => {
        if (!loading && savedJobs) {
            setJobs(savedJobs || []);
            setJobsCount(savedJobs.totalJobSaved || 0);

            jobs.map(job => console.log("job:", job.jobId))
            console.log("jobsCount:", jobsCount);
        }
    }, [loading, savedJobs]);


    return (
        <main>
            <div className='flex flex-col sm:flex-row justify-between items-center p-4 '>
                <div>
                    <h1 className='font-bold text-2xl'>Your Saved Jobs</h1>
                </div>
                <div className='border-2 rounded-full px-2 py-1 pl-3 bg-slate-100 flex flex-row'>
                    <input className='bg-slate-100 text-black' type="text" name="search" id="search" placeholder='search' />
                    <div className=' border-l-2 custom-input'><i className="ri-search-line px-2 focus:outline-slate-100 text-black"></i></div>
                </div>

            </div>
            {loading ?
                <div className='flex flex-col justify-center items-center gap-1 flex-wrap'>
                    <SkeletonCard />
                </div>
                :
                <div className='flex flex-col justify-center items-center gap-1 flex-wrap'>
                    {jobs.map(job => (<JobCard key={job.jobId._id} job={job.jobId} />))}
                </div>
            }
        </main>
    );
}

export default SavedJobs;