import axios from 'axios';
import React from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import { candidates } from "../fakeUtilities/myUtils"

export async function loader(params) {
    console.log(import.meta.env.VITE_API_BASE_URL)
    const employees = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/users`, { withCredentials: true })
        .then(response => response?.data?.data)
        .catch(error => console.log(error, "|| Unable to fetch the jobs"))
    return { employees };
}
function Employees(props) {
    const { employees } = useLoaderData()
    // console.log(employees);

    return (
        <div className="flex flex-col w-full h-full p-6">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-semibold">Ready to work candidate</h1>
                <div className='border-2 rounded-full px-2 py-1 pl-3 bg-slate-100 flex flex-row'>
                    <input className='bg-slate-100' type="text" name="search" id="search" placeholder='search' />
                    <div className=' border-l-2 custom-input'><i className="ri-search-line px-2 focus:outline-slate-100 text-black"></i></div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {candidates.map((candidate, index) => (
                    <div key={index} className="border p-4 rounded-lg shadow-sm">
                        {console.log(candidate.id)}
                        <Link to={`/employer/employees/${candidate._id}`}>
                            <div className="flex flex-col items-center">
                                <img
                                    src={candidate.profileImage}
                                    alt={candidate.name}
                                    className="w-28 h-28 rounded-full mb-4"
                                />
                                <h2 className="text-lg font-medium">{candidate.name}</h2>
                                <p className="text-sm text-gray-600">{candidate.profession}</p>
                                <p className="text-sm text-gray-600">{candidate.experienced} year experience</p>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Employees;
