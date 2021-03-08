import React, { Component } from 'react';
import { useEffect, useState } from "react";
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { createBrowserHistory } from 'history';

import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useParams, Link } from 'react-router-dom';

import { widgetRequest, widgetCreate, widgetUpdate } from './actions';

const browserHistory = createBrowserHistory();

const validationSchema = Yup.object().shape({
    id: Yup.string()
        .required('ID is required'),
    email: Yup.string()
        .email('Email is invalid')
        .required('Email is required'),
    jobs_count: Yup.string()
        .required('Jobs Count is required'),
        active: Yup.string().required("Active status is required")
});
    
class UserDetails extends Component {
// function UserDetails () {
    // constructor(props) {
    //     super(props);
    //     console.log(this.props.widgets.list);
    //     console.log((browserHistory.location.pathname).split("/")[2]);
    //     // this.fetchUser();
    // }

    // const fetchUser = async() => {
    //     const request = await this.props.widgetRequest(this.props.client, (browserHistory.location.pathname).split("/")[2]);
    // }

    // componentDidMount() {
    //     const user = this.props.widgets.list;
    // }
    constructor(props) {
        super(props);

        this.state = {
            opened: false,
            isAddMode: false,
            user: {}
        }




    }

    
    async componentDidMount() {
        if (window.location.pathname == "/users/add") {
            console.log(window.location.pathname)
            await this.setState({isAddMode: true})
        }

        if (!this.state.isAddMode) {
            this.setState({ opened: false })
            // console.log("addMode: ", this.state.isAddMode);
            // console.log(this.state.opened);
            // console.log("didMount");
            console.log((browserHistory.location.pathname).split("/")[2]);
            console.log(this.props.widgets.list[0].id);
            const user = await this.props.widgets.list.filter(user => user.id === (browserHistory.location.pathname).split("/")[2]);
            console.log(user);
            this.setState({ user: user[0] }); //user.id === (browserHistory.location.pathname).split("/")[2]) })
            // this.props.widgetRequest(this.props.client, (browserHistory.location.pathname).split("/")[2]);
            console.log("USER: ", this.state.user);

        }
    }


    // console.log("user details")
    onSubmit = async (values) => {
        // const { id, email, first_name, last_name, jobs_count, active } = values;
        console.log(values);
        console.log('submit');
        if (!this.state.isAddMode) {
            await this.props.widgetUpdate(this.props.client, values);
            
        }
        else 
        {
            console.log("widgetCreate");
            await this.props.widgetCreate(this.props.client, values);
        }
        this.setState({ opened: false })
    };

    // useEffect(() => {
    //     console.log("hello");
    //     this.props.widgetRequest(this.props.client, (browserHistory.location.pathname).split("/")[2]);
    // }, []);



