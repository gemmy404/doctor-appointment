import React, {useContext, useState} from "react";
import {AuthContext} from "../context/AuthContext";
import {toast} from "react-toastify";
import {fetchClient} from "../api/fetchClient";

function AddDepartment() {
    const {user} = useContext(AuthContext);
    const [preview, setPreview] = useState(null);

    const [error, setError] = useState(null);
    const [form, setForm] = useState({
        name: "",
        description: "",
        image: null,
    });

    const handleChange = (e) => {
        const {name, value, files} = e.target;

        if (files) {
            const file = files[0];
            setForm({...form, image: file});
            setPreview(URL.createObjectURL(file));
        } else {
            setForm({...form, [name]: value});
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            const token = localStorage.getItem("token");
            const formData = new FormData();

            formData.append("name", form.name);
            formData.append("description", form.description);
            if (form.image) formData.append("image", form.image);

            const res = await fetchClient("http://localhost:5000/api/v1/departments", {
                method: "POST",
                headers: {Authorization: `Bearer ${token}`},
                body: formData,
            });

            const data = await res.json();
            console.log("Response status:", res.status, "Response data:", data);

            if (!res.ok) {
                setError(data.message);
                throw new Error(data.message || "Failed to add department");
            }

            toast.success("Department added successfully!");
            setForm({name: "", specialty: "", experienceYears: "", description: "", image: null});
            setPreview(null);
        } catch (error) {
            console.error("Error submitting form", error);
            setError(error.message);
            toast.error(error.message);
        }
    };

    if (!user || user.role !== "admin") {
        return <div className="flex items-center h-screen">Only admin can add Departments
        </div>;
    }

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-lg rounded-lg p-8 w-full max-w-3xl flex gap-8"
                encType="multipart/form-data"
            >
                <div className="flex flex-col items-center w-1/3">
                    <div className="w-32 h-32 rounded overflow-hidden border-2 border-gray-300 mt-16">
                        {preview ? (
                            <img src={preview} className="object-cover w-full h-full" alt='preview'/>
                        ) : (
                            <img src="/img/department-default.png" alt="Default avatar" className='hover: cursor-pointer'
                                 onClick={() => document.getElementById("file-input").click()}/>
                        )}
                    </div>
                    <button
                        type="button"
                        onClick={() => document.getElementById("file-input").click()}
                        className="mt-4 bg-[#008e9b] text-white px-4 py-1 rounded hover:bg-[#007a85]"
                    >
                        Choose Image
                    </button>
                    <input id="file-input" onChange={handleChange} type="file" accept="image/*" className="hidden"/>
                </div>

                <div className="w-2/3">
                    <h2 className="text-2xl font-bold mb-6 text-[#008e9b] text-center">Add New Department</h2>

                    {error && <p className="text-red-500">{error}</p>}

                    <label className="block mb-2 font-semibold">Name</label>
                    <input
                        value={form.name}
                        onChange={handleChange}
                        type="text"
                        name="name"
                        required
                        className="w-full mb-4 p-2 border rounded"
                    />

                    <label className="block mb-2 font-semibold">Description</label>
                    <input
                        onChange={handleChange}
                        value={form.description}
                        type="text"
                        name="description"
                        required
                        className="w-full mb-4 p-2 border rounded"
                    />

                    <button type="submit" className="w-full py-2 rounded bg-[#008e9b] text-white hover:bg-[#007a85]">
                        Add Department
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AddDepartment;
