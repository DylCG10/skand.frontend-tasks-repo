import React from 'react';
import { PropTypes } from 'prop-types';


import './App.css';


// const token = localStorage.getItem("token");

const App = props => (
  <div className = "App">
    <div className = "App-header">
      <h2>Welcome</h2>

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
