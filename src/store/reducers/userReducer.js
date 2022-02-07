import { authService } from "../../services/auth.service";

const INITIAL_STATE = {
    user: authService.getLoggedinUser(),
};

export function userReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'SET_USER':
            return {
                ...state,
                user: action.user,
            }
        default:
            return state;
    }
}