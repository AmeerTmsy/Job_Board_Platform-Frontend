import React from 'react';
import { companies } from "../fakeUtilities/myUtils"
import { Link } from 'react-router-dom';
import CompanyCard from '@/myComponents/CompanyCard';

function Companies(props) {

    
    function bringData(dataCategory) {}
    
return (
        <div className="flex flex-col w-full h-full p-6">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-semibold">Listed Companies</h1>
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

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {companies.map((company, index) => (
                    <CompanyCard key={index} company={company} />
                ))}
            </div>
        </div>
    );
}

export default Companies;