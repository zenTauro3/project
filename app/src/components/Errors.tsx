import { Link, useNavigate } from "react-router-dom";

function Error503() {
    const navigate = useNavigate();

    const handleReload = () => navigate(0)

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-200">
            <div className="bg-red-300 p-8 rounded drop-shadow-xl text-center border-red-500 border-2">
                <h1 className="text-4xl font-bold">503 - Service Unavailable</h1>
                <p className="mt-4 text-lg">Sorry, the service is currently unavailable.</p>
                <div className="mt-2">
                    <span>Please, </span>
                    <span className="hover:underline hover:cursor-pointer font-semibold" onClick={handleReload}>try again</span>
                    <span> later.</span>
                </div>
            </div>
        </div>
    );
};

function VerifyError() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-200">
            <div className="bg-red-300 p-8 rounded drop-shadow-xl text-center border-red-500 border-2">
                <h1 className="text-4xl font-bold">Error verifying email!</h1>
                <div className="mt-4 text-lg">
                    <span>Please, retry </span>
                    <Link className="hover:underline font-semibold" to="/auth/register">register</Link>
                    <span> (maybe already verified).</span>
                </div>
            </div>
        </div>
    )
}

export { Error503, VerifyError };
