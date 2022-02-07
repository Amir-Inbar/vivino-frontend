import { httpService } from './http.service'
const STORAGE_KEY_LOGGEDIN_USER = 'user'

export const authService = {
    login,
    logout,
    signup,
    getLoggedinUser
}

async function login(user) {
    try {
        const loggedInUser = await httpService.post('auth/login', user)
        if (loggedInUser) {
            return _saveLocalUser(loggedInUser);
        }
    } catch (err) {
        console.log(err);
    }
}

async function signup(user) {
    try {
        const signedUser = await httpService.post('auth/signup', user)
        return _saveLocalUser(signedUser)
    } catch (err) {
        console.log(err);
    }
}

async function logout() {
    try {
        sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
        const res = await httpService.post('auth/logout');
        return res;
    } catch (err) {
        console.log(err);
    }
}

function _saveLocalUser(user) {
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
    return user
}

export function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER) || 'null')
}
