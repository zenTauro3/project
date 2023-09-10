import axios from "axios"

async function verify(key: string) {
    try {
        const response = await axios.put(`http://localhost:3001/auth/verify/${key}`);
        return response.data
    } catch (error) {
        throw error;
    }
};

export default verify