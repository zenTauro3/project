import axios from "axios";

async function google(event: any) {
    try {
        const credential = event.credential;
        const response = await axios.post('http://localhost:3001/auth/google', { credential });
        return response.data
    } catch (error) {
        throw error
    }
};

export default google