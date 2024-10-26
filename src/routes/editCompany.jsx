import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { companyData } from '@/fakeUtilities/myUtils';

function EditCompany(props) {
    const { register, handleSubmit, setValue } = useForm();
    const [editField, setEditField] = useState(null);
    const [isEditing, setIsEditing] = useState({
        name: false, location: false, industry: false, website: false, description: false, logo: false
    });
    // Pre-fill form with company data
    React.useEffect(() => {
        setValue("name", companyData.name);
        setValue("location", companyData.location);
        setValue("industry", companyData.industry);
        setValue("website", companyData.website);
        setValue("description", companyData.description);
    }, [companyData, setValue]);

    // Submit handler
    const onSubmit = async (data) => {
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("location", data.location);
        formData.append("industry", data.industry);
        formData.append("website", data.website);
        formData.append("description", data.description);

        // If a new logo is uploaded, append it to formData
        if (data.logo[0]) {
            formData.append("companyIconImage", data.logo[0]);
        }

        console.log(data);


        // try {
        //     const response = await axios.patch(
        //         `http://localhost:3000/companies/${companyData.id}`,
        //         formData,
        //         { headers: { "Content-Type": "multipart/form-data" } }
        //     );
        //     console.log("Company updated:", response.data);
        // } catch (error) {
        //     console.error("Error updating company:", error);
        // }
        setIsEditing({
            name: false, location: false, industry: false, website: false, description: false, logo: false
        });
    };

    // Enable editing when a field is clicked
    // const enableEdit = (field) => {
    //     setEditField(field);
    // };
    const enableEdit = (field) => {
        setIsEditing({ ...isEditing, [field]: true });
    };

    return (
        <main>
            <h2 className="text-2xl font-semibold mb-4 text-center">Click the Fields to Edit</h2>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="p-4 max-w-2xl mx-auto bg-white shadow-md rounded-lg"
            >
                {/* Logo */}
                <div
                    className="flex justify-center mb-4"
                    onClick={() => enableEdit("logo")}
                >
                    {isEditing.logo === true ? (
                        <div className="ml-4 rounded">
                            <input
                                type="file"
                                accept="image/*"
                                {...register("logo")}
                                className="mt-2"
                            />
                        </div>
                    ) : (
                        <img
                            src={companyData.logo}
                            alt="Company Logo"
                            className="w-24 h-24 object-cover rounded-full border"
                        />
                    )}
                </div>

                {/* Name */}
                <div
                    className="mb-4"
                    onClick={() => enableEdit("name")}
                >
                    {isEditing.name === true ? (
                        <input
                            type="text"
                            {...register("name")}
                            className="border p-2 w-full  rounded"
                        />
                    ) : (
                        <h2 className="text-lg font-bold border-b">
                            {companyData.name}
                        </h2>
                    )}
                </div>

                {/* Industry */}
                <div
                    className="mb-4"
                    onClick={() => enableEdit("industry")}
                >
                    {isEditing.industry === true ? (
                        <input
                            type="text"
                            {...register("industry")}
                            className="border p-2 w-full rounded"
                        />
                    ) : (
                        <p className="text-sm text-gray-500 border-b">{companyData.industry}</p>
                    )}
                </div>

                {/* Location */}
                <div
                    className="mb-4"
                    onClick={() => enableEdit("location")}
                >
                    {isEditing.location === true ? (
                        <input
                            type="text"
                            {...register("location")}
                            className="border p-2 w-full rounded"
                        />
                    ) : (
                        <p className="text-sm text-gray-500 border-b">{companyData.location}</p>
                    )}
                </div>

                {/* Website */}
                <div
                    className="mb-4"
                    onClick={() => enableEdit("website")}
                >
                    {isEditing.website === true ? (
                        <input
                            type="text"
                            {...register("website")}
                            className="border p-2 w-full rounded"
                        />
                    ) : (
                        <div className=' border-b'>
                            <a
                                // href={companyData.website}
                                className="text-blue-500 underline "
                                target="_blank"
                                rel="noreferrer"
                            >
                                {companyData.website}
                            </a>
                        </div>
                    )}
                </div>

                {/* Description */}
                <div
                    className="mb-4"
                    onClick={() => enableEdit("description")}
                >
                    {isEditing.description === true ? (
                        <textarea
                            {...register("description")}
                            className="border p-2 w-full rounded"
                        />
                    ) : (
                        <p>{companyData.description}</p>
                    )}
                </div>

                {/* Submit button */}
                <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded"
                >
                    Update Company
                </button>
            </form>
        </main>
    );
}

export default EditCompany;
