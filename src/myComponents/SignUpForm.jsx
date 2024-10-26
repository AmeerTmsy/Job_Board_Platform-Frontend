import React from 'react';
import { useForm } from "react-hook-form";
import { Link } from 'react-router-dom';
import ErrorMessage from './SignUpErrorMessage';
import { useTheme } from 'next-themes';

function SignUpForm(props) {
    const { theme, setTheme } = useTheme();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const password = watch('password');

    const onSubmit = (data) => {
        delete data.confirmPassword;
        console.log(data);
    }

    return (
        <div className='px-3'>
            <form onSubmit={handleSubmit(onSubmit)} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">

                <div className="mb-4">
                    <input
                        {...register("name", { required: true })}
                        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline  ${theme === 'dark' ?'text-white' :''}`}
                        type="text"
                        placeholder="Name"
                    />
                    <ErrorMessage error={errors.name} fieldName="name" />
                </div>

                <div className="mb-4 grid grid-cols-2 gap-4">
                    <input
                        {...register("profession", { required: true })}
                        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline  ${theme === 'dark' ?'text-white' :''}`}
                        type="text"
                        placeholder="Your Profession"
                    />
                    <input
                        {...register("experienced", { required: true })}
                        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline  ${theme === 'dark' ?'text-white' :''}`}
                        type="text"
                        placeholder="Years of experience"
                    />
                    <ErrorMessage error={errors.profession} fieldName="profession" />
                    <ErrorMessage error={errors.experienced} fieldName="experienced" />
                </div>

                <div className="mb-4">
                    <textarea
                        {...register("bio", { required: true })}
                        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline  ${theme === 'dark' ?'text-white' :''}`}
                        placeholder="Bio"
                    />
                    <ErrorMessage error={errors.bio} fieldName="bio" />
                </div>

                <div className="mb-4">
                    <input
                        {...register("email", { required: true, pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ })}
                        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline  ${theme === 'dark' ?'text-white' :''}`}
                        type="email"
                        placeholder="Email"
                    />
                    <ErrorMessage error={errors.email} fieldName="email" />
                </div>

                <div className="mb-4 grid grid-cols-2 gap-4">
                    <input
                        {...register("password", {
                            required: true,
                            pattern: {
                                value: /^.{4,}$/,
                                message: "Password must be at least 8 characters, with at least one uppercase letter, one lowercase letter, and one number"
                            }
                        })}
                        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline  ${theme === 'dark' ?'text-white' :''}`}
                        type="password"
                        placeholder="Password"
                    />
                    <input
                        {...register("confirmPassword", {
                            required: true,
                            validate: value => value === password || "Passwords do not match"
                        })}
                        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${theme === 'dark' ?'text-white' :''}`}
                        type="password"
                        placeholder="Confirm password"
                    />
                    <ErrorMessage error={errors.password} fieldName="password" />
                    <ErrorMessage error={errors.confirmPassword} fieldName="confirmPassword" />
                </div>

                <div className="mb-4">
                    <div>
                        <label className="text-black cursor-pointer">
                            <input
                                {...register("userType", { required: true })}
                                type="radio"
                                value="employee"
                                className='appearance-none h-3 w-3 focus:h-2 focus:w-2 border border-black rounded-full checked:bg-blue-300 checked:border-transparent focus:outline-none mr-2'
                            />
                            Looking for a job
                        </label>
                    </div>
                    <div className="bg-white text-white">
                        <label className="text-black cursor-pointer">
                            <input
                                {...register("userType", { required: true })}
                                type="radio"
                                value="employer"
                                className='appearance-none h-3 w-3 focus:h-2 focus:w-2 border border-black rounded-full checked:bg-blue-300 checked:border-transparent focus:outline-none mr-2'
                            />
                            Looking for an employee
                        </label>
                    </div>
                    <ErrorMessage error={errors.userType} fieldName="userType" />
                </div>

                <div className="flex items-center justify-between">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        sign up
                    </button>
                </div>

                <p className="mt-4 text-center">
                    <Link to={'/login'} className="text-blue-500 hover:underline">Have an account?</Link>
                </p>
            </form>
        </div>
    );
}

export default SignUpForm;