import React from 'react';
import { jobs } from '@/fakeUtilities/myUtils';
import { Link } from 'react-router-dom';
import CompanyJobAddDropdown from '@/myComponents/companyJobAddDropdown';

function EmployerJobListed(props) {
    return (
        <main>
            <div className='flex flex-col sm:flex-row justify-between items-center p-4 '>
                <div>
                    <h1 className='font-bold text-2xl'>Emploer Job listings</h1>
                </div>
                <div className='flex flex-row justify-center items-center gap-3'>
                    <div className='border-2 rounded-full px-2 py-1 pl-3 bg-slate-100 flex flex-row'>
                        <input className='bg-slate-100' type="text" name="search" id="search" placeholder='search' />
                        <div className=' border-l-2 custom-input'><i className="ri-search-line px-2 focus:outline-slate-100 text-black"></i></div>
                    </div>
                    <div className='flex justify-center items-center'>
                            <CompanyJobAddDropdown />
                    </div>
                </div>
            </div>
            <div className='flex flex-col justify-center items-center gap-1 flex-wrap'>
                {jobs.map(job => (
                    <div key={job._id} className='m-2 py-1 sm:px-5 px-10 md:w-2/5 rounded-md shadow-md hover:shadow-inner bg-lime-50 text-black'>
                        <h3 className='font-bold'>{job.title}</h3>
                        <p className='pb-2'>Location: {job.location}</p>
                        <hr />
                        <p>requirement: {job.headline}</p>
                        <p>Strts from: ₹{job.salary}</p>
                        <p>{job.company}</p>
                        <Link to={`/employer/employer_job_detail/${job._id}`} className='text-blue-400 underline'>more</Link>
                    </div>
                ))}
            </div>
        </main>
    );
}

export default EmployerJobListed;