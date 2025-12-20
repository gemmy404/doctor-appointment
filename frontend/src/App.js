import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AddDepartment from "./pages/AddDepartment";
import AddDoctor from "./pages/AddDoctor";
import AllDoctors from "./pages/AllDoctors";
import DoctorDetails from "./pages/DoctorDetails";
import { ToastContainer } from "react-toastify";

function App() {
    return (
        <>
            <Navbar />
            <Routes>
                <Route index path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/add-department" element={<AddDepartment />} />
                <Route path="/add-doctor" element={<AddDoctor />} />
                <Route path="/doctors" element={<AllDoctors />} />
                <Route path="/doctors/:id" element={<DoctorDetails />} />
            </Routes>

            <ToastContainer position="top-right" autoClose={3000} />
        </>
    );
}

export default App;
