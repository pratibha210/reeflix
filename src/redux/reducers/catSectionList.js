

export function catSectionList(state = [], action) {
    switch (action.type) {
        case 'ONE_SECTIONLIST':
            return action.data
        default:
            return state
    }
}