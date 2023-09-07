import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getUser } from "../actions/user";
import Cookies from "js-cookie";

function Home() {
    const navigate = useNavigate();
    const state = useSelector(getUser())

    const handleLogout = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        Cookies.remove("token")
        navigate("/login")
    }

    return (
        <div>
            <h1>Home</h1>
            <button onClick={handleLogout}>Logout</button>
            <p>{state.username}</p>
            <p>{state.email}</p>
        </div>
    )
}

export default Home