import { Navigate } from "react-router-dom";
import auth from "../services/auth";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { setUser, getUser, removeUser } from "../actions/user";

function PublicRoute({ component }: { component: React.ReactNode }) {
    const dispatch = useDispatch();
    const user = useSelector(getUser()).username
    const token = Cookies.get("token");

    useEffect(() => {
        if (token) {
            auth(token).then(data => dispatch(setUser(data)))
        } else {
            dispatch(removeUser())
        }
    }, [dispatch, token])

    return user ? <Navigate to="/home" /> : component
}

export default PublicRoute