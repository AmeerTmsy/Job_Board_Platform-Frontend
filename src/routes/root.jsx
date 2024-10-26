import React, { useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
// import  ThemeColor  from '../myComponents/icon/ThemeColor';
import { useDispatch, useSelector } from 'react-redux';
import Header from '@/myComponents/Header';
import Footer from '@/myComponents/Footer';
import axios from 'axios';
import { authenticatUser, unAuthenticatUser } from '@/redux/slices/userSlice';

function Root(props) {
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_BASE_URL}/user/auth/verify`, {withCredentials: true})
        .then(response => dispatch(authenticatUser(response?.data?.data)))
        .catch(error => dispatch(unAuthenticatUser()))
    }, [])
    return (
        <div>
            <Header user={user}/>
            <div className='pt-20'></div>

            <Outlet />

            <Footer />
        </div>
    );
}

export default Root;