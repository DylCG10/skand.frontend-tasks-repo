import React from 'react';
import { PropTypes } from 'prop-types';
import { createBrowserHistory } from 'history';


import { Button, Container, Row } from 'react-bootstrap';

// import './css/test.css';
import './App.css';

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
          <img id = "skand-main-page" src = "/skand-logo2.png" alt="test"/>
        
        </Row>
        <Row>
          {/* <button className = "btn" onClick = {reload}>Click here to login!</button> */}
          <Button variant="primary" className="btn-primary" onClick={reload}>--></Button> {/*add small moveable AWSD character to load next page instead of button */}
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
