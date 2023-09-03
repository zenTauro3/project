import { SET, REMOVE } from "../config/constants"

export const setUser = (payload: { username: string, email: string }) => {
    const { username, email } = payload;
    return { type: SET, username, email }
}

export const removeUser = () => {
    return { type: REMOVE, username: '', email: '' }
}

export const getUser = () => {
    return (state: { user: { username: string, email: string } }) => state.user
}
