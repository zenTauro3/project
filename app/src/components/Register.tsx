import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import register from "../services/register";

function Register() {
    const [loading, setLoading] = useState(false)
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

    const handleRegister = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true)
        register(username, email, password)
            .then(() => navigate("/login"))
            .catch(error => setMessage(error.response.data))
            .finally(() => setLoading(false))
    }

    return (
        <div>
            <form onSubmit={handleRegister}>
                <input value={username} onChange={handleUsername} type="text" placeholder="Username" />
                <input value={email} onChange={handleEmail} type="email" placeholder="Email" />
                <input value={password} onChange={handlePassword} type="password" placeholder="Password" />
                <Link to="/login">Already have an account</Link>
                <button>Register</button>
                {loading && <p>Loading...</p>}
                <p>{message}</p>
            </form>
        </div>
    )
}

export default Register