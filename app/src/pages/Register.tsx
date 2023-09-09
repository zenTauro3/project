import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import GoogleButton from "../components/GoogleButton";
import { register, check } from "../services/register";

function Register() {
    const [loading, setLoading] = useState(false);
    const [state, setState] = useState(true);

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [usernameError, setUsernameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleUsername = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const username = event.target.value;
        const validate = /^[a-zA-Z0-9_]{8,30}$/.test(username);
        const validateErrors = validate && !emailError && !passwordError;
        const validateInputs = username && email && password;
        if (validate) {
            check(username)
                .then(() => setUsernameError(""))
                .catch(error => setUsernameError(error.response.data))
        } else {
            setUsernameError("8-30 characters, no special chars or spaces");
        };

        setState(validateErrors && validateInputs ? false : true);
        setUsername(username);
    };

    const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        const email = event.target.value;
        const validate = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
        const validateErrors = validate && !usernameError && !passwordError;
        const validateInputs = username && email && password;
        setEmailError(validate ? "" : "Invalid email");
        setState(validateErrors && validateInputs ? false : true);
        setEmail(email);
    };

    const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        const password = event.target.value;
        const validate = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,50}$/.test(password);
        const validateErrors = validate && !emailError && !usernameError;
        const validateInputs = username && email && password;
        setPasswordError(validate ? "" : "8-50 characters, lowercase, uppercase and numbers");
        setState(validateErrors && validateInputs ? false : true);
        setPassword(password);
    }

    const handleRegister = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true)
        register(username, email, password)
            .then(() => navigate("/auth/login"))
            .catch(error => setMessage(error.response.data))
            .finally(() => setLoading(false))
    }

    return (
        <div className="min-h-screen bg-gray-200 flex items-center justify-center">
            <div className="bg-white p-8 rounded shadow-md w-96 text-center">
                <form className="space-y-4" onSubmit={handleRegister}>
                    <Link to="/" className="mb-4 block text-blue-500 items-center text-left">&#8617; Return</Link>
                    <h1 className="text-xl mb-4">Create an account</h1>
                    <input value={username} onChange={handleUsername} type="text" placeholder="Username"
                        className="w-full border rounded-md py-2 px-3 focus:outline-none" />
                    {usernameError && <p className="text-red-500 mt-1 text-sm">{usernameError}</p>}
                    <input value={email} onChange={handleEmail} type="email" placeholder="Email"
                        className="w-full border rounded-md py-2 px-3 focus:outline-none" />
                    {emailError && <p className="text-red-500 mt-1 text-sm">{emailError}</p>}
                    <input value={password} onChange={handlePassword} type="password" placeholder="Password"
                        className="w-full border rounded-md py-2 px-3 focus:outline-none" />
                    {passwordError && <p className="text-red-500 mt-1 text-sm">{passwordError}</p>}
                    <button disabled={state}
                        className={`disabled:opacity-75 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg w-full transition duration-300 ease-in-out ${state ? 'cursor-not-allowed' : 'transform hover:scale-105'}`}
                    >{loading ? 'Loading...' : 'Register'}</button>
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
                    <Link to="/auth/login" className="hover:underline">Already have an account?</Link>
                </div>
            </div>
        </div>
    );

}

export default Register; 