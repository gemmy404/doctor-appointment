import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import AddDepartment from "./pages/AddDepartment";
import AddDoctor from "./pages/AddDoctor";

function App() {
    return (
        <>
            <Navbar />
            <Routes>
                <Route index path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/add-department" element={<AddDepartment />} />
                <Route path="/add-doctor" element={<AddDoctor/>}/>
            </Routes>
        </>
    );
}

export default App;
