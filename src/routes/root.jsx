import React, { useEffect } from 'react';
import { Link, Outlet, useLoaderData } from 'react-router-dom';
// import  ThemeColor  from '../myComponents/icon/ThemeColor';
import { useDispatch, useSelector } from 'react-redux';
import Header from '@/myComponents/Header';
import Footer from '@/myComponents/Footer';
import axios from 'axios';
import { authenticatUser } from '@/redux/slices/userSlice';
import { useFetchList } from '@/myHooks/fetchList';
import { setEmployeeSavedJobs } from '@/redux/slices/employee/savedJobsSlice';
import { setEmployerJobs } from '@/redux/slices/employer/jobsSlice';
import { setEmployerCompanies } from '@/redux/slices/employer/companiesSlice';

export async function loader() {
    const url = `${import.meta.env.VITE_API_BASE_URL}/user/auth/verify`
    let login = false;
    let userData;
    await axios.get(url, { withCredentials: true })
        .then(response => {
            userData = response?.data?.data
            login = true;
        })
        .catch(error => {
            console.log("error:", error?.response?.data?.message)
        })
    return { userData, login };
}


function Root(props) {
    let { userData, login } = useLoaderData();
    const dispatch = useDispatch();

    if (login) {
        dispatch(authenticatUser(userData));
    }
    const { user, isLoggedIn } = useSelector(state => state.user);
    const { employerJobs } = useSelector(state => state.employerJobs);
    const { employerCompanies } = useSelector(state => state.employerCompanies);
    const { employeeSavedJobs } = useSelector(state => state.employeeSavedJobs);

    const jobUrl = user.userType === 'employee' ? 'saveJob' : user.userType === 'employer' ? `jobs?jobCreatedBy=${user.id}` : null;
    const companyUrl = user.userType === 'employer' ? `companies?createdBy=${user.id}` : null;

    const [jobs, jobsLoading, jobsError] = useFetchList(jobUrl);
    const [companies, companiesLoading, companiesError] = useFetchList(companyUrl);

    useEffect(() => {
        if (!jobsLoading && !jobsError && jobs) {
            if (user.userType === 'employee') {
                dispatch(setEmployeeSavedJobs(jobs));
            } else if (user.userType === 'employer') {
                dispatch(setEmployerJobs(jobs));
            }
        }

        if (user.userType === 'employer' && !companiesLoading && !companiesError) {
            dispatch(setEmployerCompanies(companies));
        }
    }, [jobs, companies, dispatch]);


    // console.log("employerCompany:", employerCompanies)
    // console.log("employerJobs:", employerJobs)
    // console.log("employeeSavedJobs:", employeeSavedJobs)//<<<<<<<<<<<<<<<<|||||||||||||>>>>>>>>>>>>>>>>>>>

    return (
        <div>
            <Header />
            <div className='pt-20'></div>

            <Outlet />

            <Footer />
        </div>
    );
}

export default Root;