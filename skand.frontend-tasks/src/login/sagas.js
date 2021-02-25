import { take, fork, cancel, cancelled, call, put, takeLatest } from 'redux-saga/effects';
import { createBrowserHistory } from 'history';

import { LOGIN_REQUESTING, LOGIN_SUCCESS, LOGIN_ERROR } from './constants';
import { CLIENT_UNSET } from '../client/constants';
import { setClient, unsetClient } from '../client/actions';


import { handleApiErrors } from '../lib/api-errors';

const browserHistory = createBrowserHistory();


async function loginApi(email, password) {
    console.log({ email: email, password: password });
    return fetch("/api/v2/users/tokens", {
        method: "POST",
        headers: {
            // Authorization: '123abc456def789ghi'
        },
        body: JSON.stringify({ email: email, password: password })
    }).then(handleApiErrors)
        .then(response => response.headers.map.authorization)
        .catch((error) => { throw error });
}

// function* loginFlow(action) {
//     let token;
//     try {
//         const { email, password } = action
        
//         const response = yield call(loginApi, email, password)

//         yield put({ type: LOGIN_SUCCESS, response })

//     } catch (error) {
//         console.log("error");
//         yield put ({type: LOGIN_ERROR, error})
//     }
// }

function* logout() {
    yield put(unsetClient());

    localStorage.removeItem('token');

    browserHistory.push('/login');
}

function* loginFlow(action) {
    let token;

    try {
        const { email, password } = action

        token = yield call(loginApi, email, password);

        console.log("token: ", token);
        yield put(setClient(token));

        yield put({ type: LOGIN_SUCCESS });

        localStorage.setItem('token', JSON.stringify(token));

        browserHistory.push('/widgets');
    } catch (error) {
        console.log("error",);
        yield put({ type: LOGIN_ERROR, error });
    } finally {
        if (yield cancelled()) {
            browserHistory.push('/login');
        }
    }

    return token;
}

// function* loginWatcher() {
//     console.log('watch');
//     yield takeLatest(LOGIN_REQUESTING, loginFlow);
// }

function* loginWatcher() {
    console.log('watching');
    while (true) {
        const { email, password } = yield take(LOGIN_REQUESTING);

        const task = yield fork(loginFlow, {email, password});

        const action = yield take([CLIENT_UNSET, LOGIN_ERROR]);

        if (action.type === CLIENT_UNSET) yield cancel(task);

        yield call(logout);
    }

}

export default loginWatcher;