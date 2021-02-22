import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route } from 'react-router';
import { useHistory } from 'react-router-dom';
//import { browserHistory } from 'react-router';

import { applyMiddleware, createStore, compose } from 'redux';
import createSagaMiddleware from 'redux-saga'
import { Provider }  from 'react-redux';

import './mockServer';
import App from './App';
import LoginForm from './login/login.jsx';
import UsersIndexTable from './usersIndex';

import IndexReducer from './indexReducer';
import IndexSagas from './index-sagas';

import * as serviceWorker from './serviceWorker';

import './index.css';


const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  IndexReducer, 
  compose(applyMiddleware(sagaMiddleware)),
  );

sagaMiddleware.run(IndexSagas);





// const store = createStore(rootReducer);

ReactDOM.render(
  <Provider store = {store}>
    <Router /*history = {useHistory() }*/>
      <Route path = "/" component = {App}>
        <Route path = "/login" component = {LoginForm} />
        <Route path = "/users" component = {UsersIndexTable} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
