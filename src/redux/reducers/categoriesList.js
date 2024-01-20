

export function categoriesList(state = [], action) {
    switch (action.type) {
        case 'ALL_CATEGORIES':
            return action.data
        default:
            return state
    }
}