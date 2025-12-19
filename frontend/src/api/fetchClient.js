import { isTokenExpired } from "../utils/auth";

export const fetchClient = async (url, options = {}) => {
    const token = localStorage.getItem("token");

    if (!token || isTokenExpired(token)) {
        localStorage.removeItem("token");
        window.location.href = "/login";
        /// ??????
        return Promise.reject("Token expired");
    }

    const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        ...options.headers,
    };

    const response = await fetch(url, {
        headers,
        ...options,
    });

    if (response.status === 401) {
        localStorage.removeItem("token");
        window.location.href = "/login";
        return Promise.reject("Unauthorized");
    }

    return response;
};