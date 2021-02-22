import { loginActions as actions }  from './actions';

const initialState = {
    id: null,
    token: null,
}

const reducer = function loginReducer(state = initialState, action) {
    switch (action.type) {
        case actions.LOGIN:
            return {}
        case actions.LOGOUT:
            return {
                id: null,
                token: null
                
            }
        default:
            return state
    }
}

export default reducer;