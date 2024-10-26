import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

function AccountEdit(props) {
    const { isLoggedIn, user } = useSelector(state => state.user);

    const { register, handleSubmit, setValue } = useForm();
    const [isEditing, setIsEditing] = useState({
        name: false, email: false, profession: false, experienced: false, bio: false,
    });
    // Initial form data
    const [formData, setFormData] = useState({
        name: 'Peter Parker',
        email: 'lukebelmar@gmail.com',
        profession: 'Product Manager',
        experienced: 2,
        bio: `Peter Parker, Product Manager at Asasar, brings a strong vision and leadership to the team. He has a talent for aligning product development with customer needs, ensuring timely delivery while maximizing innovation. Peter's approach balances creativity with strategic planning, making him instrumental in driving the success of projects and helping the company grow.`,
        profileImage: "https://thumbs.dreamstime.com/b/user-profile-vector-flat-illustration-avatar-person-icon-gender-neutral-silhouette-profile-picture-user-profile-vector-flat-304778094.jpg",
    });
    // Handle the form submission
    const onSubmit = (data) => {
        const updatedData = { ...formData, ...data };
        setFormData(updatedData);
        console.log('Entire Updated Data: ', updatedData);

        setIsEditing({
            name: false, email: false, profession: false, experienced: false, bio: false,
        });
    };

    // handle image upload
    const uploadImage = async (file) => {
        const formData = new FormData();
        formData.append('profileImage', file);
        
        // console.log("file",file);
        // console.log("formData", formData);

        try {
            const response = await axios.patch(`http://localhost:3000/users/${user.id}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data', },
                withCredentials: true,
            });
            setFormData((prevData) => ({
                ...prevData,
                profileImage: response?.data?.data?.profileImage,
            }));
            // console.log('Image uploaded and user updated successfully:', response.data.data.profileImage);
        } catch (error) {
            console.error('Error uploading image:', error);
        }

        setIsEditing((prev) => ({ ...prev, profileImage: false }));
    };

    // Handle enabling editing
    const enableEdit = (field) => {
        setIsEditing({ ...isEditing, [field]: true });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-3xl mx-auto p-6 pt-10 bg-white shadow-xl border-t rounded-lg">
            <h2 className="text-2xl font-semibold mb-4 text-center">Click the Fields to Edit</h2>

            <div className="flex items-start justify-between space-x-8">
                {/* Left Side: Profile Information */}
                <div className="w-1/3">
                    {/* Profile Picture Placeholder */}
                    {isEditing.profileImage ? (
                        <>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => uploadImage(e.target.files[0])}
                                className="block w-full mt-2 px-3 py-2 border rounded-md shadow-sm focus:ring focus:ring-blue-200"
                            />
                        </>
                    ) : (
                        <img
                            src={formData.profileImage}
                            alt="User profile"
                            className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                            onClick={() => enableEdit('profileImage')}
                        />
                    )}

                    {/* Name */}
                    {isEditing.name ? (
                        <input
                            {...register('name')}
                            defaultValue={formData.name}
                            className="block w-full px-3 py-2 border rounded-md shadow-sm focus:ring focus:ring-blue-200"
                        />
                    ) : (
                        <p className="text-center font-semibold" onClick={() => enableEdit('name')}>
                            {formData.name}
                        </p>
                    )}

                    {/* Email */}
                    {isEditing.email ? (
                        <input
                            {...register('email')}
                            defaultValue={formData.email}
                            className="block w-full mt-2 px-3 py-2 border rounded-md shadow-sm focus:ring focus:ring-blue-200"
                        />
                    ) : (
                        <p className="text-center text-gray-500" onClick={() => enableEdit('email')}>
                            {formData.email}
                        </p>
                    )}

                    {/* Experience */}
                    {isEditing.experienced ? (
                        <input
                            {...register('experienced')}
                            defaultValue={formData.experienced}
                            className="block w-full mt-2 px-3 py-2 border rounded-md shadow-sm focus:ring focus:ring-blue-200"
                        />
                    ) : (
                        <p className="text-center text-gray-500 mt-2" onClick={() => enableEdit('experienced')}>
                            {formData.experienced} year experienced
                        </p>
                    )}
                </div>

                {/* Right Side: Role Description */}
                <div className="w-2/3">
                    {/* <h3 className="font-semibold mb-2">Product Manager</h3> */}
                    {isEditing.profession ? (
                        <input
                            {...register('profession')}
                            defaultValue={formData.profession}
                            className="block mb-3 px-3 py-2 border rounded-md shadow-sm focus:ring focus:ring-blue-200"
                        />
                    ) : (
                        <h3 className="font-semibold mb-2 " onClick={() => enableEdit('profession')}>{formData.profession}</h3>

                    )}
                    {isEditing.bio ? (
                        <textarea
                            {...register('bio')}
                            defaultValue={formData.bio}
                            className="block w-full h-48 px-3 py-2 border rounded-md shadow-sm focus:ring focus:ring-blue-200"
                        />
                    ) : (
                        <p className="text-gray-600" onClick={() => enableEdit('bio')}>
                            {formData.bio}
                        </p>
                    )}

                    {/* Update Button */}
                    <button
                        type="submit"
                        className="w-full mt-4 bg-blue-400 text-white py-2 rounded-md hover:bg-blue-500 transition duration-200"
                    >
                        Update Changes
                    </button>
                </div>
            </div>
        </form>
    );
}

export default AccountEdit;