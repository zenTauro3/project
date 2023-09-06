import axios from "axios";

async function google(access_token: string) {
    try {
        const response = await axios.post("http://localhost:3001/auth/google", { access_token: access_token });
        return response.data
    } catch (error) {
        throw error
    }
}

export default google;