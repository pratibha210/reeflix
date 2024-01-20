

export function tempseriesData(state = {}, action) {
    switch (action.type) {
        case 'SERIES_DATA':
            return action.data
        default:
            return state
    }
}