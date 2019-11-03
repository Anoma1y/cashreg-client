import React from 'react';
import PropTypes from 'prop-types';
import {
	FormGroup,
	InputGroup,
} from '@blueprintjs/core';
import AuthError from '../AuthError';

const AuthInput = props => {
	const {
		input,
		label,
		type,
		placeholder,
		meta: {
			error,
			touched,
		},
		id,
	} = props;

	const isError = touched && error;

	return (
		<FormGroup
			className={'auth-form-group'}
			label={label}
			labelFor={id}
		>
			<InputGroup
				{...input}
				id={id}
				type={type}
				placeholder={placeholder}
			/>
			{isError && (<AuthError text={error} />)}
		</FormGroup>
	)
};

AuthInput.propTypes = {
	input: PropTypes.object.isRequired,
	label: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired,
	placeholder: PropTypes.string,
	meta: PropTypes.object.isRequired,
	id: PropTypes.string.isRequired,
};

export default AuthInput;
