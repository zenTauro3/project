import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { addUser } from "../actions/user";
import auth from "../services/auth";

function PrivateRoute({ component }: { component: React.ReactNode }) {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(true);
    const dispatch = useDispatch();
    const token = Cookies.get("token");

    useEffect(() => {
        auth(token)
            .then(data => dispatch(addUser(data)))
            .catch(() => setUser(false))
            .finally(() => setLoading(false))

    }, [dispatch, token])

    if (loading) {
        return <div>Loading...</div>
    } else {
        return user ? component : <Navigate to="/auth/login" />
    }
}

export default PrivateRoute;
