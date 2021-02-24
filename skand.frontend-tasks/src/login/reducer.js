import { LOGIN_REQUESTING, LOGIN_SUCCESS, LOGIN_ERROR } from './constants';


// const initialState = {
//     id: null,
//     token: null,
// }

const initialState = {
    requesting: false,
    successful: false,
    messages: [],
    errors: []
    
}

const reducer = function loginReducer(state = initialState, action) {
    switch (action.type) {
        // case actions.LOGIN:
        //     return {}
        // case actions.LOGOUT:
        //     return {
        //         id: null,
        //         token: null
                
        //     }
        case LOGIN_REQUESTING:
            return {
                requesting: true,
                successful: false,
                messages: [{ body: "Logging in...", time: new Date() }],
                errors: []
            }
        case LOGIN_SUCCESS:
            console.log("action: ", action);

            return {
                errors: [],
                messages: [{
                    // body: `Successfully logged in for account: ${action.response.email}`
                    body: 'Successfully logged in'
                }],
                requesting: false,
                successful: true,
            }
        case LOGIN_ERROR:
            return {
                errors: state.errors.concat([{
                    body: action.error.toString(), //action.error or action.errors?
                }]),
                messages: [],
                requesting: false,
                successful: false
            }
        default:
            return state
    }
}

export default reducer;