    render() {
        // if ((!this.props.widgets.successful || this.props.widgets.list === undefined) && window.location.pathname !== "/users/add") {
        //     return <h1>Loading..</h1>
        // }
        // console.log(this.state.user {})
        if (this.state.user.id === undefined)
            return <h1>Loading...</h1>
        // console.log(undefined.id);
        // if (!this.state.isAddMode) {
        //     const initialValues = {
        //         id: this.props.widgets.list.id,
        //         email: this.props.widgets.list.email,
        //         first_name: this.props.widgets.list.first_name,
        //         last_name: this.props.widgets.list.last_name,
        //         jobs_count: this.props.widgets.list.jobs_count,
        //         active: this.props.widgets.list.active,
        //     }
        // }
        // else {
        //     const initialValues = {
        //         id: '',
        //         email: '',
        //         first_name: '',
        //         last_name: '',
        //         jobs_count: '',
        //         active: ''
        //     }
        // }
        // const initialValues = {
        //     id: this.props.widgets.list.id,
        //     email: this.props.widgets.list.email,
        //     first_name: this.props.widgets.list.first_name,
        //     last_name: this.props.widgets.list.last_name,
        //     jobs_count: this.props.widgets.list.jobs_count,
        //     active: this.props.widgets.list.active,
        // }
        // console.log("EQUAL? ", this.state.user)
        console.log("new list: ", this.props.widgets.list);

        let initialValues;

        {
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
                {        console.log("initial values: ", initialValues)}
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={this.onSubmit}>
                    {({ errors, touched, isSubmitting, setFieldValue }) => {
                        return (
                            <Form>
                                <h1>{this.state.isAddMode ? 'Add User' : 'Edit User'}</h1>
                                <div className="form-row">
                                    <div className="form-group col-5">
                                        <label>ID</label>
                                        <Field name="id" type="text" className={'form-control' + (errors.id && touched.id ? ' is-invalid' : '')} />
                                        <ErrorMessage name="id" component="div" className="invalid-feedback" />
                                    </div>
                                    <div className="form-group col-5">
                                        <label>Email</label>
                                        <Field name="email"  type="text" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
                                        <ErrorMessage name="email" component="div" className="invalid-feedback" />
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-7">
                                        <label>First Name</label>
                                        <Field name="first_name" type="text" className={'form-control' + (errors.firstName && touched.firstName ? ' is-invalid' : '')} />
                                        <ErrorMessage name="first_name" component="div" className="invalid-feedback" />
                                    </div>
                                    <div className="form-group col-7">
                                        <label>Last Name</label>
                                        <Field name="last_name" type="text" className={'form-control' + (errors.lastName && touched.lastName ? ' is-invalid' : '')} />
                                        <ErrorMessage name="last_name" component="div" className="invalid-feedback" />
                                    </div>
                                    <div className="form-group col-7">
                                        <label>Jobs Count</label>
                                        <Field name="jobs_count" type="text" className={'form-control' + (errors.lastName && touched.lastName ? ' is-invalid' : '')} />
                                        <ErrorMessage name="jobsCount" component="div" className="invalid-feedback" />
                                    </div>
                                </div>
                                <div className="form-group col">
                                    <label>Active</label>
                                    <Field name="active" as="select" className={'form-control' + (errors.active && touched.active ? ' is-invalid' : '')}>
                                        <option value="True">True</option>
                                        <option value="False">False</option>
                                    </Field>
                                    <ErrorMessage name="active" component="div" className="invalid-feedback" />
                                </div>
                                <div className="form-group">
                                    <button type="submit" disabled={isSubmitting} className="btn btn-primary">
                                        {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                                    Save
                                </button>
                                    <Link to={"/users"} className="btn btn-link">Cancel</Link>
                                </div>
                            </Form>
                        );
                    }}
                </Formik>
            </>
        )
    }
    // renderBody = () => {


    //     return (
    //         <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={this.onSubmit}>
    //                 {({ errors, touched, isSubmitting, setFieldValue }) => {
                

    //                     return (
    //                         <Form>
    //                             <h1>{isAddMode ? 'Add User' : 'Edit User'}</h1>
    //                             <div className="form-row">
    //                                 <div className="form-group col-5">
    //                                     <label>ID</label>
    //                                     <Field name="id" placeholder={this.props.widgets.list.id} type="text" className={'form-control' + (errors.id && touched.id ? ' is-invalid' : '')} />
    //                                     <ErrorMessage name="id" component="div" className="invalid-feedback" />
    //                                 </div>
    //                                 <div className="form-group col-5">
    //                                     <label>Email</label>
    //                                     <Field name="email" type="text" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
    //                                     <ErrorMessage name="email" component="div" className="invalid-feedback" />
    //                                 </div>
    //                             </div>
    //                             <div className="form-row">
    //                                 <div className="form-group col-7">
    //                                     <label>First Name</label>
    //                                     <Field name="firstName" type="text" className={'form-control' + (errors.firstName && touched.firstName ? ' is-invalid' : '')} />
    //                                     <ErrorMessage name="firstName" component="div" className="invalid-feedback" />
    //                                 </div>
    //                                 <div className="form-group col-7">
    //                                     <label>Last Name</label>
    //                                     <Field name="lastName" type="text" className={'form-control' + (errors.lastName && touched.lastName ? ' is-invalid' : '')} />
    //                                     <ErrorMessage name="lastName" component="div" className="invalid-feedback" />
    //                                 </div>
    //                             </div>
    //                             <div className="form-group col">
    //                                 <label>Active</label>
    //                                 <Field name="active" as="select" className={'form-control' + (errors.active && touched.active ? ' is-invalid' : '')}>
    //                                     <option value="True">True</option>
    //                                     <option value="False">False</option>
    //                                 </Field>
    //                                 <ErrorMessage name="active" component="div" className="invalid-feedback" />
    //                             </div>
    //                             <div className="form-group">
    //                                 <button type="submit" disabled={isSubmitting} className="btn btn-primary">
    //                                     {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
    //                                 Save
    //                             </button>
    //                                 <Link to={isAddMode ? '.' : '..'} className="btn btn-link">Cancel</Link>
    //                             </div>
    //                         </Form>
    //                     );
    //                 }}
    //             </Formik>
    //     )
    // }

    

    // render() {
    //     if (this.props.widgets.successful) {
    //         const user = this.props.widgets.list;
    //         console.log("USER: ", user);
    //         console.log(this.props.widgets.successful)
    //         // const initialValues = {
    //         //     id: user.id,
    //         //     email: user.email,
    //         //     jobs_count: user.jobs_count,
    //         //     active: user.active,
    //         // }
    //         const initialValues = {
    //             id: this.props.widgets.list.id,
    //             email: this.props.widgets.list.email,
    //             jobs_count: this.props.widgets.list.jobs_count,
    //             active: this.props.widgets.list.active,
    //         }
    
            /* <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={this.onSubmit}>
                {({ errors, touched, isSubmitting, setFieldValue }) => {
            

                    return (
                        <Form>
                            <h1>{isAddMode ? 'Add User' : 'Edit User'}</h1>
                            <div className="form-row">
                                <div className="form-group col-5">
                                    <label>ID</label>
                                    <Field name="id" placeholder={this.props.widgets.list.id} type="text" className={'form-control' + (errors.id && touched.id ? ' is-invalid' : '')} />
                                    <ErrorMessage name="id" component="div" className="invalid-feedback" />
                                </div>
                                <div className="form-group col-5">
                                    <label>Email</label>
                                    <Field name="email" type="text" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
                                    <ErrorMessage name="email" component="div" className="invalid-feedback" />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-7">
                                    <label>First Name</label>
                                    <Field name="firstName" type="text" className={'form-control' + (errors.firstName && touched.firstName ? ' is-invalid' : '')} />
                                    <ErrorMessage name="firstName" component="div" className="invalid-feedback" />
                                </div>
                                <div className="form-group col-7">
                                    <label>Last Name</label>
                                    <Field name="lastName" type="text" className={'form-control' + (errors.lastName && touched.lastName ? ' is-invalid' : '')} />
                                    <ErrorMessage name="lastName" component="div" className="invalid-feedback" />
                                </div>
                            </div>
                            <div className="form-group col">
                                <label>Active</label>
                                <Field name="active" as="select" className={'form-control' + (errors.active && touched.active ? ' is-invalid' : '')}>
                                    <option value="True">True</option>
                                    <option value="False">False</option>
                                </Field>
                                <ErrorMessage name="active" component="div" className="invalid-feedback" />
                            </div>
                            <div className="form-group">
                                <button type="submit" disabled={isSubmitting} className="btn btn-primary">
                                    {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                                Save
                            </button>
                                <Link to={isAddMode ? '.' : '..'} className="btn btn-link">Cancel</Link>
                            </div>
                        </Form>
                    );
                }}
            </Formik> */
    
}
        
