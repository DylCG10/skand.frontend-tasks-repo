import { loginActions as actions }  from '../actions/loginActions';

export function authentication(state = {}, action) {
    switch (action.type) {
        case actions.LOGIN_FAILURE:
            return {}
        case actions.LOGIN_SUCCESS:
            return {
                
            }
        default:
            return {state }
    }
}