import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { VerifySuccess } from "../components/Success";
import { VerifyError } from "../components/Errors";
import verify from "../services/verify";
import Loader from "../components/Loader";

function Verify() {
    const [verified, setVerified] = useState(false);
    const [loading, setLoading] = useState(true);
    const { key } = useParams();

    useEffect(() => {
        if (key) {
            verify(key)
                .then(() => setVerified(true))
                .catch(() => setVerified(false))
                .finally(() => setLoading(false))
        }
    }, [])

    if (loading) {
        return <Loader />
    } else {
        return verified ? <VerifySuccess /> : <VerifyError />
    }
};

export default Verify