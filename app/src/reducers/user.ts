import { SET, REMOVE } from "../config/constants"

const initialState = {
    user: {
        username: '',
        email: ''
    }
}

const reducer = (state = initialState, action: { type: string, username: string, email: string }) => {
    switch (action.type) {
        case SET:
            return {
                user: {
                    username: action.username,
                    email: action.email
                }
            };
        case REMOVE:
            return {
                user: {
                    username: '',
                    email: ''
                }
            }

        default: return state
    }
}

export default reducer