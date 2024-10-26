import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

function VerifiedAdmin(props) {
    const navigate = useNavigate()
    const verify = true
    const userType = 'admin'

    useEffect(() => {
        if(!verify)  navigate('/login')
        if(!userType === "admin")  navigate('/jobs')
    }, [])
    
    return (
        <div>
            {
                verify && (userType === 'admin') && <Outlet/>
            }
        </div>
    );
}

export default VerifiedAdmin;