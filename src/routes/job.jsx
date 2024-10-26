import React from 'react';
import { Link } from 'react-router-dom';

function Job(props) {
    return (
        <div className="max-w-4xl mx-auto mt-10 mx-3">
            <h2 className="text-center text-2xl font-bold mb-6">Job Details</h2>
            {/* Responsive layout: Flex-row on large screens, Flex-col on medium and smaller screens */}
            <div className="flex flex-col md:flex-row justify-between border border-gray-300 rounded-lg p-4">
                {/* Left Section */}
                <div className="w-full md:w-1/2 p-4 border-b md:border-b-0 md:border-r border-gray-200">
                    <h3 className="text-lg font-bold mb-2">Product Manager</h3>
                    <p className="text-gray-700">Malabar Traders</p>
                    <p className="text-gray-600">Location: Kochi, Kerala</p>
                    <p className="text-gray-600">Job type: Work from home</p>
                    <p className="text-gray-600 mb-4">Salary: 10,000 to 25,000</p>
                    <hr />
                    <div className='flex flex-col justify-center items-center h-2/4'>
                        <p className='mb-5'>Login to apply for the job</p>
                        <Link to={'/login'} className="bg-blue-100 hover:bg-blue-200 text-blue-600 py-2 px-6 rounded">
                            login
                        </Link>
                    </div>
                </div>
                {/* Right Section */}
                <div className="w-full md:w-1/2 p-4">
                    <h3 className="text-lg font-bold mb-4">
                        Looking for a product manager with 2 years experience
                    </h3>
                    <p className="text-gray-700">
                        We are seeking a skilled and motivated Product Manager with 2 years
                        of experience to join our team. The ideal candidate will have a
                        proven track record in managing the product lifecycle, from ideation
                        to launch, and a deep understanding of market trends. If you have a
                        passion for creating innovative solutions and driving product
                        success, we'd love to hear from you!
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Job;