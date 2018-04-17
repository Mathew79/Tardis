
export function navigate(state = {}, action) {
    switch (action.type) {
        case 'NAVIGATE_PUSH_TO':{
            let navigator = action.meta.props.navigator
            let payload = action.payload
            navigator.push(payload)
            return state;
        }
        case 'NAVIGATE_MODAL_TO':{
            let navigator = action.meta.props.navigator
            let payload = action.payload
            navigator.showModal(payload)
            return state;
        }
        default:
            return state
    }
}

