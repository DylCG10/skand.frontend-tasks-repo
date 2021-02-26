import { WIDGET_CREATING, WIDGET_CREATE_SUCCESS, WIDGET_CREATE_ERROR, WIDGET_REQUESTING, WIDGET_REQUEST_SUCCESS, WIDGET_REQUEST_ERROR, WIDGET_UPDATING, WIDGET_UPDATE_SUCCESS, WIDGET_UPDATE_ERROR  } from './constants';

export const widgetCreate = function widgetCreate(client, widget) {
    console.log('creating...')
    return {
        type: WIDGET_CREATING,
        client,
        widget
    }
}

export const widgetCreateSuccess = function widgetCreateSuccess(widget) {
    return {
        type: WIDGET_CREATE_SUCCESS,
        widget
    }
}

export const widgetCreateError = function widgetCreateError(error) {
    return {
        type: WIDGET_CREATE_ERROR,
        error
    }
}

export const widgetRequest = function widgetRequest(client, singleUser) {
    console.log('request');
    return {
        type: WIDGET_REQUESTING,
        client,
        singleUser
    }
}

export const widgetRequestSuccess = function widgetRequestSuccess(widgets) {
    return {
        type: WIDGET_REQUEST_SUCCESS,
        widgets
    }
}
export const widgetRequestError = function widgetRequestError(error) {
    return {
        type: WIDGET_REQUEST_ERROR,
        error
    }
}

export const widgetUpdate = function widgetUpdate(client, widget) {
    console.log("widgetUpdate action");
    return {
        type: WIDGET_UPDATING,
        client,
        widget
    }
}

export const widgetUpdateSuccess = function widgetUpdateSuccess(widget) {
    return {
        type: WIDGET_UPDATE_SUCCESS,
        widget
    }
}

export const widgetUpdateError = function widgetUpdateError(error) {
    return {
        type: WIDGET_UPDATING,
        error
    }
}