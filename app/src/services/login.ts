import axios from "axios";

async function login(username: string, email: string, password: string) {
    try {
        const response = await axios.post("http://localhost:3001/auth/login", { username, email, password });
        return response.data
    } catch (error) {
        throw error
    }
}

export default login