import React from 'react';
import { useParams } from 'react-router-dom';
import { useFetchDataDetail } from '@/myHooks/fetchDataDetail';
import { SkeletonCard } from '@/myComponents/SkeletonCard';

function Employee(props) {
    const { id } = useParams()
    const [user, loading, error] = useFetchDataDetail(`users/${id}`);

    return (
        <div className="flex flex-col w-full h-full p-6">
            <h1 className="text-2xl font-semibold text-center mb-6">Employee Information</h1>

            {loading !== false ?
                <div className="flex flex-col md:flex-row items-center justify-center border p-6 rounded-lg shadow-sm space-y-6 md:space-y-0 md:space-x-12">
                    <SkeletonCard />
                </div>
                :
                <div className="flex flex-col md:flex-row items-center justify-center border p-6 rounded-lg shadow-sm space-y-6 md:space-y-0 md:space-x-12">
                    <div className="flex flex-col items-center w-1/2">
                        <img
                            src={user.profileImage}
                            alt={user.name}
                            className="w-52 h-52 rounded-full "
                        />
                        <h2 className="text-lg font-medium mb-4">{user.name}</h2>
                        <p className="text-sm text-gray-600">{user.email}</p>
                        <p className="text-sm text-gray-600">{user.experienced} year experience</p>
                    </div>
                    <div className="flex flex-col items-center text-center md:text-left  w-1/2 border p-4 rounded-sm">
                        <h3 className="text-lg font-semibold mb-2">{user.profession}</h3>
                        <p className="text-sm text-gray-700">{user.bio}</p>
                    </div>
                </div>
            }
        </div>
    );
}

export default Employee;