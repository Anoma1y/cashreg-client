import React from 'react';
import PropTypes from 'prop-types';

const AuthError = ({ text }) => <span className={'auth-form_error'}>{text}</span>;

AuthError.propTypes = {
	text: PropTypes.string.isRequired,
};

export default AuthError;
