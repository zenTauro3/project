import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import login from "../services/login";

function Login() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    }

    const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value)
    };

    const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value)
    }

    const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        login(username, email, password)
            .then(token => {
                Cookies.set("token", token);
                navigate("/home");
            })
            .catch(error => setMessage(error))
    }

    return (
        <div>
            <form onSubmit={handleLogin}>
                <input value={username} onChange={handleUsername} type="text" placeholder="Username" />
                <input value={email} onChange={handleEmail} type="email" placeholder="Email" />
                <input value={password} onChange={handlePassword} type="password" placeholder="Password" />
                <button>Login</button>
                <p>{message}</p>
            </form>
        </div>
    )
}

export default Login