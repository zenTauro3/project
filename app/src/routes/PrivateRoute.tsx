import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import auth from "../services/auth";
import { useDispatch } from "react-redux";
import { addUser } from "../redux/actions/user";
import { Error503 } from "../components/Errors";
import Loader from "../components/Loader";

function PrivateRoute({ component }: { component: React.ReactNode }) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [user, setUser] = useState(true);
    const dispatch = useDispatch();
    const token = Cookies.get("token");

    useEffect(() => {
        auth(token)
            .then(data => dispatch(addUser(data)))
            .catch((error) => {
                if (error.code === "ERR_NETWORK") setError(true)
                setUser(false)
            })
            .finally(() => setLoading(false))
    }, [dispatch, token])

    if (loading) {
        return <Loader />
    } else if (error) {
        return <Error503 />
    } else {
        return user ? component : <Navigate to="/auth/login" />
    }
}

export default PrivateRoute;
