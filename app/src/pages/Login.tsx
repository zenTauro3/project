import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import GoogleLogin from "../components/GoogleLogin";
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
        <div>
            <form onSubmit={handleLogin}>
                <input value={email} onChange={handleEmail} type="email" placeholder="Email" />
                <input value={password} onChange={handlePassword} type="password" placeholder="Password" />
                <Link to="/register">Don't have an account yet?</Link>
                <button disabled={state}>Login</button>
                {loading && <p>Loading...</p>}
                <p>or</p>
                <GoogleLogin />
                <p>{message}</p>
            </form>
        </div>
    )
}

export default Login