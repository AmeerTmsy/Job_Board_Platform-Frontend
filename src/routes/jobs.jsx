import React from 'react';

import { jobs } from "../fakeUtilities/myUtils"
import JobCard from '../myComponents/JobCard';
import { useLoaderData } from 'react-router-dom';
import axios from 'axios';

export async function loader() {
    const jobs = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/jobs`, { withCredentials: true })
        .then(response => response = response?.data?.data)
        .catch(error => console.log(error, "|| Unable to fetch the jobs"))
    return { jobs };
}

function Jobs(props) {
    // const {jobs} = useLoaderData();
    console.log(jobs)

    
    function bringData(dataCategory) {}

    return (
        <main>
            <div className='flex flex-col sm:flex-row justify-between items-center p-4 '>
                <div>
                    <h1 className='font-bold text-2xl'>Available Job listings</h1>
                </div>
                <div className='border-2 rounded-full px-2 py-1 pl-3 bg-slate-100 flex flex-row'>
                    <input className='bg-slate-100 text-black' type="text" name="search" id="search" placeholder='search' />
                    <div className=' border-l-2 custom-input'><i className="ri-search-line px-2 focus:outline-slate-100 text-black"></i></div>
                </div>
                {'show' === 'show' && <div>
                    <button onClick={() => bringData("all")} className="bg-gray-200 w-20 hover:shadow-md rounded-l text-black">all</button>
                    <button onClick={() => bringData("approved")} className="bg-green-200 w-20 hover:shadow-md text-green-700">approved</button>
                    <button onClick={() => bringData("pending")} className="bg-yellow-200 w-20 hover:shadow-md text-yellow-600">pending</button>
                    <button onClick={() => bringData("regected")} className="bg-red-200 w-20 hover:shadow-md rounded-r text-red-600">regected</button>
                </div>}
            </div>
            <div className='flex flex-col justify-center items-center gap-1 flex-wrap'>
                {jobs.map(item => (<JobCard key={item._id} job={item} />))}
            </div>
        </main>
    );
}

export default Jobs;

