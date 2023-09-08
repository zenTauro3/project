import { Link } from "react-router-dom";

function Main() {
    return (
        <>
            <h1>Main</h1>
            <Link to="/auth/login">Log in</Link>
            <Link to="/auth/register">Register</Link>
        </>
    )
};

export default Main