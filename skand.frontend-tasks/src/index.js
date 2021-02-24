import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Switch } from 'react-router';
import { useHistory, IndexRoute } from 'react-router-dom';
//import { browserHistory } from 'react-router';

import { applyMiddleware, createStore, compose } from 'redux';
import createSagaMiddleware from 'redux-saga'
import { Provider }  from 'react-redux';

import { createBrowserHistory } from 'history';

import './mockServer';
import App from './App';
import LoginForm from './login/loginForm.jsx';
import Login from './login';

import Widgets from './widgets';

import IndexReducer from './index-reducer';
import IndexSagas from './index-sagas';

import * as serviceWorker from './serviceWorker';

import './index.css';

import { checkIndexAuthorization, checkWidgetAuthorization } from './lib/check-auth'; //checkWidgetAuthorization: widgets --> users



const browserHistory = createBrowserHistory();

const sagaMiddleware = createSagaMiddleware();

const composeSetup = process.env.NODE_ENV !== 'production' && typeof window === 'object' &&  
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose

const store = createStore(
  IndexReducer, 
  composeSetup(applyMiddleware(sagaMiddleware)),
  );

sagaMiddleware.run(IndexSagas);





// const store = createStore(rootReducer);

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory} >
    
      <Route path="/" exact component={App} onEnter = {checkIndexAuthorization(store)} />
      <Route path = "/login" exact component = {Login} />
      <Route path = "/widgets" exact component = {Widgets} onEnter = {checkWidgetAuthorization(store)} />

      
    </Router>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
