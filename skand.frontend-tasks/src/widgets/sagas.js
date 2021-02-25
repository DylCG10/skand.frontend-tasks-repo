import { take, fork, cancel, cancelled, call, put, takeLatest } from 'redux-saga/effects';
import { handleApiErrors } from '../lib/api-errors';
import { WIDGET_CREATING, WIDGET_REQUESTING } from './constants';

import { widgetCreateSuccess, widgetCreateError, widgetRequestSuccess, widgetRequestError } from './actions';
import { takeEvery } from 'redux-saga/effects';

const widgetsUrl = `/api/v2/users`;

function widgetCreateApi(client, widget) {
    // return fetch(widgetsUrl, {
    //     method: "POST",
    //     headers: {
    //         Authorization: client.token || undefined,
    //     },
    // }).then(handleApiErrors);
    //add some stuff here .then(response => response.json())
}
 
async function widgetRequestApi(client) {
    // console.log("requested, ", client.token);
    // const request = fetch(widgetsUrl, {
    //     method: "GET",
    //     headers: {
    //         Authorization: client.token
    //     }
    // }).then(handleApiErrors)
    //     .then((response) => {
    //         console.log(response);
    //         return response.json() //.then(data => data.users);
    //     });
    // return request;

    return fetch(widgetsUrl, {
        method: "GET",
        headers: {
            Authorization: client.token
        }
    }).then(handleApiErrors)
        .then((response) => response.json()) //.then(data => data.users);

}

function* widgetRequestFlow(action) {
    try {
        console.log("HERE");
        const { client } = action;
        const widgets = yield call(widgetRequestApi, client);

        console.log("here: ", widgets.users);
        yield put(widgetRequestSuccess(widgets.users));
    } catch (error) {
        console.log("error");
        yield put(widgetRequestError(error));
    }
}

function* widgetCreateFlow(action) {
    try {
        const { client, widget } = action;
        const createdWidget = yield call(widgetCreateApi, client, widget);

        yield put(widgetCreateSuccess(createdWidget))
    } catch (error) {
        yield put (widgetCreateError(error))
    }
}

function* widgetsWatcher() {
    // yield [
    //     // takeLatest(WIDGET_CREATING, widgetCreateFlow),
    //     takeLatest(WIDGET_REQUESTING, widgetRequestFlow)
    // ]
    // while (true) {
    //     console.log("watcher")

    //     // const client = yield take(WIDGET_REQUESTING);
    const { client, singleUser } = yield take(WIDGET_REQUESTING);
    
    console.log("singleUser? ", client);
    const task = yield fork(widgetRequestFlow, client);

    // }

    // yield ([
    //     takeEvery(WIDGET_REQUESTING, widgetRequestFlow)
    // ])

    // yield fork(widgetRequestFlow, ) 
}

export default widgetsWatcher;