import React, { Component } from 'react';
import { PropTypes } from 'prop-types';

const Errors = (props) => {
    const { errors } = props;
    let errorsToRender;

    if (errors) {
        console.log(errors);
        errorsToRender = errors.map(error => {
            return <li key={error.time}>{error.body}</li>
        })
    }
    return (
        <div>
            <ul>
                {errorsToRender}
                
            </ul>
        </div>
    )
}

Errors.propTypes = {
    errors: PropTypes.arrayOf(
        PropTypes.shape({
            body: PropTypes.string,
            time: PropTypes.date,
        })
    )
}

export default Errors;