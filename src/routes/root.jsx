import React, { useEffect } from 'react';
import { Link, Outlet, useLoaderData } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Header from '@/myComponents/Header';
import Footer from '@/myComponents/Footer';
import axios from 'axios'; // Importing axios
import { authenticatUser } from '@/redux/slices/userSlice';
import { useFetchList } from '@/myHooks/fetchList';
import { setEmployeeSavedJobs } from '@/redux/slices/employee/savedJobsSlice';
import { setEmployerJobs } from '@/redux/slices/employer/jobsSlice';
import { setEmployerCompanies } from '@/redux/slices/employer/companiesSlice';
import StorNSdata from '@/verified/storNSdata';

export async function loader() {
    const url = `${import.meta.env.VITE_API_BASE_URL}/user/auth/verify`;
    let login = false;
    let userData = {};
    await axios.get(url, { withCredentials: true })
        .then(response => {
            userData = response?.data?.data || {}
            login = true;
        })
        .catch(error => console.log("error:", error?.response?.data?.message));

    // console.log(userData)
    return { userData, login };
}

function Root(props) {
    const loaderData = useLoaderData();
    const userData = loaderData?.userData || {}; // Safeguard with an empty object
    const login = loaderData?.login || false;

    const dispatch = useDispatch();

    useEffect(() => {
        if (login) dispatch(authenticatUser(userData))
    }, [login, userData, dispatch])



    const { user, isLoggedIn } = useSelector(state => state.user);
    // const { employerJobs } = useSelector(state => state.employerJobs);
    // const { employerCompanies } = useSelector(state => state.employerCompanies);
    // const { employeeSavedJobs } = useSelector(state => state.employeeSavedJobs);

    // const jobUrl = user.userType === 'employee' ? 'saveJob' : user.userType === 'employer' ? `jobs?jobCreatedBy=${user.id}` : 'jobs';
    // const companyUrl = user.userType === 'employer' ? `companies?createdBy=${user.id}` : '';

    // const [jobs, jobsLoading, jobsError] = useFetchList(jobUrl || null);
    // const [companies, companiesLoading, companiesError] = useFetchList(companyUrl || null);

    // useEffect(() => {
    //     if (!jobsLoading && !jobsError && jobs) {
    //         if (user.userType === 'employee') {
    //             dispatch(setEmployeeSavedJobs(jobs));
    //         } else if (user.userType === 'employer') {
    //             dispatch(setEmployerJobs(jobs));
    //         }
    //     }

    //     if (user.userType === 'employer' && !companiesLoading && !companiesError) {
    //         dispatch(setEmployerCompanies(companies));
    //     }
    // }, [jobs, companies, jobsLoading, jobsError, companiesLoading, companiesError, user.userType, dispatch]);

    return (
        <div>
            <Header />
            <StorNSdata />
            <Outlet />
            <Footer />
        </div>
    );
}

export default Root;
