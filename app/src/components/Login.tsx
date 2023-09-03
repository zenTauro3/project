import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Cookies from "js-cookie";
import login from "../services/login";

function Login() {
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value)
    };

    const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value)
    }

    const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true)
        login(email, password)
            .then(token => { Cookies.set("token", token); navigate("/home") })
            .catch(error => setMessage(error.response.data))
            .finally(() => setLoading(false))
    }

    return (
        <div>
            <form onSubmit={handleLogin}>
                <input value={email} onChange={handleEmail} type="email" placeholder="Email" />
                <input value={password} onChange={handlePassword} type="password" placeholder="Password" />
                <Link to="/register">Don't have an account yet?</Link>
                <button>Login</button>
                {loading && <p>Loading...</p>}
                <p>{message}</p>
            </form>
        </div>
    )
}

export default Login