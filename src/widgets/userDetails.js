import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { createBrowserHistory } from 'history';

import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {Link } from 'react-router-dom';

import {widgetCreate, widgetUpdate } from './actions';
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
            await this.setState({isAddMode: true})
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
        else 
        {
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
            <>
                {console.log("initial values: ", initialValues)}
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={this.onSubmit}>
                    {({ errors, touched, isSubmitting, setFieldValue }) => {
                        return (
                            <div class="d-flex p-2 mx-auto" style={{width: "400px", marginTop: "100px"}}>

                                <Form class="d-flex flex-column ">
                                <h1 className = "d-inline-block">{this.state.isAddMode ? 'Add User' : 'Edit User'}</h1>

                                    <div className="d-flex flex-row">
                                            <label className = 'p-2 col-xs-12 col-md-8'>ID</label>
                                        <Field name="id" type="text" style = {{width: "100%"}} className={'p-2 col-xs-6 col-md-7 form-control' + (errors.id && touched.id ? ' is-invalid' : '')} />
                                    </div>
                                    <ErrorMessage name="id" className="invalid-feedback">{msg => <div style={{ color: 'red' }}>{msg}</div>}</ErrorMessage>

                                    <div class = "d-flex flex-row row ">
                                            <label className = 'p-2 col-xs-12 col-md-8'>Email</label>
                                            <Field name="email"  type="text" className={'p-2 col-xs-6 col-md-7 form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
                                    </div>
                                    <ErrorMessage name="email" className="invalid-feedback">{msg => <div style={{ color: 'red' }}>{msg}</div>}</ErrorMessage>


                                    <div className="d-flex flex-row row">
                                            <label className = 'p-2 col-xs-12 col-md-8'>First Name</label>
                                            <Field name="first_name" type="text" className={'p-2 col-xs-6 col-md-7 form-control' + (errors.firstName && touched.firstName ? ' is-invalid' : '')} />
                                    </div>
                                    <ErrorMessage name="first_name" className="invalid-feedback">{msg => <div style={{ color: 'red' }}>{msg}</div>}</ErrorMessage>

                                    <div className="d-flex flex-row row">
                                            <label className = 'p-2 col-xs-12 col-md-8'>Last Name</label>
                                            <Field name="last_name" type="text" className={'p-2 col-xs-6 col-md-7 form-control' + (errors.lastName && touched.lastName ? ' is-invalid' : '')} />
                                            {/* <ErrorMessage name="last_name" component="div" className="invalid-feedback" /> */}
                                    </div>
                                    <ErrorMessage name="last_name" className="invalid-feedback">{msg => <div style={{ color: 'red' }}>{msg}</div>}</ErrorMessage>

                                    <div className="d-flex flex-row row">
                                            <label className = 'p-2 col-xs-12 col-md-8'>Jobs Count</label>
                                            <Field name="jobs_count" type="text" className={'p-2 col-xs-6 col-md-7 form-control' + (errors.lastName && touched.lastName ? ' is-invalid' : '')} />
                                            {/* <ErrorMessage name="jobsCount" component="div" className="invalid-feedback" /> */}
                                    </div>
                                    <ErrorMessage name="jobs_count" className="invalid-feedback">{msg => <div style={{ color: 'red' }}>{msg}</div>}</ErrorMessage>

                                    <div className="d-flex flex-row">
                                            <label className = 'p-2 '>Active</label>
                                            <Field name="active" as="select" className={'p-2 col-xs-6 col-md-7 align-self-end form-control' /*+(errors.active ? ' is-invalid' : '') */}>
                                                <option className = 'p-2 col-xs-6 col-md-7' value= "true" >True</option>
                                                <option className = 'p-2 col-xs-6 col-md-7' value="false">False</option>
                                            </Field>
                                            {/* <ErrorMessage name="active" component="div" className="invalid-feedback" /> */}
                                    </div>
                                    <ErrorMessage name="active" className="invalid-feedback">{msg => <div style={{ color: 'red' }}>{msg}</div>}</ErrorMessage>

                                    <div className="d-flex flex-row">
                                        <button type="submit" disabled={isSubmitting} className="p-2 btn btn-primary ">
                                            {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                                        Save
                                        </button>
                                        {/* <Link to={"/users"} style={{ color: "red" }} className="p-2 btn btn-link align-self-end" onClick={() => window.location.reload()}>Cancel/Go Back</Link> */}
                                        <Link style={{ color: "red" }} className="p-2 btn btn-link align-self-end" onClick={this.reload}>Cancel/Go Back</Link>

                                    </div>
                                    </Form>
                            </div>
                                
                        );
                    }}
                </Formik>
            </>
        )
    }
}

const mapStateToProps = state => ({
    client: state.client,
    widgets: state.widgets,
});

const connected = connect(mapStateToProps, {widgetUpdate, widgetCreate })(UserDetails);
const formed = reduxForm({
    form: 'widgets'
})(connected);
export default formed;
