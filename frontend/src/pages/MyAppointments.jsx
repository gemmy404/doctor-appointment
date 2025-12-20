import React, {useEffect, useState} from 'react'
import {X} from 'lucide-react'
import {toast} from "react-toastify";
import {fetchClient} from "../api/fetchClient";

function MyAppointments() {

    const [appointments, setAppointments] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const res = await fetchClient("http://localhost:5000/api/v1/appointments/my");
                const data = await res.json();

                if (!res.ok) {
                    throw new Error(data.message || "Failed to fetch appointments");
                }
                setAppointments(data.data);
            } catch (error) {
                console.error(error);
                setError(error.message);
                toast.error(error.message);
            }
        }

        fetchAppointments();
    }, []);

    const cancelAppointment = async (id) => {
        try {

            const res = await fetchClient(`http://localhost:5000/api/v1/appointments/${id}`, {
                method: "DELETE",
            });
            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Failed to delete appointment");
            }

            setAppointments(prevAppointments => prevAppointments.filter((a) => a._id !== id));
            toast.success("Appointment cancelled successfully!");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="p-8 bg-gray-100 min-h-screen">
            <h2 className='text-3xl font-bold text-center mb-8 text-[#008e9b]'>My Appointments</h2>

            {error && <p className='text-red-500 text-center mb-4'>{error}</p>}

            <div className='space-y-6 max-w-3xl mx-auto'>
                {appointments?.length === 0 ? (
                    <p className="text-center text-gray-500">No appointments found</p>
                ) : (
                    appointments?.map((app) => (
                        <div key={app?._id}
                             className="flex items-center justify-between bg-white shadow p-4 rounded-lg">

                            <div className='flex  items-center gap-4'>
                                <img className='w-20 h-20 rounded-full object-cover border'
                                     src={`http://localhost:5000/files/${app?.doctor?.image}`} alt='doctor-image'/>

                                <div>
                                    <h3 className="text-xl font-semibold">{app?.doctor?.name}</h3>
                                    <p className="text-gray-600">{app.reason}</p>
                                    <p>{new Date(app?.date).toLocaleDateString()}</p>
                                </div>
                            </div>

                            <button className='text-white' onClick={() => {
                                if (window.confirm("Are you sure you want to cancel this appointment?")) {
                                    cancelAppointment(app?._id);
                                }
                            }}><X fontSize={24}/></button>
                        </div>
                    ))
                )}
            </div>

        </div>
    );
}

export default MyAppointments;