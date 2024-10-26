
import { jobs } from '@/fakeUtilities/myUtils';
import React from 'react';
import { Link, useParams } from 'react-router-dom';

function EmployerJobDetail(props) {

    const params = useParams()
    const [job] = jobs.filter(job => job._id === params.id)
    console.log(job)

    return (
        <div className="max-w-4xl mx-auto mt-10 mx-3">
            <h2 className="text-center text-2xl font-bold mb-6">Job Details</h2>
            {/* Responsive layout: Flex-row on large screens, Flex-col on medium and smaller screens */}
            <div className="flex flex-col md:flex-row justify-between border border-gray-300 rounded-lg p-4">
                {/* Left Section */}
                <div className="w-full md:w-1/2 p-4 border-b md:border-b-0 md:border-r border-gray-200">
                    <h3 className="text-lg font-bold mb-2">{job.title}</h3>
                    <p className="text-gray-700">{job.company}</p>
                    <p className="text-gray-600">Location: {job.location}</p>
                    <p className="text-gray-600">Job type: {job.jobType}</p>
                    <p className="text-gray-600 mb-4">Salary: {job.salary}</p>
                    <hr />
                    <div className='flex flex-col justify-center items-center h-2/4'>
                        <p className='mb-5'>To update information about this job Click on the fields to make changes</p>
                        <Link to={`/employer/employer_job_edit/${job._id}`} className="bg-blue-100 hover:bg-blue-200 text-blue-600 py-2 px-6 rounded">
                            Update Job Information
                        </Link>
                    </div>
                </div>
                {/* Right Section */}
                <div className="w-full md:w-1/2 p-4">
                    <h3 className="text-lg font-bold mb-4">
                        {job.headline}
                    </h3>
                    <p className="text-gray-700">
                        {job.description}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default EmployerJobDetail;