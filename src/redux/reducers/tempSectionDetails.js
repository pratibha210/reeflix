

export function tempSectionDetails(state = '', action) {
    switch (action.type) {
        case 'SECTION_DETAILS':
            return action.data
        default:
            return state
    }
}