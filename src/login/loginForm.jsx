import React, {useState} from 'react';
import { useHistory, Link } from 'react-router-dom';

import PropTypes from 'prop-types';

import { Form, Formik } from 'formik';
import * as yup from 'yup';


import '../css/login.css';
import { isEqual } from 'lodash';
import { useEffect } from 'react';

async function loginUser(credentials) {
    const response = await fetch("/api/v2/users/tokens", {
        method: "POST",
        headers: {
            // Authorization: '123abc456def789ghi'
        },
        body: JSON.stringify(credentials)
    });
    
    // console.log("token: ", token.headers.map.authorization);
    const token = response.headers.map.authorization;
    localStorage.setItem('token', token);
}

function LoginForm() {
    const initialValues = {
        email: '',
        password: ''
    };

    function handleSubmit(values) {
        const items = { email: values.email, password: values.password };
        loginUser(items);
    }


    const validationSchema = yup.object().shape({
        password: yup.string().label("Password").required().min(4, "Minimum: 4 characters"),
        email: yup.string().email("Invalid email").label("Email").required()
    });

    return (
        <div>
            <Formik initialValues={initialValues} onSubmit={handleSubmit}
                // (data) => {
                // console.log("Data: ", data.email, data.password);
                // const items = { email: data.email, password: data.password };
                // loginUser(items);

            // }}
                validationSchema={validationSchema}>
                {(formikProps) => (
                    <div className="container" >
                    <h1>Login</h1>
                        <Form >
                        <input
                            name="email"
                            placeholder="email"
                            onChange={formikProps.handleChange}
                        ></input>
                        <text>{formikProps.errors.email}</text>
                            <input
                                name="password"
                                placeholder="password"
                                onChange={formikProps.handleChange}
                        ></input>
                        <text>{formikProps.errors.password}</text>

                        
                            <button type="submit">Submit</button>
                        </Form>
                        </div>
            )}


        </Formik>
        </div>
    )

}

export default LoginForm;
// Login.propTypes = {
//     setToken: PropTypes.func.isRequired
// }

