import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { companyNames } from '@/fakeUtilities/myUtils';
import { sampleJobDetails } from '@/fakeUtilities/myUtils';

function EmployerJobEdit(props) {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();

    const onSubmit = (data) => {
        console.log(data);
    };

    useEffect(() => {
        // Set initial values based on sampleJobDetails
        setValue("title", sampleJobDetails.title);
        setValue("company", sampleJobDetails.company);
        setValue("headline", sampleJobDetails.headline);
        setValue("jobType", sampleJobDetails.jobType);
        setValue("hiring", sampleJobDetails.hiring.toString()); // Convert to string for <select> value compatibility
        setValue("salary", sampleJobDetails.salary);
        setValue("location", sampleJobDetails.location);
        setValue("description", sampleJobDetails.description);
    }, [setValue]);

    return (
        <div className="p-6 max-w-lg mx-auto">
            <h1 className="text-2xl font-semibold text-center mb-4">Edit Job</h1>
            <div className="border shadow-md p-4 rounded-lg bg-white">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* Title and Company */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <input
                                type="text"
                                placeholder="Title"
                                {...register("title", { required: "Title is required" })}
                                className="border p-2 rounded w-full"
                            />
                            {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
                        </div>
                        <div>
                            <select
                                {...register("company", { required: "Company selection is required" })}
                                className="border p-2 rounded w-full"
                            >
                                <option value="">Company</option>
                                <option value={sampleJobDetails.company}>{sampleJobDetails.company}</option>
                                {companyNames.map((company) => (
                                    (company.name !== sampleJobDetails.company) &&
                                    <option key={company.id} value={company.name}>{company.name}</option>
                                ))}
                            </select>
                            {errors.company && <p className="text-red-500 text-sm">{errors.company.message}</p>}
                        </div>
                    </div>

                    {/* Headline */}
                    <div>
                        <input
                            type="text"
                            placeholder="Headline"
                            {...register("headline", { required: "Headline is required" })}
                            className="border p-2 rounded w-full"
                        />
                        {errors.headline && <p className="text-red-500 text-sm">{errors.headline.message}</p>}
                    </div>

                    {/* Job Type, Hiring, and Salary */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <select
                                {...register("jobType", { required: "Job type is required" })}
                                className="border p-2 rounded w-full"
                            >
                                <option value="">Work type</option>
                                <option value="part-time">Part-time</option>
                                <option value="full-time">Full-time</option>
                            </select>
                            {errors.jobType && <p className="text-red-500 text-sm">{errors.jobType.message}</p>}
                        </div>

                        <div>
                            <select
                                {...register("hiring", { required: "Hiring selection is required" })}
                                className="border p-2 rounded w-full"
                            >
                                <option value="">Hiring</option>
                                <option value="true">Yes</option>
                                <option value="false">No now</option>
                            </select>
                            {errors.hiring && <p className="text-red-500 text-sm">{errors.hiring.message}</p>}
                        </div>

                        <div>
                            <input
                                type="number"
                                placeholder="Salary"
                                {...register("salary", { required: "Salary is required", min: { value: 0, message: "Salary must be a positive number" } })}
                                className="border p-2 rounded w-full"
                            />
                            {errors.salary && <p className="text-red-500 text-sm">{errors.salary.message}</p>}
                        </div>
                    </div>

                    {/* Location */}
                    <div>
                        <input
                            type="text"
                            placeholder="Location"
                            {...register("location", { required: "Location is required" })}
                            className="border p-2 rounded w-full"
                        />
                        {errors.location && <p className="text-red-500 text-sm">{errors.location.message}</p>}
                    </div>

                    {/* Description */}
                    <div>
                        <textarea
                            placeholder="Description"
                            {...register("description", { required: "Description is required" })}
                            className="border p-2 rounded w-full"
                            rows="5"
                        ></textarea>
                        {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
}

export default EmployerJobEdit;