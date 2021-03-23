import React from 'react';
import { PropTypes } from 'prop-types';
import { createBrowserHistory } from 'history';


import './App.css';
import { Container, Row } from 'react-bootstrap';

const browserHistory = createBrowserHistory();

// const token = localStorage.getItem("token");
function reload() {
  browserHistory.push("/login");
  window.location.reload();
}

const App = props => (
  <div className = "App">
    <div className="App-header">
      <Container>
        <Row>
          <img src = "/skand-logo2.png" alt="test"/>
        
        </Row>
        <Row>
          <button className = "btn" onClick = {reload}>Click here to login!</button>
        
        </Row>
      </Container>
      {/* <h2>skand</h2> */}

    </div>
    <section className="App-body">
      {props.children}
    </section>
  </div>
)

App.propTypes = {
  children: PropTypes.node,
}

export default App;
