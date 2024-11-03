import React, { useEffect, useState } from 'react';

import { jobs } from "../fakeUtilities/myUtils"
import JobCard from '../myComponents/JobCard';
import { SkeletonCard } from '@/myComponents/SkeletonCard';
import { useFetchList } from '@/myHooks/fetchList';
import { useSelector } from 'react-redux';


function Jobs(props) {
    const { user, isLoggedIn } = useSelector(state => state.user);
    const [urlParam, setUrlParam] = useState('')



    const bringData = async (jobsVerificaion) => {
        if (jobsVerificaion === 'approved') {
            setUrlParam("?verifiedJob=approved");
        } else if (jobsVerificaion === 'pending') {
            setUrlParam("?verifiedJob=pending");
        } else if (jobsVerificaion === 'rejected') {
            setUrlParam("?verifiedJob=rejected");
        } else {
            setUrlParam("");
        }
    }
    // console.log(`jobs${user?.userType === 'admin' ? urlParam : `?verifiedJob=approved`}`);

    const [jobs, loading, error] = useFetchList(`jobs${user?.userType === 'admin' ? urlParam : `?verifiedJob=approved`}`);
    // useEffect(() => {
    //     // if (error) console.log("error: ", error);
    //     // if (!error) console.log("error");
    // }, [jobs, loading , error]);

    // console.log("Loading:", loading);
    // console.log("jobs:", jobs);
    return (
        <>
            <main>
                <div className='flex flex-col sm:flex-row justify-between items-center p-4 '>
                    <div>
                        <h1 className='font-bold text-2xl'>Available Job listings</h1>
                    </div>
                    <div className='border-2 rounded-full px-2 py-1 pl-3 bg-slate-100 flex flex-row'>
                        <input className='bg-slate-100 text-black' type="text" name="search" id="search" placeholder='search' />
                        <div className=' border-l-2 custom-input'><i className="ri-search-line px-2 focus:outline-slate-100 text-black"></i></div>
                    </div>
                    {user?.userType === 'admin' && <div>
                        <button onClick={() => bringData("all")} className="bg-gray-200 w-20 hover:shadow-md rounded-l text-black">all</button>
                        <button onClick={() => bringData("approved")} className="bg-green-200 w-20 hover:shadow-md text-green-700">approved</button>
                        <button onClick={() => bringData("pending")} className="bg-yellow-200 w-20 hover:shadow-md text-yellow-600">pending</button>
                        <button onClick={() => bringData("rejected")} className="bg-red-200 w-20 hover:shadow-md rounded-r text-red-600">regected</button>
                    </div>}
                </div>
                {loading === true ?
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {Array.from({ length: 6 }).map((_, index) => (
                            <div key={index} className=" p-4 rounded-lg shadow-sm flex flex-row justify-center">
                                <SkeletonCard />
                            </div>
                        ))}
                    </div>
                    :
                    <div className='flex flex-col justify-center items-center gap-1 flex-wrap'>
                        {error === 'Jobs not found' ?
                            <div className='flex flex-col sm:flex-row justify-between items-center p-4 '> not any jobs </div>
                            :
                            jobs.map(item => (<JobCard key={item._id} job={item} />))
                        }
                    </div>}
            </main>
        </>
    );
}

export default Jobs;

