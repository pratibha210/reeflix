export function tempsearchData(state = [], action) {
    switch (action.type) {
        case 'SEARCH_LIST':
            return action.data
        default:
            return state
    }
}