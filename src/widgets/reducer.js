import { WIDGET_CREATING, WIDGET_CREATE_SUCCESS, WIDGET_CREATE_ERROR, WIDGET_REQUESTING, WIDGET_REQUEST_SUCCESS, WIDGET_REQUEST_ERROR, WIDGET_UPDATING, WIDGET_UPDATE_SUCCESS, WIDGET_UPDATE_ERROR, WIDGET_DELETING, WIDGET_DELETE_SUCCESS, WIDGET_DELETE_ERROR  } from './constants';

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
                    body: `Widget: ${action.widget.id} being created...`,
                    time: new Date(),
                }],
                errors: [],
            }
        case WIDGET_CREATE_SUCCESS:
            console.log("action.widget: ", JSON.parse(action.widget._bodyText).users);
            return {
                // list: state.list.concat([action.widget]),
                list: state.list.concat([JSON.parse(action.widget._bodyText).users]),
                requesting: false,
                successful: true,
                messages: [{
                    body: `Widget: ${action.widget.id} awesomly created!`,
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
                errors: [],
            }
        case WIDGET_REQUEST_SUCCESS:
            return {
                list: action.widgets,
                // ...list,
                // singleUser: action.widgets,
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
        case WIDGET_UPDATING:
            console.log("action.widget: ", action.widget);
            return {
                ...state,
                requesting: true,
                successful: false,
                messages: [{
                    body: `Widget: ${action.widget} being UPDATED...`,
                    time: new Date(),
                }],
                errors: [],
            }
        case WIDGET_UPDATE_SUCCESS:
            // console.log("ACTION: ", state.list);
            // let updatedWidget = action.widget;
            // let newList = state.list.map(widget => widget.id === action.id ? { ...widget, updatedWidget } : widget);
            // console.log("NEW LIST: ", newList);

            let newUsersArray = [...state.list];
            for (var i in state.list) {
                console.log("state: ", state.list, action.widget);
                if (state.list[i].id == action.widget.id) {
                    console.log("found")
                    newUsersArray[i] = action.widget
                //    break; //Stop this loop, we found it!
                }
            }
            
            return {
                //list: [...state.list, ]
                // ...state,
                list: newUsersArray,
                requesting: false,
                successful: true,
                messages: [{
                    // body: `Widget: ${action.widget.name} awesomly UPDATED!`,
                    time: new Date(),
                }],
                errors: [],
            }
        
        case WIDGET_UPDATE_ERROR:
            console.log("error");
            return {
                requesting: false,
                successful: false,
                messages: [],
                errors: state.errors.concat([{
                    body: action.error.toString(),
                    time: new Date(),
                }]),
            }
        
        case WIDGET_DELETING:
            console.log("action (deleting): ", state.list)
            return {
                list: state.list,
                requesting: true,
                successful: false,
                messages: [{
                    body: `Widget: ${action.id} being deleted...`,
                    time: new Date(),
                }],
                errors: [],
            }
        case WIDGET_DELETE_SUCCESS:
            console.log("action (delete): ", state.list)
            return {
                // list: action.widgets.filter(widget => widget.id !== action.id),
                list: [...state.list.filter(widget => widget.id !== action.id)],
                requesting: false,
                successful: true,
                messages: [{
                    body: `Widget: ${action.id} deleted`,
                    time: new Date(),
                }],
                errors: [],
            }
        case WIDGET_DELETE_ERROR:
            return {
                requesting: false,
                successful: false,
                messages: [],
                errors: state.errors.concat([{
                    body: action.error, //.toString(),
                    time: new Date(),
                }]),
            }
        default:
            return state
    }
}

export default reducer;