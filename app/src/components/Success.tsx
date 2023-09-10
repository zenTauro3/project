import { Link } from "react-router-dom";

function VerifySuccess() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-200">
            <div className="bg-green-300 p-8 rounded drop-shadow-xl text-center border-2 border-green-500">
                <h1 className="text-4xl font-bold">Email verified!</h1>
                <div className="mt-4 text-lg">
                    <span>Now, </span>
                    <Link className="hover:underline font-semibold" to="/auth/login">log in</Link>
                    <span> to access your account.</span>
                </div>
            </div>
        </div>
    )
};

export { VerifySuccess };