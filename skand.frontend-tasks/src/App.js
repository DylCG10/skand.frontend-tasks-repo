import React from 'react';
import {connect} from 'react-redux';

import './App.css';

import Login from './pages/login.jsx';



function App() {
  return (
    <div>
      <Login onSubmit = {(email, password) => {

      }}/>
    </div>
  );
}

export default App;