    // const propTypes = {
    //     handleSubmit: PropTypes.func.isRequired,
    //     invalid: PropTypes.bool.isRequired,
    //     client: PropTypes.shape({
    //         id: PropTypes.number.isRequired,
    //         token: PropTypes.string.isRequired
    //     }),
    //     widgets: PropTypes.shape({
    //         list: PropTypes.array,
    //         requesting: PropTypes.bool,
    //         successful: PropTypes.bool,
    //         messages: PropTypes.array,
    //         errors: PropTypes.array,
    //     }).isRequired,
    //     widgetCreate: PropTypes.func.isRequired,
    //     widgetRequest: PropTypes.func.isRequired,
    //     reset: PropTypes.func.isRequired,

    // }

    // console.log(this.props.client);
    // useEffect(() => {
    //     widgetRequest()
    // })






const mapStateToProps = state => ({
    client: state.client,
    widgets: state.widgets,
});
    
const connected = connect(mapStateToProps, { widgetCreate, widgetRequest, widgetUpdate })(UserDetails);
const formed = reduxForm({
    form: 'widgets'
})(connected);

export default formed;



// const validationSchema = Yup.object().shape({
//     id: Yup.string()
//         .required('ID is required'),
//     email: Yup.string()
//         .email('Email is invalid')
//         .required('Email is required'),
//     jobs_count: Yup.string()
//         .required('Jobs Count is required'),
//     active: Yup.string().required("Active status is required")
// });

// const isAddMode = false;

// function UserDetails(user) {
//     // constructor(props) {
//     //     super(props);
//     //     console.log("Hejalkdf: ", props.user);
//     // }

//     console.log("herakj", this.props.widgets)

    

    
//     // const [user, setUser] = useState({});
//     // const [showPassword, setShowPassword] = useState(false);
//     // Add this in your component file
//     // require('react-dom');
//     // window.React2 = require('react');
//     // console.log(window.React1 === window.React2);

//     // useEffect(() => {
//     //     if (!isAddMode) {
//     //         // get user and set form fields
//     //         console.log("update user");
//     //         // userService.getById(id).then(user => {
//     //         //     const fields = ['title', 'firstName', 'lastName', 'email', 'role'];
//     //         //     fields.forEach(field => setFieldValue(field, user[field], false));
//     //         //     setUser(user);
//     //         // });
//     //     }
//     // }, []);

//     // initialValues = {
//     //     id: user.id,
//     //     email: user.email,
//     //     jobs_count: user.jobs_count,
//     //     active: user.active,
//     // }

//     const onSubmit = () => {
//         console.log("submitted");

//         //Patch occurs 
//     }

//     return (
//         <h1>edit</h1>
//     )
// }

