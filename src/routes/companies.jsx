import React, { useState } from 'react';
import { companiez } from '@/fakeUtilities/myUtils';
import { Link } from 'react-router-dom';
import CompanyCard from '@/myComponents/CompanyCard';
import { useFetchList } from '@/myHooks/fetchList';
import { SkeletonCard } from '@/myComponents/SkeletonCard';
import { useSelector } from 'react-redux';

function Companies(props) {

    const { user, isLoggedIn } = useSelector(state => state.user);
    const myUserType = user.userType;
    const [urlParam, setUrlParam] = useState('')

    const bringData = async (companiesVerificaion) => {
        if (companiesVerificaion === 'approved') {
            setUrlParam("?verifiedCompany=approved");
        } else if (companiesVerificaion === 'pending') {
            setUrlParam("?verifiedCompany=pending");
        } else if (companiesVerificaion === 'rejected') {
            setUrlParam("?verifiedCompany=rejected");
        } else {
            setUrlParam("");
        }
    }
    const [companies, loading, error] = useFetchList(`companies${user.userType === 'admin' ? urlParam : `?verifiedCompany=approved`}`);
    // const loading = true;
    // console.log("companies:", companies);
    // console.log("loading:", loading);


    return (
        <div className="flex flex-col w-full h-full p-6">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-semibold">Listed Companies</h1>
                <div className='border-2 rounded-full px-2 py-1 pl-3 bg-slate-100 flex flex-row'>
                    <input className='bg-slate-100 text-black' type="text" name="search" id="search" placeholder='search' />
                    <div className=' border-l-2 custom-input'><i className="ri-search-line px-2 focus:outline-slate-100 text-black"></i></div>
                </div>
                {myUserType === 'admin' && <div>
                    <button onClick={() => bringData("all")} className="bg-gray-200 w-20 hover:shadow-md rounded-l text-black">all</button>
                    <button onClick={() => bringData("approved")} className="bg-green-200 w-20 hover:shadow-md text-green-700">approved</button>
                    <button onClick={() => bringData("pending")} className="bg-yellow-200 w-20 hover:shadow-md text-yellow-600">pending</button>
                    <button onClick={() => bringData("rejected")} className="bg-red-200 w-20 hover:shadow-md rounded-r text-red-600">regected</button>
                </div>}
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
                <div>
                    {error === 'Jobs not found' ?
                        <div className='flex flex-col sm:flex-row justify-center items-center p-4'> not any jobs </div>
                        :
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                       { companies.map((company, index) => (
                            <CompanyCard key={index} company={company} />
                            ))}
                        </div>
                    }
                </div>
            }
        </div>
    );
}

export default Companies;