import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import auth from "../services/auth";

function PublicRoute({ component }: { component: React.ReactNode }) {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(false);
    const token = Cookies.get("token");

    useEffect(() => {
        if (token) {
            auth(token)
                .then(() => setUser(true))
                .catch(() => setUser(false))
                .finally(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, [token]);

    if (loading) {
        return <div>Loading...</div>;
    } else {
        return user ? <Navigate to="/home" /> : component;
    }
}

export default PublicRoute;
