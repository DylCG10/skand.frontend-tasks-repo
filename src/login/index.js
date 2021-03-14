import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

import loginRequest from './actions';

import '../css/login.css';

class Login extends Component {

    // static propTypes = {
    //     handleSubmit: PropTypes.func,
    //     loginRequest: PropTypes.func,
    //     login: PropTypes.shape({
    //         requesting: PropTypes.bool,
    //         successful: PropTypes.bool,
    //         messages: PropTypes.array,
    //         errors: PropTypes.array,
    //     })
    // }

    submit = (values) => {
        console.log("values: ", values);
        this.props.loginRequest(values);
    }

    render() {
        const {
            handleSubmit,
            login: {
                requesting,
                successful,
                messages,
                errors,
            },
        } = this.props;

        return (
            <div className="container">
                <form onSubmit={handleSubmit(this.submit)}>
                    <h1>Login</h1>
                    <div class = "input-label">
                        <label id = "email"/*htmlFor = "email"*/>Email</label>
                        <Field
                            name="email"
                            type="text"
                            id="email"
                            className="email"
                            label="Email"
                            component="input"
                        />
                        
                    </div>
                    <label htmlFor = "password">Password</label>
                    <Field
                        name="password"
                        type="text"
                        id="password"
                        className="password"
                        label="Password"
                        component="input"
                    />
                    <button action = "submit">LOGIN</button>

                </form>

                {/* <div className="auth-messages">
                    {!requesting && !!errors.length && (
                        <Errors messages="Failure to signup due to:" errors={errors} />
                    )}
                    {!requesting && !!messages.length && (
                        <Messages messages={messages} />
                    )}
                    {!requesting && successful && (
                        <div>
                        Login Successful! <Link to="/users">Click here to go to users »</Link>
                        </div>
                    )} */}
                    {/* Redux Router's <Link> component for quick navigation of routes */}
                    {/* {!requesting && !successful && (
                        <Link to="/login">Already a Widgeter? Login Here »</Link>
                    )} */} 
                {/* </div>  */}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    login: state.login
})

const connected = connect(mapStateToProps, { loginRequest })(Login);

const formed = reduxForm({
    form: 'login',
})(connected)


export default formed;