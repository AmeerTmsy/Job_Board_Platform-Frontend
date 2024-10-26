import React from 'react';

import { ownCompanies } from '@/fakeUtilities/myUtils';
import CompanyCard from '@/myComponents/CompanyCard';

function MyCompanies(props) {
    return (
        <div className="flex flex-col w-full h-full p-6">
        <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-semibold">Listed Companies</h1>
            <div className='border-2 rounded-full px-2 py-1 pl-3 bg-slate-100 flex flex-row'>
                <input className='bg-slate-100' type="text" name="search" id="search" placeholder='search' />
                <div className=' border-l-2 custom-input'><i className="ri-search-line px-2 focus:outline-slate-100 text-black"></i></div>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ownCompanies.map((company, index) => (
                <CompanyCard company={company} key={company._id} />
            ))}
        </div>
    </div>
    );
}

export default MyCompanies;