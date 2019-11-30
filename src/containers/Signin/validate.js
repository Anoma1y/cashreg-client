import Validator from 'validator';

export const validateSignin = values => {
	const errors = {};

	if (!values.email) {
		errors.email = 'Required';
	} else if (!Validator.isEmail(values.email)) {
		errors.email = 'Please enter a valid email address.';
	}

	if (!values.password) {
		errors.password = 'Required';
	} else if (!Validator.isLength(values.password, { min: 6 })) {
		errors.password = 'Your password must me at least 6 characters.';
	}

	return errors;
};
