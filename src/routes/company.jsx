import React from 'react';
import { companies } from '@/fakeUtilities/myUtils';
import { Link, useParams } from 'react-router-dom';

// export async function loader(params) {
//     const company = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/users/${id}`, { withCredentials: true })
//         .then(response => response?.data?.data)
//         .catch(error => console.log(error, "|| Unable to fetch the jobs"))
//     return { company };
// }
function Company(props) {
    // const { company } = useLoaderData()
    const userType = 'employer';
    const params = useParams()
    const [company] = companies.filter(company => company._id === params.id)
    console.log(company.createdBy)

    return (
        <div className="flex flex-col w-full h-full p-6">
            {/* Employee Information Heading */}
            <h1 className="text-2xl font-semibold text-center mb-6">{company.name}</h1>

            {/* Employee Profile */}
            <div className="flex flex-col md:flex-row items-center justify-center border p-6 rounded-lg shadow-sm space-y-6 md:space-y-0 md:space-x-12">
                {/* Left side - Profile image, name, and contact info */}
                <div className="flex flex-col items-center w-1/2">
                    <img
                        src={company.logo}
                        alt={company.name}
                        className="w-52 h-52 rounded-full"
                    />
                    <h2 className="text-lg font-medium mb-4">{company.name}</h2>
                    <p className="text-sm text-gray-600">{company.industry}</p>
                    <p className="text-sm text-gray-600">{company.location}</p>
                </div>

                {/* Right side - Role and description */}
                <div className="flex flex-col items-center text-center md:text-left  w-1/2 border p-4 rounded-sm">
                    {/* <h3 className="text-lg font-semibold mb-2">{company.role}</h3> */}
                    <p className="text-sm text-gray-700 pb-2 ">{company.description}</p>
                    <p className="text-sm text-gray-700 underline self-start">{company.website}</p>
                    {
                        userType === "employer" && <Link to={`/employer/edit_company/${company._id}`} className='self-start bg-blue-600 border mt-2 px-7 py-1 rounded' >edit</Link>
                    }
                </div>
            </div>
        </div>
    );
}

export default Company;