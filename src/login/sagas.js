import { take, fork, cancel, cancelled, call, put } from 'redux-saga/effects';
import { createBrowserHistory } from 'history';

import { LOGIN_REQUESTING, LOGIN_SUCCESS, LOGIN_ERROR, LOGOUT_SUCCESS, LOGOUT_ERROR, LOGOUT_REQUESTING } from './constants';
import { CLIENT_UNSET } from '../client/constants';
import { setClient, unsetClient } from '../client/actions';


import { handleApiErrors } from '../lib/api-errors';
import { takeEvery } from '@redux-saga/core/effects';

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

function logoutApi(client) {
    return fetch("/api/v2/users/tokens", {
        method: "DELETE",
        headers: {
            Authorization: client.token
        }
    })
}

// function* logout() {
//     yield put(unsetClient());

//     localStorage.removeItem('token');

//     browserHistory.push('/login');
// }

function* loginFlow(action) {
    let token;

    try {
        const { email, password } = action

        token = yield call(loginApi, email, password);

        console.log("token: ", token);
        yield put(setClient(token));

        yield put({ type: LOGIN_SUCCESS });

        localStorage.setItem('token', JSON.stringify(token));

        browserHistory.push('/users');
        window.location.reload();

        // this.props.history.push("/users");
    } catch (error) {
        console.log("error",);
        yield put({ type: LOGIN_ERROR, error });
    } finally {
        if (yield cancelled()) {
            browserHistory.push('/login');
            window.location.reload();

        }
    }

    return token;
}

function* logoutFlow(action) {
    try {
        console.log('logoutFlow');
        yield call(logoutApi, action);

        yield put({ type: LOGOUT_SUCCESS })
        
        yield put(unsetClient());

        localStorage.removeItem("token");
        browserHistory.push("/login");
        window.location.reload();


    } catch (error) {
        yield put({type: LOGOUT_ERROR, error})
    }
}

function* loginWatcher() {
    console.log('watching');
    // while (true) {

    //     const { email, password } = yield take(LOGIN_REQUESTING);


    //     const task = yield fork(loginFlow, {email, password});

    //     const logoutAction = yield take(LOGOUT_REQUESTING, logoutFlow);

    //     const logoutTask = yield fork(logoutFlow, logoutAction);

    //     const action = yield take([CLIENT_UNSET, LOGIN_ERROR]);

    //     // if (action.type === CLIENT_UNSET) {
    //     //     yield cancel(task);

    //     //     yield call(logout);
    //     // }
        
    // }

    yield takeEvery(LOGIN_REQUESTING, loginFlow);
    yield takeEvery(LOGOUT_REQUESTING, logoutFlow);

}

export default loginWatcher;