import axios from "axios";

async function register(username: string, email: string, password: string) {
    try {
        const response = await axios.post("http://localhost:3001/auth/register", { username, email, password });
        return response.data
    } catch (error) {
        throw error
    }
}

export default register