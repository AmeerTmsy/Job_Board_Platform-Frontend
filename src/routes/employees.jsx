
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { candidates } from "../fakeUtilities/myUtils"
import { useFetchList } from '@/myHooks/fetchList';
import { SkeletonCard } from '@/myComponents/SkeletonCard';

function Employees(props) {
    const [employees, loading, error] = useFetchList('users');

    // console.log("Loading:", loading);
    // console.log("Employees:", employees);

    return (
        <div className="flex flex-col w-full h-full p-6">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-semibold">Ready to work candidate</h1>
                <div className='border-2 rounded-full px-2 py-1 pl-3 bg-slate-100 flex flex-row'>
                    <input className='bg-slate-100' type="text" name="search" id="search" placeholder='search' />
                    <div className=' border-l-2 custom-input'><i className="ri-search-line px-2 focus:outline-slate-100 text-black"></i></div>
                </div>
            </div>
            {loading === true ?
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {Array.from({ length: 6 }).map((_, index) => (
                        <div className=" p-4 rounded-lg shadow-sm flex flex-row justify-center">
                            <SkeletonCard key={index} />
                        </div>
                    ))}
                </div>
                :
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {employees.map((employee, index) => (
                        <div key={index} className="border p-4 rounded-lg shadow-sm">
                            {console.log(employee.id)}
                            <Link to={`/employer/employees/${employee._id}`}>
                                <div className="flex flex-col items-center">
                                    <img
                                        src={employee.profileImage}
                                        alt={employee.name}
                                        className="w-28 h-28 rounded-full mb-4"
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
