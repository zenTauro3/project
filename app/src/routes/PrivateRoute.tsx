import { Navigate } from "react-router-dom";
import auth from "../services/auth";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { setUser, getUser } from "../actions/user";

function PrivateRoute({ component }: { component: React.ReactNode }) {
    const dispatch = useDispatch();
    const user = useSelector(getUser()).username
    const token = Cookies.get("token");

    useEffect(() => {
        if (token) {
            auth(token).then(data => dispatch(setUser(data)))
        }
    }, [dispatch, token])

    return user ? component : <Navigate to="/login" />
}

export default PrivateRoute;