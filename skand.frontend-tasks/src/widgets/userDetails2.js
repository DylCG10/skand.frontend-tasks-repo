import React, { Component } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useParams, Link } from 'react-router-dom';

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

const UserDetails2 = (props) => {

    const onSubmit = async (values) => {
        // const { id, email, first_name, last_name, jobs_count, active } = values;
        console.log(values);
        console.log('submit');
        // if (!this.state.isAddMode) {
        this.props.widgetUpdate(props.client, values);
            
        // }
        // else 
        // {
        //     console.log("widgetCreate");
        //     await this.props.widgetCreate(this.props.client, values);
        // }
        // this.setState({ opened: false })
    };

    //get user through props.user.id
    //retain the current user list as props.list
    let initialValues;
    console.log("PROPS: ", props.user.id, props.list);
    {
        props.user === undefined ? initialValues = {
            id: '',
            email: '',
            first_name: '',
            last_name: '',
            jobs_count: '',
            active: ''
        } : initialValues = {
            id: props.user.id,
            email: props.user.email,
            first_name: props.user.first_name,
            last_name: props.user.last_name,
            jobs_count: props.user.jobs_count,
            active: props.user.active
        }
    }

    initialValues = {
        id: props.user.id,
        email: props.user.email,
        first_name: props.user.first_name,
        last_name: props.user.last_name,
        jobs_count: props.user.jobs_count,
        active: props.user.active,
    }
        
    return (
     
        <>
            {console.log("initial values: ", initialValues)}
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                {({ errors, touched, isSubmitting, setFieldValue }) => {
                    return (
                        <Form>
                            {/* <h1>{this.state.isAddMode ? 'Add User' : 'Edit User'}</h1> */}
                            <div className="form-row">
                                <div className="form-group col-5">
                                    <label>ID</label>
                                    <Field name="id" type="text" className={'form-control' + (errors.id && touched.id ? ' is-invalid' : '')} />
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

export default UserDetails2;