        // return (
        //     <>
        //         <h1>EDIT USER</h1>
        //         <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        //             {({ errors, touched, isSubmitting, setFieldValue }) => {
                

        //                 return (
        //                     <Form>
        //                         <h1>{isAddMode ? 'Add User' : 'Edit User'}</h1>
        //                         <div className="form-row">
        //                             <div className="form-group col-5">
        //                                 <label>ID</label>
        //                                 <Field name="id" placeholder={user.id} type="text" className={'form-control' + (errors.id && touched.id ? ' is-invalid' : '')} />
        //                                 <ErrorMessage name="id" component="div" className="invalid-feedback" />
        //                             </div>
        //                             <div className="form-group col-5">
        //                                 <label>Email</label>
        //                                 <Field name="email" type="text" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
        //                                 <ErrorMessage name="email" component="div" className="invalid-feedback" />
        //                             </div>
        //                         </div>
        //                         <div className="form-row">
        //                             <div className="form-group col-7">
        //                                 <label>First Name</label>
        //                                 <Field name="firstName" type="text" className={'form-control' + (errors.firstName && touched.firstName ? ' is-invalid' : '')} />
        //                                 <ErrorMessage name="firstName" component="div" className="invalid-feedback" />
        //                             </div>
        //                             <div className="form-group col-7">
        //                                 <label>Last Name</label>
        //                                 <Field name="lastName" type="text" className={'form-control' + (errors.lastName && touched.lastName ? ' is-invalid' : '')} />
        //                                 <ErrorMessage name="lastName" component="div" className="invalid-feedback" />
        //                             </div>
        //                         </div>
        //                         <div className="form-group col">
        //                             <label>Active</label>
        //                             <Field name="active" as="select" className={'form-control' + (errors.active && touched.active ? ' is-invalid' : '')}>
        //                                 <option value="True">True</option>
        //                                 <option value="False">False</option>
        //                             </Field>
        //                             <ErrorMessage name="active" component="div" className="invalid-feedback" />
        //                         </div>
        //                         <div className="form-group">
        //                             <button type="submit" disabled={isSubmitting} className="btn btn-primary">
        //                                 {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
        //                             Save
        //                         </button>
        //                             <Link to={isAddMode ? '.' : '..'} className="btn btn-link">Cancel</Link>
        //                         </div>
        //                     </Form>
        //                 );
        //             }}
        //         </Formik>
        //     </>
        // )
    
