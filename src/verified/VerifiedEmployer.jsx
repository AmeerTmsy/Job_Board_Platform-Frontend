import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

function VerifiedEmployer(props) {
    const navigate = useNavigate()
    const verify = true
    const userType = 'employer'

    useEffect(() => {
        if(!verify)  navigate('/login')
    }, [])
    
    return (
        <div>
            {
                verify && (userType === 'employer') && <Outlet/>
            }
        </div>
    );
}

export default VerifiedEmployer;