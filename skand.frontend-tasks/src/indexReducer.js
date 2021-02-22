import { combineReducers } from 'redux';

import { authentication } from './reducers/authReducer';
import login from './login/reducer';
import client from './client/reducer';

const IndexReducer = combineReducers({
    client,
    login
});

export default IndexReducer;