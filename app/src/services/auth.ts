import axios from "axios";

async function auth(token: string | undefined) {
    try {
        const response = await axios.get("http://localhost:3001/auth", { headers: { Authorization: token } });
        return response.data;
    }catch (error){
        throw error
    }
}

export default auth;
