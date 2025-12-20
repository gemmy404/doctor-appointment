import React, {useContext, useEffect, useState} from 'react'
import {AuthContext} from '../context/AuthContext';
import {fetchClient} from "../api/fetchClient";
import {toast} from "react-toastify";

function AddAppointment() {

    const [doctors, setDoctors] = useState([]);
    const {user} = useContext(AuthContext);
    const [form, setForm] = useState({
        doctor: "",
        date: "",
        reason: "",
    });
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchClient("http://localhost:5000/api/v1/doctors")
            .then((res) => res.json())
            .then(data => setDoctors(data.data))
            .catch(error => console.log(error.message));
    }, []);

    const handleChange = (e) => setForm({...form, [e.target.name]: e.target.value});

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        console.log("Form data being sent:", form);

        const token = localStorage.getItem("token");

        try {
            const res = await fetchClient("http://localhost:5000/api/v1/appointments", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(form),
            });

            console.log("Response status:", res.status);
            console.log("Response ok:", res.ok);

            const data = await res.json();
            console.log("Response data:", data.data);

            if (res.ok) {
                toast.success("Appointment added successfully!");
                setForm({doctor: "", date: "", reason: ""});
            } else {
                setError(data.message || "Something went wrong");
            }
        } catch (error) {
            console.error("Network or parsing error:", error);
            alert("Network error occurred. Check console for details.");
        }
    }

    // FIXED: Added return statement
    if (!user) {
        return (
            <div className="flex items-center justify-center h-screen text-xl">
                You need to login to create an appointment.
            </div>
        )
    }

    return (
        <div className='flex justify-center items-center h-screen bg-gray-100'>
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">
                    Add Appointment
                </h2>
                {error && <p className='text-red-500'>{error}</p>}

                <label className="block mb-2 text-sm font-semibold">Doctor</label>
                <select
                    name='doctor'
                    value={form.doctor}
                    onChange={handleChange}
                    required
                    className="w-full mb-4 p-2 border rounded"
                >
                    <option value="">Select Doctor</option>
                    {doctors?.map((doc) => (
                        <option key={doc._id} value={doc._id}>
                            {doc?.name} - {doc?.specialty}
                        </option>
                    ))}
                </select>

                <label className="block mb-2 text-sm font-semibold">Date</label>
                <input
                    type="date"
                    name="date"
                    value={form.date}
                    onChange={handleChange}
                    required
                    className="w-full mb-4 p-2 border rounded"
                />

                <label className="block mb-2 text-sm font-semibold">Reason</label>
                <textarea
                    name="reason"
                    value={form.reason}
                    onChange={handleChange}
                    required
                    className="w-full mb-4 p-2 border rounded h-24 resize-none"
                    placeholder="Describe your reason for the appointment..."
                />

                {/* FIXED: Added proper button styling */}
                <button
                    type='submit'
                    className='w-full py-2 rounded text-white font-semibold transition duration-200'
                >
                    Submit
                </button>
            </form>
        </div>
    );
}

export default AddAppointment;