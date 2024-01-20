

export function watchList(state = [], action) {
    switch (action.type) {
        case 'WATCH_LIST':
            return action.data
        default:
            return state
    }
}