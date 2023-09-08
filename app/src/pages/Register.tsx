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
            setUsernameError("Username: 8-30 characters, nor special characters neither spaces.");
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
        setPasswordError(validate ? "" : "Password: 8-50 characters, lowercase, uppercase, 1 number.");
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
        <div>
            <form onSubmit={handleRegister}>
                <Link to="/">Go back</Link>
                <input value={username} onChange={handleUsername} type="text" placeholder="Username" />
                {usernameError && <p>{usernameError}</p>}
                <input value={email} onChange={handleEmail} type="email" placeholder="Email" />
                {emailError && <p>{emailError}</p>}
                <input value={password} onChange={handlePassword} type="password" placeholder="Password" />
                {passwordError && <p>{passwordError}</p>}
                <Link to="/login">Already have an account</Link>
                <button disabled={state}>Register</button>
                {loading && <p>Loading...</p>}
                <p>or</p>
                <GoogleButton />
                <p>{message}</p>
            </form>
        </div>
    )
}

export default Register