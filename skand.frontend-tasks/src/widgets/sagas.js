import { take, fork, cancel, cancelled, call, put, takeLatest } from 'redux-saga/effects';
import { handleApiErrors } from '../lib/api-errors';
import { WIDGET_CREATING, WIDGET_DELETING, WIDGET_REQUESTING, WIDGET_UPDATING } from './constants';

import { widgetCreateSuccess, widgetCreateError, widgetRequest, widgetRequestSuccess, widgetRequestError, widgetUpdateSuccess, widgetUpdateError, widgetDeleteSuccess, widgetDeleteError } from './actions';
import { takeEvery } from 'redux-saga/effects';

const widgetsUrl = `/api/v2/users`;

function widgetDeleteApi(action) {

    return fetch(`/api/v2/users/${action.id}`, {
        method: "DELETE",
        headers: {
            Authorization: action.client.token,
        }
    })
}


function widgetCreateApi(client, widget) {
    // return fetch(widgetsUrl, {
    //     method: "POST",
    //     headers: {
    //         Authorization: client.token || undefined,
    //     },
    // }).then(handleApiErrors);
    //add some stuff here .then(response => response.json())

    return fetch("/api/v2/users", {
        method: "POST",
        headers: {
            Authorization: client.token
        },
        body: JSON.stringify(widget)
    }).then(handleApiErrors);
}

function widgetUpdateApi(client, widget) {
    console.log("widget updating...");
    return fetch(`/api/v2/users/${widget.id}`, {
        method: "PATCH",
        headers: {
            Authorization: client.token
        },
        body: JSON.stringify(widget)
        
    }).then(handleApiErrors);
}
 
async function widgetRequestApi(action) {
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
    console.log("widget request [singleuser]: ", action.singleUser);
    if (action.singleUser === null || action.singleUser === undefined) {
        return fetch(widgetsUrl, {
            method: "GET",
            headers: {
                Authorization: action.client.token
            }
        }).then(handleApiErrors)
            .then((response) => response.json()) //.then(data => data.users);
        
    }
    else
        console.log("FETCHING SINGLE USER");
        return fetch(`/api/v2/users/${action.singleUser}`, {
            method: "GET",
            headers: {
                Authorization: action.client.token
            }
        }).then(handleApiErrors)
    .then((response) => response.json())

}

function* widgetRequestFlow(action) {
    try {
        console.log("HERE");
        // const { client } = action;
        const widgets = yield call(widgetRequestApi, action);
        
        console.log("here: ", widgets.users);
        console.log(action.singleUser);
        if (action.singleUser === null || action.singleUser === undefined) 
            yield put(widgetRequestSuccess(widgets.users));
    } catch (error) {
        console.log("error");
        yield put(widgetRequestError(error));
    }
}

function* widgetCreateFlow(action) {
    try {
        console.log("widget create")
        const { client, widget } = action;
        const createdWidget = yield call(widgetCreateApi, client, widget);

        yield put(widgetCreateSuccess(createdWidget))
    } catch (error) {
        yield put (widgetCreateError(error))
    }
}

function* widgetUpdateFlow(action) {
    try {
        console.log("widgetUpdateFLow")
        const { client, widget } = action;
        console.log("widget: (JSON.parse, JSON.stringify) ", /*JSON.parse(widget)*/ JSON.stringify(widget));
        const updatedWidget = yield call(widgetUpdateApi, client, widget);

        //CHANGE -------------------------------------------
        // const widgets = yield call(widgetRequestApi, action);
        // console.log("Updated widget: ", updatedWidget.users.id);

        yield put(widgetUpdateSuccess(updatedWidget));

        // yield widgetRequestFlow(action);
        // const widgets = yield call(widgetRequestApi, action);
        // console.log("updated widget: ", updatedWidget.users.id);

        // yield put(widgetRequestSuccess(widgets));

    } catch (error) {
        yield put(widgetUpdateError(error));
        
    }
}

function* widgetDeleteFlow(action) {
    try { 
        const del = yield call(widgetDeleteApi, action);
        console.log("DEL: ", del);
        // widgetRequest(action.client);
        yield put(widgetDeleteSuccess(action.id));
        // yield widgetRequestFlow(action);

    } catch (error) {
        yield put(widgetDeleteError(error));
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
    // const { client, singleUser } = yield take(WIDGET_REQUESTING);
    // const actionCreate = yield take(WIDGET_CREATING);
    // console.log("action create: ", actionCreate);
    // const actionCreate_task = yield fork(widgetCreateFlow, actionCreate);

    // while (true) {
    //     const request = yield take(WIDGET_REQUESTING);
    //     console.log("singleUser? ", request);
    //     const task = yield fork(widgetRequestFlow, request);
        
    //     const actionCreate = yield take(WIDGET_CREATING);
    //     console.log("action create: ", actionCreate);
    //     const actionCreate_task = yield fork(widgetCreateFlow, actionCreate);

    //     const action = yield take(WIDGET_UPDATING);
    //     console.log("action: ",  action );
    //     const action_task = yield fork(widgetUpdateFlow, action);

    yield takeEvery(WIDGET_REQUESTING, widgetRequestFlow);
    yield takeEvery(WIDGET_CREATING, widgetCreateFlow);
    yield takeEvery(WIDGET_UPDATING, widgetUpdateFlow);
    yield takeEvery(WIDGET_DELETING, widgetDeleteFlow);


    // }

    // while (true) {
    //     yield [
    //         take(WIDGET_REQUESTING, widgetRequestFlow),
    //         takeEvery(WIDGET_CREATING, widgetCreateFlow),
    //         takeEvery(WIDGET_UPDATING, widgetUpdateFlow)
    //     ]

    // }

    // }

    // yield ([
    //     takeEvery(WIDGET_REQUESTING, widgetRequestFlow)
    // ])

    // yield fork(widgetRequestFlow, ) 
}

export default widgetsWatcher;