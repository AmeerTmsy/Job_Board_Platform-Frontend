import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

// export async function loader(params) {
//     const accountInfo = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/users/${id}`, { withCredentials: true })
//         .then(response => response?.data?.data)
//         .catch(error => console.log(error, "|| Unable to fetch the jobs"))
//     return { accountInfo };
// }
function Account(props) {
    // const { accountInfo } = useLoaderData()
    const navigate = useNavigate()

    function handlEdit(){ navigate('/user/account_edit')}
    function handlLogout(){}

    return (
        <div>
            <div className="flex flex-col w-full h-full p-6">
            {/* Employee Information Heading */}
            <h1 className="text-2xl font-semibold text-center mb-6">Your Account Information</h1>

            {/* Employee Profile */}
            <div className="flex flex-col md:flex-row items-center justify-center border p-6 rounded shadow-sm space-y-6 md:space-y-0 md:space-x-12">
                {/* Left side - Profile image, name, and contact info */}
                <div className="flex flex-col items-center w-1/2">
                    <img
                        src={"https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1522&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
                        alt={"candidate.name"}
                        className="w-52 h-52 rounded-full "
                    />
                    <h2 className="text-lg font-medium mb-4">{"candidate.name"}</h2>
                    <p className="text-sm text-gray-600">{"candidate.email"}</p>
                    <div className='flex flex-row justify-between gap-2 pt-3'>
                        <button onClick={handlEdit} className=' px-7 border rounded-sm bg-blue-600 hover:bg-blend-lighten'>Edit</button>
                        <button onClick={handlLogout} className=' px-5 border rounded-sm bg-red-500 hover:bg-blend-lighten'>Logout</button>
                    </div>
                </div>

                {/* Right side - Role and description */}
                <div className="flex flex-col items-center text-center md:text-left  w-1/2 border p-4 rounded-sm">
                    <h3 className="text-lg font-semibold mb-2">{"candidate.profession"}</h3>
                    <p className="text-sm text-gray-700">{"candidate.bio"} Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis maiores optio perspiciatis autem molestias voluptatem quas illo minima quos dolores. Distinctio omnis, nihil in eius veritatis nemo. Ut, reiciendis voluptas?
                    Modi, deserunt sunt animi nihil expedita ipsum laborum soluta impedit beatae vero molestiae at saepe eaque similique? Veritatis facere ab commodi quasi sit, enim distinctio voluptatum obcaecati nisi blanditiis alias.</p>
                </div>
            </div>
            <hr className='mt-5 border' />
            <div className='flex flex-row justify-center items-center p-3 border-2 mt-4 rounded bg-gray-100'>
                <p className='underline'><Link>see jobs listed by you</Link></p>
            </div>
        </div>
        </div>
    );
}

export default Account;