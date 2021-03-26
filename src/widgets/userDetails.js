import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { createBrowserHistory } from 'history';

import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {Link } from 'react-router-dom';

import {widgetCreate, widgetUpdate } from './actions';
import { Container, Row, Form, Jumbotron, Col, Button } from 'react-bootstrap';

import '../css/widgets.css';

const browserHistory = createBrowserHistory();

const validationSchema = Yup.object().shape({
    id: Yup.string()
        .required('ID is required'),
    email: Yup.string()
        .email('Email is invalid')
        .required('Email is required'),
    first_name: Yup.string().required("First name is required"),
    last_name: Yup.string().required("Last name is required"),
    jobs_count: Yup.string()
        .required('Jobs Count is required'),
        // active: Yup.string().required("Active status is required")
});
    
class UserDetails extends Component {
    constructor(props) {
        super(props);

        this.state = {
            opened: false,
            isAddMode: false,
            user: {}
        }
    }

    
    async componentDidMount() {
        if (window.location.pathname === "/users/add") {
            console.log(window.location.pathname)
            await this.setState({ isAddMode: true })
        }

        if (!this.state.isAddMode) {
            console.log("ComponentDidMount");
            this.setState({ opened: false })

            console.log((browserHistory.location.pathname).split("/")[2]);
            console.log(this.props.widgets.list[0].id);
            const user = await this.props.widgets.list.filter(user => user.id === (browserHistory.location.pathname).split("/")[2]);
            console.log(user);
            this.setState({ user: user[0] }); //user.id === (browserHistory.location.pathname).split("/")[2]) })
            console.log("USER: ", this.state.user);

        }
    }
    
    onSubmit = async (values) => {
        console.log(values);
        if (values.active === "true")
            values.active = true;
        else
            values.active = false;
        console.log('submit');
        if (!this.state.isAddMode) {
            this.props.widgetUpdate(this.props.client, values);
            
        }
        else {
            console.log("widgetCreate");
            await this.props.widgetCreate(this.props.client, values);
        }
        this.setState({ opened: false })
    };

    reload() {
        browserHistory.push("/users");
        window.location.reload();
    }


