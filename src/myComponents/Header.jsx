import React from 'react';
import { Link } from 'react-router-dom';
import ThemeColor from './icon/ThemeColor';

function Header({user}) {
    return (
        <div>
            <header className='bg-blue-400 text-white fixed w-full z-50 shadow-md hover:shadow-2xl ease-in-out duration-500'>
                <div className=' container mx-auto flex flex-row justify-between items-center py-5 px-5 sm:px-3'>
                    <div>
                        <h2 className='font-bold text-xl'>Hired</h2>
                    </div>
                    <div>
                        <ul className='flex flex-row justify-between items-center gap-3'>
                            <li> <ThemeColor /> </li>
                            <li><Link to={'/jobs'}>jobs</Link></li>
                            {
                                user.isLoggedIn === true ? <li><Link to={'/companies'}>companies</Link></li> : <li><Link to={'/login'}>login</Link></li>
                            }
                            {
                                user.isLoggedIn === true ? <li><div className='w-10 h-10 bg-white text-black rounded-full flex justify-center items-center'>{user?.user?.name?.charAt(0).toUpperCase()}</div></li> : ""
                            }
                        </ul>
                    </div>
                </div>
            </header>
        </div>
    );
}

export default Header;