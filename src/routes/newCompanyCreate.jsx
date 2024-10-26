import React from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

function NewCompanyCreate() {
    const {isLoggedIn, user} = useSelector(state => state.user);
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        data = { ...data, createdBy: user.id }
        console.log(data);
        // handle form submission here
    };

    return (
        <main>
            <h1 className="text-2xl font-bold mb-4 py-5 text-center">Create New Company</h1>
            <div className="max-w-lg mx-auto bg-slate-50 p-8 shadow-xl  rounded-md">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="block mb-1 font-semibold">Name</label>
                            <input
                                type="text"
                                {...register("name", { required: "Name is required" })}
                                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                        </div>
                        <div>
                            <label className="block mb-1 font-semibold">Location</label>
                            <input
                                type="text"
                                {...register("location", { required: "Location is required" })}
                                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                            {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location.message}</p>}
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="block mb-1 font-semibold">Industry</label>
                        <input
                            type="text"
                            {...register("industry", { required: "Industry is required" })}
                            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                        {errors.industry && <p className="text-red-500 text-sm mt-1">{errors.industry.message}</p>}
                    </div>

                    <div className="mb-4">
                        <label className="block mb-1 font-semibold">Website</label>
                        <input
                            type="url"
                            {...register("website", { required: "Website is required", pattern: { value: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/, message: "Invalid URL" } })}
                            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                        {errors.website && <p className="text-red-500 text-sm mt-1">{errors.website.message}</p>}
                    </div>

                    <div className="mb-4">
                        <label className="block mb-1 font-semibold">Description</label>
                        <textarea
                            {...register("description", { required: "Description is required" })}
                            rows="4"
                            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                        {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white p-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                        Create Company
                    </button>
                </form>
            </div>
        </main>
    );
}

export default NewCompanyCreate;
