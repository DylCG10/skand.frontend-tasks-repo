// export const loginActions = {
//     LOGIN: "login",
//     LOGOUT: "logout"
// }

import { LOGIN_REQUESTING, LOGOUT_REQUESTING } from './constants';

const loginRequest = function loginRequest({ email, password }) {
    return {
        type: LOGIN_REQUESTING,
        email,
        password
    }
}

export const logoutRequest = function logoutRequest({client}) {
    return {
        type: LOGOUT_REQUESTING,
        client
    }
}

export default loginRequest;