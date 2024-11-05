
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useFetchList } from '@/myHooks/fetchList';
import { SkeletonCard } from '@/myComponents/SkeletonCard';
import SearchBar from '@/myComponents/searchBar';

function Employees(props) {
    const [urlParam, setUrlParam] = useState('')

    useEffect(() => {
        console.log("urlParam: ", urlParam)
    }, [urlParam]);

    const [employees, loading, error] = useFetchList(`users${urlParam}`);

    return (
        <div className="flex flex-col w-full h-full p-6">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
                <h1 className="text-2xl font-semibold p-3 sm:p-0">Ready to work candidate</h1>
                <div>
                    <SearchBar field='Employee' setUrlParam={setUrlParam}/>
                </div>
            </div>
            {loading === true ?
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {Array.from({ length: 6 }).map((_, index) => (
                        <div key={index} className=" p-4 rounded-lg shadow-sm flex flex-row justify-center">
                            <SkeletonCard key={index} />
                        </div>
                    ))}
                </div>
                :
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {employees.map((employee, index) => (
                        <div key={index} className="border p-4 rounded-lg shadow-sm">
                            <Link to={`/employer/employees/${employee._id}`}>
                                <div className="flex flex-col items-center">
                                    <img
                                        src={employee.profileImage}
                                        alt={employee.name}
                                        className="w-28 h-28 rounded-full object-cover mb-4"
                                    />
                                    <h2 className="text-lg font-medium">{employee.name}</h2>
                                    <p className="text-sm text-gray-600">{employee.profession}</p>
                                    <p className="text-sm text-gray-600">{employee.experienced} year experience</p>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            }
        </div>
    );
}

export default Employees;
