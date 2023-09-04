import { ADD } from "../config/constants"

interface actionData {
    type: string,
    payload: {
        username: string,
        email: string
    }
}

const initialState = {
    user: {
        username: '',
        email: ''
    }
}

function reducer(state = initialState, action: actionData) {
    switch (action.type) {
        case ADD:
            const { username, email } = action.payload;
            return {
                user: { username, email }
            };
        default: return state
    }
}

export default reducer