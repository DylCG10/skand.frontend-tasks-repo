import { WIDGET_CREATING, WIDGET_CREATE_SUCCESS, WIDGET_CREATE_ERROR, WIDGET_REQUESTING, WIDGET_REQUEST_SUCCESS, WIDGET_REQUEST_ERROR } from './constants';

const initialState = {
    list: [],
    requesting: false,
    successful: false,
    messages: [],
    errors: []
}

const reducer = function widgetReducer(state = initialState, action) {
    switch (action.type) {
        case WIDGET_CREATING:
            return {
                ...state,
                requesting: true,
                successful: false,
                messages: [{
                    body: `Widget: ${action.widget.name} being created...`,
                    time: new Date(),
                }],
                errors: [],
            }
        case WIDGET_CREATE_SUCCESS:
            return {
                list: state.list.concat([action.widget]),
                requesting: false,
                successful: true,
                messages: [{
                    body: `Widget: ${action.widget.name} awesomly created!`,
                    time: new Date(),
                }],
                errors: [],
            }
        case WIDGET_CREATE_ERROR:
            return {
                ...state,
                requesting: false,
                successful: false,
                messages: [],
                errors: state.errors.concat([{
                    body: `Widget: ${action.widget.name} awesomly created!`,
                    time: new Date(),
                }]),
            }
        
        case WIDGET_REQUESTING:
            return {
                requesting: true,
                successful: false,
                messages: [],
                errors: state.errors.concat([{
                    body: action.error.toString(),
                    time: new Date(),
                }]),
            }
        case WIDGET_REQUEST_SUCCESS:
            return {
                list: action.widgets,
                requesting: false,
                successful: true,
                messages: [{
                    body: `Widgets fetched!`,
                    time: new Date(),
                }],
                errors: [],
            }
        case WIDGET_REQUEST_ERROR:
            return {
                requesting: false,
                successful: false,
                messages: [],
                errors: state.errors.concat([{
                    body: action.error.toString(),
                    time: new Date(),
                }]),
            }
        default:
            return state
    }
}

export default reducer;