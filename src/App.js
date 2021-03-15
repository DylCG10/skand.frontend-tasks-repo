import React from 'react';
import { PropTypes } from 'prop-types';
import { createBrowserHistory } from 'history';


import './App.css';

const browserHistory = createBrowserHistory();

// const token = localStorage.getItem("token");
function reload() {
  browserHistory.push("/login");
  window.location.reload();
}

const App = props => (
  <div className = "App">
    <div className = "App-header">
      <h2>Welcome!</h2>
      <button onClick = {reload}>Click here to login!</button>

    </div>
    <section className="App-body">
      {props.children}
    </section>
  </div>
)

App.propTypes = {
  children: PropTypes.node,
}
// function App() {
//   return (
//     <Router>
      
//       {token === null ? <Route path = "/" exact component = {Login}/> : <Route path = "/users" component = {UsersIndexTable} />}
//       {/* <Login onSubmit = {(email, password) => { */}

//     </Router>
//   );
// }

export default App;
