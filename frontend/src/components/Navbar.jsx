import React, {useContext} from 'react';
import {Link} from 'react-router-dom';
import {AuthContext} from '../context/AuthContext';
import {HashLink} from "react-router-hash-link";

function Navbar() {
    const {user, logout} = useContext(AuthContext);
    return (
        <nav className='bg-white shadow-md text-[#008e9b] flex justify-between'>
            <div>
                <img className='w-16 ml-20' src='/logo.png' alt='logo' />
            </div>

            <ul className='flex space-x-6 items-center px-4 mr-20'>
                <li><Link to="/">Home</Link></li>
                <li><HashLink smooth to="/#about">About</HashLink></li>

                {user?.role === "admin" &&
                    <>
                        <li><Link to="/add-doctor">Add Doctor</Link></li>
                        <li><Link to="/add-department">Add Department</Link></li>
                    </>}

                {user?.role === "user" &&
                    <>
                        <li><Link to="/add-appointment">Add Appointment</Link></li>
                        <li><Link to="/my-appointments">My Appointments</Link></li>
                    </>}

                {!user &&
                    <>
                        <li><Link to="/login">Login</Link></li>
                        <li><Link to="/register">Register</Link></li>
                    </>}

                {user &&
                    <li>
                        <button onClick={logout} className='rounded hover:bg-red-500 text-white py-1'>logout</button>
                    </li>}
            </ul>
        </nav>
    )
}

export default Navbar;