import {createContext, useEffect, useState} from "react";
import {jwtDecode} from "jwt-decode";
import {useNavigate} from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            const decode = jwtDecode(token);
            setUser(decode);
        }
    }, []);

    const login = (token) => {
        localStorage.setItem("token", token);
        const decode = jwtDecode(token);
        setUser(decode);
    }

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
        navigate("/");
    }

    return (
        <AuthContext.Provider value={{user, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
};