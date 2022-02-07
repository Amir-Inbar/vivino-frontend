const INITIAL_STATE = {
    user: null,
};

export function userReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'SET':
            return {
                ...state,
                user: action.user,
            }
        default:
            return state;
    }
}