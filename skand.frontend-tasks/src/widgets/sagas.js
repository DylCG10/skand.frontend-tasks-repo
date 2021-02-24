import { call, put, takeLatest } from 'redux-saga/effects';
import { handleApiErrors } from '../lib/api-errors';
import { WIDGET_CREATING, WIDGET_REQUESTING } from './constants';

import { widgetCreateSuccess, widgetCreateError, widgetRequestSuccess, widgetRequestError } from './actions';

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

function widgetRequestApi(client) {
    const request = fetch(widgetsUrl, {
        method: "GET",
        headers: {
            Authorization: client.token || undefined, // client.token.id?
        }
    })

}

function* widgetRequestFlow(action) {
    try {
        const { client } = action;
        const widgets = yield call(widgetRequestApi, client);

        yield put(widgetRequestSuccess(widgets));
    } catch (error) {
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
    yield [
        takeLatest(WIDGET_CREATING, widgetCreateFlow),
        takeLatest(WIDGET_REQUESTING, widgetRequestFlow)
    ]
}

export default widgetsWatcher;