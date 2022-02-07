export function setUser(user) {
    return async (dispatch) => {
        try {
            dispatch({ type: 'SET_USER', user });
        } catch (err) {
            console.log(err);
        }
    };
}
