import { SkeletonCard } from '@/myComponents/SkeletonCard';
import { useFetchList } from '@/myHooks/fetchList';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function Applications({ job }) {


    const { user } = useSelector(state => state.user);
    const [applications, applicationLoading, applicationError] = useFetchList(`applications?jobId=${job._id}`);

    useEffect(() => {
        console.log(applications)
    }, [applications]);
    return (
        <div>
            {applicationLoading === true ?
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {Array.from({ length: 3 }).map((_, index) => (
                        <div key={index} className=" p-4 rounded-lg shadow-sm flex flex-row justify-center">
                            <SkeletonCard key={index} />
                        </div>
                    ))}
                </div>
                :
                applications &&
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 place-items-center mx-auto pt-5">
                    {applications.map(item =>
                        <div className='p-5 border m-1 rounded-sm'>
                            <h2 className="text-lg font-medium">{item.userId.name}</h2>
                            <p className="text-sm text-gray-600">{item.userId.profession}</p>
                            <p className="text-sm text-gray-600">experience: {item.userId.experienced}</p>
                            <a
                                href={item.resume}
                                target="_blank"
                                rel="noopener noreferrer" // For security purposes
                                className="bg-blue-600 text-white text-xs px-1 rounded-full hover:bg-blue-700 block text-center mt-3"
                            > View Resume </a>
                            <Link to={`/employer/employees/${item.userId._id}`} className='cursor-pointer text-xs text-blue-600 underline mt-3 block'>see the candidate</Link>
                        </div>
                    )}
                </div>
            }
        </div>
    );
}

export default Applications;