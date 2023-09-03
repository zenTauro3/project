import { Navigate } from "react-router-dom";
import auth from "../services/auth";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { setUser, getUser, removeUser } from "../actions/user";

function PublicRoute({ component }: { component: React.ReactNode }) {
    const [loading, setLoading] = useState(true)
    const dispatch = useDispatch();
    const user = useSelector(getUser()).username
    const token = Cookies.get("token");

    useEffect(() => {
        if (token) {
            auth(token)
                .then(data => dispatch(setUser(data)))
                .finally(() => setLoading(false))
        } else {
            dispatch(removeUser());
            setLoading(false)
        }
    }, [dispatch, token])

    if (loading) {
        return <div>Loading...</div>
    } else {
        return user ? <Navigate to="/home" /> : component
    }
}

export default PublicRoute