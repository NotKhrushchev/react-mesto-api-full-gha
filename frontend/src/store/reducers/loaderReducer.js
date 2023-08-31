import { SET_LOADING_FALSE, SET_LOADING_TRUE } from "../actions/actions"

const defaultState = {
    isLoading: false,
}

const loaderReducer = (state = defaultState, action) => {
    switch (action.type) {
        case SET_LOADING_TRUE:
            return {...state, isLoading: true}

        case SET_LOADING_FALSE:
            return {...state, isLoading: false}

        default:
            return state
    }
}

export default loaderReducer