import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
// import { PropTypes } from 'prop-types';

import loginRequest from "./actions";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {
  Button,
  FormControl,
  InputGroup,
  Jumbotron,
  Form,
} from "react-bootstrap";
import { Formik, ErrorMessage } from "formik";

import * as Yup from "yup";

import "../css/login.css";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Email is invalid").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

class Login extends Component {
  submit = (values) => {
    console.log("values: ", values);
    this.props.loginRequest(values);
  };

  render() {
    // const { handleSubmit } = this.props;

    const initialValues = {
      email: "",
      password: "",
    };
    return (
      <div className="bg">
        <Container className="p-3">
          <Row>
            <Col id="img-col">
              <img id="logo-title" src="/skand-white.png" alt="skand" />
            </Col>
          </Row>
          <Row>
            <Col>
              <Jumbotron>
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={this.submit}
                >
                  {({
                    values,
                    errors,
                    touched,
                    handleChange,
                      handleBlur,
                    handleSubmit
                                }) => (
                                    <div classname="inputs">
                                        <Form onSubmit={handleSubmit}>
                                        <Form.Group controlId="formBasicEmail">
                                            <Form.Label>Email address</Form.Label>
                                            <Form.Control
                                            type="email"
                                            name="email"
                                            placeholder="Enter email"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.email}
                                            className={
                                                touched.email && errors.email ? "error" : null
                                            } />
                                            {touched.email && errors.email ? (
                                                <div className="error-message" style={{ color: 'red' }}>{errors.email}</div>
                                            ) : null}
                                        </Form.Group>

                                        <Form.Group controlId="formBasicPassword">
                                            <Form.Label>Password</Form.Label>
                                            <Form.Control
                                                type="password"
                                                name="password"
                                                placeholder="Password"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.password}
                                                className={
                                                    touched.password && errors.password ? "error" : null
                                                }
                                            />
                                            {touched.password && errors.password ? (
                                                <div className="error-message" style={{ color: 'red' }}>{errors.password}</div>
                                            ) : null}
                                        </Form.Group>
                      <Button type="submit" variant="secondary" size="lg" block>
                                                Login
                      </Button>
                      </Form>
                    </div>
                  )}
                </Formik>
              </Jumbotron>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  login: state.login,
});

const connected = connect(mapStateToProps, { loginRequest })(Login);

const formed = reduxForm({
  form: "login",
})(connected);

export default formed;

// import React, { Component } from 'react';
// import { reduxForm, Field } from 'redux-form';
// import { connect } from 'react-redux';
// // import { PropTypes } from 'prop-types';

// import loginRequest from './actions';

// import '../css/login.css';

// class Login extends Component {

//     // static propTypes = {
//     //     handleSubmit: PropTypes.func,
//     //     loginRequest: PropTypes.func,
//     //     login: PropTypes.shape({
//     //         requesting: PropTypes.bool,
//     //         successful: PropTypes.bool,
//     //         messages: PropTypes.array,
//     //         errors: PropTypes.array,
//     //     })
//     // }
//     // componentDidMount() {
//     //     window.location.reload();
//     // }
//     submit = (values) => {
//         console.log("values: ", values);
//         this.props.loginRequest(values);
//     }

//     render() {
//         const {
//             handleSubmit,
//             // login: {
//             //     requesting,
//             //     successful,
//             //     messages,
//             //     errors,
//             // },
//         } = this.props;

//         return (
//             <div className="container">
//                 <form onSubmit={handleSubmit(this.submit)}>
//                     <h1>Login</h1>
//                     <div class = "input-label">
//                         <label id = "email"/*htmlFor = "email"*/>Email</label>
//                         <Field
//                             name="email"
//                             type="text"
//                             id="email"
//                             className="email"
//                             label="Email"
//                             component="input"
//                         />

//                     </div>
//                     <label htmlFor = "password">Password</label>
//                     <Field
//                         name="password"
//                         type="text"
//                         id="password"
//                         className="password"
//                         label="Password"
//                         component="input"
//                     />
//                     <button action = "submit">LOGIN</button>

//                 </form>
//             </div>
//         )
//     }
// }

// const mapStateToProps = state => ({
//     login: state.login
// })

// const connected = connect(mapStateToProps, { loginRequest })(Login);

// const formed = reduxForm({
//     form: 'login',
// })(connected)

// export default formed;
