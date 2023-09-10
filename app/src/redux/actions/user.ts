import { ADD_USER} from "../../config/constants"

interface UserData {
    username: string,
    email: string
}

export const addUser = (data: UserData) => {
    const { username, email } = data;
    return { type: ADD_USER, payload: { username, email } }
}

export const getUser = () => {
    return (state: { user: UserData }) => state.user
}
