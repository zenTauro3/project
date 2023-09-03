import axios from "axios";

async function auth(token: string | undefined) {
    const response = await axios.get("http://localhost:3001/auth", { headers: { Authorization: token } });
    return response.data;
}

export default auth;
