    import React, { useEffect, useState } from "react";
    import { Navigate } from "react-router-dom";
    import Cookies from "js-cookie";
    import auth from "../services/auth";
    import { Error503 } from "../components/Errors";
    import Loader from "../components/Loader";

    function PublicRoute({ component }: { component: React.ReactNode }) {
        const [loading, setLoading] = useState(true);
        const [error, setError] = useState(false);
        const [user, setUser] = useState(false);
        const token = Cookies.get("token");

        useEffect(() => {
            auth(token)
                .then(() => setUser(true))
                .catch((error) => error.code === "ERR_NETWORK" && setError(true))
                .finally(() => setLoading(false));
        }, [token]);

        if (loading) {
            return <Loader />
        } else if (error) {
            return <Error503 />
        } else {
            return user ? <Navigate to="/home" /> : component;
        }
    }

    export default PublicRoute;
