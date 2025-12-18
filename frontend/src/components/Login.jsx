import React, {useContext, useState} from 'react'

function Login() {

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <form className="bg-white p-6 rounded shadow-md w-96">
                <h2 className="text-2xl mb-4 text-center font-bold">Login</h2>


                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="w-full mb-3 p-2 border rounded"
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="w-full mb-3 p-2 border rounded"
                />
                <button className="w-full text-white py-2 rounded">Login</button>
            </form>
        </div>
    );
}

export default Login;