    render() {

        if (this.state.user.id === undefined && !this.state.isAddMode)
            return <h1>Loading...</h1>
        
        console.log("new list: ", this.props.widgets.list);

        let initialValues;

        
        this.state.user === undefined ? initialValues = {
            id: '',
            email: '',
            first_name: '',
            last_name: '',
            jobs_count: '',
            active: ''
        } : initialValues = {
            id: this.state.user.id,
            email: this.state.user.email,
            first_name: this.state.user.first_name,
            last_name: this.state.user.last_name,
            jobs_count: this.state.user.jobs_count,
            active: this.state.user.active
        }

        initialValues = {
            id: this.state.user.id,
            email: this.state.user.email,
            first_name: this.state.user.first_name,
            last_name: this.state.user.last_name,
            jobs_count: this.state.user.jobs_count,
            active: this.state.user.active,
        }
            

        
        return (
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={this.onSubmit}>
                {({ errors, touched, isSubmitting, setFieldValue, handleChange, handleBlur, values, handleSubmit }) => {
                    return (
                        <Container id = "userDetails-container">
                            {/* <Row>
                                <Col>
                                    <h1>{this.state.isAddMode ? 'Add User' : 'Edit User'}</h1>
                                
                                </Col>

                            </Row> */}
                            <Row>
                                <Col>
                                <Jumbotron>
                                <h1>{this.state.isAddMode ? 'Add User' : 'Edit User'}</h1>

                                    <Form className="form userDetails" onSubmit={handleSubmit}>
                                        {/* <Row> */}
                                            <Form.Group controlId="formBasicId">
                                                <Form.Label style={{ color: "black" }}>ID</Form.Label>
                                                <Form.Control
                                                    type="id"
                                                    name="id"
                                                    placeholder="Enter id"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.id}
                                                    className={
                                                        touched.id && errors.id ? "error" : null
                                                    }  
                                                    />
                                                {touched.id && errors.id ? (
                                                    <div className="error-message" style={{ color: 'red' }}>{errors.id}</div>
                                                ) : null}
                                            </Form.Group>
                                        {/* </Row> */}
                                        {/* <Row> */}
                                            <Form.Group controlId="formBasicEmail">
                                                <Form.Label style={{ color: "black" }}>Email</Form.Label>
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
                                        {/* </Row> */}
                                        {/* <Row> */}
                                            <Form.Group controlId="formBasicFirstName">
                                                <Form.Label style={{ color: "black" }}>First Name</Form.Label>
                                                <Form.Control
                                                    type="first_name"
                                                    name="first_name"
                                                    placeholder="Enter first name"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.first_name}
                                                    className={
                                                        touched.first_name && errors.first_name ? "error" : null
                                                    } />
                                                {touched.first_name && errors.first_name ? (
                                                    <div className="error-message" style={{ color: 'red' }}>{errors.first_name}</div>
                                                ) : null}
                                            </Form.Group>
                                        {/* </Row> */}
                                        {/* <Row> */}
                                            <Form.Group controlId="formBasicLastName">
                                                <Form.Label style={{ color: "black" }}>Last Name</Form.Label>
                                                <Form.Control
                                                    type="last_name"
                                                    name="last_name"
                                                    placeholder="Enter last name"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.last_name}
                                                    className={
                                                        touched.last_name && errors.last_name ? "error" : null
                                                    } />
                                                {touched.last_name && errors.last_name ? (
                                                    <div className="error-message" style={{ color: 'red' }}>{errors.last_name}</div>
                                                ) : null}
                                            </Form.Group>
                                        {/* </Row> */}
                                        {/* <Row> */}
                                            <Form.Group controlId="formBasicJobsCount">
                                                <Form.Label style={{ color: "black" }}>Jobs Count</Form.Label>
                                                <Form.Control
                                                    type="jobs_count"
                                                    name="jobs_count"
                                                    placeholder="Enter jobs count"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.jobs_count}
                                                    className={
                                                        touched.jobs_count && errors.jobs_count ? "error" : null
                                                    } />
                                                {touched.jobs_count && errors.jobs_count ? (
                                                    <div className="error-message" style={{ color: 'red' }}>{errors.jobs_count}</div>
                                                ) : null}
                                            </Form.Group>
                                        {/* </Row> */}
                                        {/* <Row> */}
                                            <Form.Group controlId="formBasicActive">
                                                <Form.Label style={{ color: "black" }}>Active</Form.Label>
                                                {/* <div key={`default-checkbox`} className="mb-3"> */}
                                                    <Form.Check 
                                                    type={"checkbox"}
                                                    id={`default-checkbox`}
                                                    
                                                    />
                                                    {/* </div> */}
                                                {/* <Form.Control
                                                    type="active"
                                                    name="active"
                                                    placeholder="Enter active"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.active}
                                                    className={
                                                        touched.active && errors.active ? "error" : null
                                                    } />
                                                {touched.active && errors.active ? (
                                                    <div className="error-message" style={{ color: 'red' }}>{errors.active}</div>
                                                ) : null} */}

                                            </Form.Group>
                                        {/* </Row> */}
                                        <Button type="submit" variant="primary" size="lg" block>
                                                Submit
                                        </Button>
                                        </Form>
                                        </Jumbotron>
                                    </Col>
                            </Row>
                        </Container>
                    );
                }}
            </Formik>
        )
    }
}




/*
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

        */
const mapStateToProps = state => ({
    client: state.client,
    widgets: state.widgets,
});

const connected = connect(mapStateToProps, {widgetUpdate, widgetCreate })(UserDetails);
const formed = reduxForm({
    form: 'widgets'
})(connected);
export default formed;
