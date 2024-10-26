import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

function VerifiedUser(props) {
    const navigate = useNavigate()
    const verify = true

    useEffect(() => {
        if(!verify)  navigate('/login')
    }, [])
    
    return (
        <div>
            {
                verify && <Outlet/>
            }
        </div>
    );
}

export default VerifiedUser;