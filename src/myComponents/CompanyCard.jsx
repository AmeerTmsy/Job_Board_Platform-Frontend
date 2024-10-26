import React from 'react';
import { Link } from 'react-router-dom';

function CompanyCard({ company }) {
    const userType = 'employer';
    
    return (
        <div key={company._id} className="border p-4 rounded-lg shadow-sm">
            {/* {console.log(candidate.id)} */}
            <Link to={`/${userType}/companies/${company._id}`}>
                <div className="flex flex-col items-center">
                    <img
                        src={'https://frontendehubbucket.s3.ap-south-1.amazonaws.com/frontend/profile/dashboard/default_company_logo.png'}
                        alt={company.name}
                        className="w-28 h-28 rounded-full mb-4"
                    />
                    <h2 className="text-lg font-medium">{company.name}</h2>
                    <p className="text-sm text-gray-600">{company.industry}</p>
                    <p className="text-sm text-gray-600">{company.location}</p>
                </div>
            </Link>
        </div>
    );
}

export default CompanyCard;