

export function bannerList(state = [], action) {
    switch (action.type) {
        case 'ALL_BANNERS':
            return action.data
        default:
            return state
    }
}