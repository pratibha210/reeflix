

export function errorMessage(state = {}, action) {
    switch (action.type) {
        case 'error_message':
            return action.data
        default:
            return state
    }
}