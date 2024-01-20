
export function favouriteList(state = [], action) {
    switch (action.type) {
        case 'ALL_FAVOURITE':
            return action.data
        default:
            return state
    }
}