export function userDetails(state = {}, action) {
    switch (action.type) {
        case 'LOGGED_USER_DETAILS':
            return action.data
        default:
            return state
    }
}