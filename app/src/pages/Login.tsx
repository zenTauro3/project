import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import GoogleButton from "../components/GoogleButton";
import login from "../services/login"
import Cookies from "js-cookie";

function Login() {
    const [loading, setLoading] = useState(false);
    const [state, setState] = useState(true);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        const email = event.target.value;
        setState(email && password ? false : true);
        setEmail(email);
    };

    const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        const password = event.target.value;
        setState(email && password ? false : true);
        setPassword(password);
    }

    const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true)
        login(email, password)
            .then(token => { Cookies.set("token", token); navigate("/home") })
            .catch(error => setMessage(error.response.data))
            .finally(() => setLoading(false))
    };

    return (
        <div className="min-h-screen bg-gray-200 flex items-center justify-center">
            <div className="bg-white p-8 rounded shadow-md w-96 text-center">
                <form className="space-y-4" onSubmit={handleLogin}>
                    <Link to="/" className="mb-4 block text-blue-500 items-center text-left">&#8617; Return</Link>
                    <h1 className="text-xl mb-4">Welcome back</h1>
                    <input value={email} onChange={handleEmail} type="email" placeholder="Email"
                        className="w-full border rounded-md py-2 px-3 focus:outline-none" />
                    <input value={password} onChange={handlePassword} type="password" placeholder="Password"
                        className="w-full border rounded-md py-2 px-3 focus:outline-none" />
                    <button disabled={state}
                        className={`disabled:opacity-75 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg w-full transition duration-300 ease-in-out ${state ? 'cursor-not-allowed' : 'transform hover:scale-105'}`}
                    >{loading ? 'Loading...' : 'Login'}</button>
                    <p className="mt-2 text-red-500">{message}</p>
                </form>
                <div className="mb-4 flex items-center">
                    <div className="border-t border-gray-300 flex-grow"></div>
                    <p className="mx-4 text-gray-500">or</p>
                    <div className="border-t border-gray-300 flex-grow"></div>
                </div>
                <div className="flex justify-center mb-4">
                    <GoogleButton />
                </div>
                <div className="text-blue-500">
                    <Link to="/auth/register" className="hover:underline">Don't have an account yet?</Link>
                </div>
            </div>
        </div>
    )
}

export default Login