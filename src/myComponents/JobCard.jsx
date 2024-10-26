import React from 'react';
import { Link } from 'react-router-dom';

function JobCard({ job }) {
    return (
        <div className='relative m-2 py-4 sm:px-5 px-10 md:w-2/5 rounded-md ease-in-out duration-300 hover:shadow-md bg-lime-50 text-black'>
            {/* Approved Label */}
            {'show' === 'show' && <span className="absolute top-3 right-0 bg-green-200 text-green-700 text-xs font-semibold px-2 py-1 rounded-l">
                approved
            </span>}

            {/* Job Details */}
            <h3 className="text-lg font-bold">{job.title}</h3>
            <p className="pb-2">Location: {job.location}</p>
            <hr />
            <p>requirement: {job.headline}</p>
            <p>Starts from: ₹{job.salary}</p>
            <p>{job.company}</p>
            <Link to={`/jobs/${job._id}`} className="text-blue-400 underline">see more</Link>
        </div>
    );
}

export default JobCard;