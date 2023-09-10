import { ADD_USER } from "../../config/constants"

interface UserData {
    username: string,
    email: string
}

interface ActionData {
    type: string,
    payload: UserData
}

const initialState = {
    user: {
        username: '',
        email: ''
    }
}

function reducer(state = initialState, action: ActionData) {
    switch (action.type) {
        case ADD_USER:
            const { username, email } = action.payload;
            return {
                user: { username, email }
            };
        default: return state
    }
}

export default reducer