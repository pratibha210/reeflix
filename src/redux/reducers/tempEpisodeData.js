

export function tempEpisodeData(state = {}, action) {
    switch (action.type) {
        case 'EPISODE_DATA':
            return action.data
        default:
            return state
    }
}