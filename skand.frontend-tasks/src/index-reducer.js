import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

import login from './login/reducer';
import client from './client/reducer';
import widgets from './widgets/reducer';

const IndexReducer = combineReducers({
    login,
    client,
    widgets,
    form,

});

export default IndexReducer;