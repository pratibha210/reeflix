export function watchlaterlistdata(state = [], action) {
    switch (action.type) {
        case 'ALL_WATCHLATER_LIST':
            return action.data
        default:
            return state
    }
}