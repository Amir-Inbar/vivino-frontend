export function setUser(user) {
    return async (dispatch) => {
        try {
            dispatch({ type: 'SET', user });
        } catch (err) {
            console.log(err);
        }
    };
}
