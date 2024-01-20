export function favouritelistdata(state = [], action) {
    switch (action.type) {
        case 'ALL_FAVOURITE_LIST':
            return action.data
        default:
            return state
    }
}