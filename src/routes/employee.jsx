import React from 'react';
import { candidates } from '@/fakeUtilities/myUtils';
import { useParams } from 'react-router-dom';

// export async function loader(params) {
//     const employee = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/users/${id}`, { withCredentials: true })
//         .then(response => response?.data?.data)
//         .catch(error => console.log(error, "|| Unable to fetch the jobs"))
//     return { employee };
// }

function Employee(props) {
    // const { employee } = useLoaderData()
    const params = useParams()
    const [candidate] = candidates.filter(candidate => candidate._id === params.id)
    console.log(candidate)


    return (
        <div className="flex flex-col w-full h-full p-6">
            {/* Employee Information Heading */}
            <h1 className="text-2xl font-semibold text-center mb-6">Employee Information</h1>

            {/* Employee Profile */}
            <div className="flex flex-col md:flex-row items-center justify-center border p-6 rounded-lg shadow-sm space-y-6 md:space-y-0 md:space-x-12">
                {/* Left side - Profile image, name, and contact info */}
                <div className="flex flex-col items-center w-1/2">
                    <img
                        src={candidate.profileImage}
                        alt={candidate.name}
                        className="w-52 h-52 rounded-full "
                    />
                    <h2 className="text-lg font-medium mb-4">{candidate.name}</h2>
                    <p className="text-sm text-gray-600">{candidate.email}</p>
                    <p className="text-sm text-gray-600">{candidate.experienced} year experience</p>
                </div>

                {/* Right side - Role and description */}
                <div className="flex flex-col items-center text-center md:text-left  w-1/2 border p-4 rounded-sm">
                    <h3 className="text-lg font-semibold mb-2">{candidate.profession}</h3>
                    <p className="text-sm text-gray-700">{candidate.bio}</p>
                </div>
            </div>
        </div>
    );
}

export default Employee;