import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Switch } from 'react-router';
import { useHistory, IndexRoute } from 'react-router-dom';
//import { browserHistory } from 'react-router';
import { persistStore, persistReducer } from 'redux-persist';
import { PersistGate } from 'redux-persist/lib/integration/react';

import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

import { applyMiddleware, createStore, compose } from 'redux';
import createSagaMiddleware from 'redux-saga'
import { Provider }  from 'react-redux';

import { createBrowserHistory } from 'history';

import './mockServer';
import App from './App';
import LoginForm from './login/loginForm.jsx';
import Login from './login';

import Widgets from './widgets/index';
import UserDetails from './widgets/userDetails';

import IndexReducer from './index-reducer';
import IndexSagas from './index-sagas';

import * as serviceWorker from './serviceWorker';

import './index.css';

import { checkIndexAuthorization, checkWidgetAuthorization } from './lib/check-auth'; //checkWidgetAuthorization: widgets --> users


import { loadState, saveState } from './localStorage'; 



const browserHistory = createBrowserHistory();

const sagaMiddleware = createSagaMiddleware();

const composeSetup = process.env.NODE_ENV !== 'production' && typeof window === 'object' &&  
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose


const persistConfig = {
  key: 'root',
  storage: storage,
  stateReconciler: autoMergeLevel2
  
};

const pReducer = persistReducer(persistConfig, IndexReducer);

// const store = createStore(
//   IndexReducer, 
//   composeSetup(applyMiddleware(sagaMiddleware)),
//   );

//--------------ORIGINAL----------------
export const store = createStore(pReducer, composeSetup(applyMiddleware(sagaMiddleware)));
export const persistor = persistStore(store);
//--------------------------------------------
// const persistedState = loadState();
// export const store = createStore(IndexReducer, persistedState, composeSetup(applyMiddleware(sagaMiddleware)));

//--------------------------------------------------------

store.subscribe(() => {
  saveState(store.getState());
})
sagaMiddleware.run(IndexSagas);




// const store = createStore(rootReducer);

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory} >
      <PersistGate  persistor={persistor} >
        <Route path="/" exact component={App} onEnter = {checkIndexAuthorization(store)} />
        <Route path = "/login" exact component = {Login} />
        <Route path="/users" exact component={Widgets} onEnter={checkWidgetAuthorization(store)} />
        <Route path="/users/:id" component={UserDetails} /> {/*add authentication */}
      </PersistGate>
      
    </Router>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
