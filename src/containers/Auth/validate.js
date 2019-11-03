import Validator from 'validator';

export const validateEmail = values => {
	const errors = {};

	if (!values.email) {
		errors.email = 'Required';
	} else if (!Validator.isEmail(values.email)) {
		errors.email = 'Please enter a valid email address.';
	}

	return errors;
};

export const validateSignin = values => {
	const errors = {};

	if (!values.email) {
		errors.email = 'Required';
	} else if (!Validator.isEmail(values.email)) {
		errors.email = 'Please enter a valid email address.';
	}

	if (!values.password) {
		errors.password = 'Required';
	} else if (!Validator.isLength(values.password, { min: 6, })) {
		errors.password = 'Your password must me at least 6 characters.';
	}

	return errors;
};

export const validateSignup = values => {
	const errors = {};

	if (!values.email) {
		errors.email = 'Required';
	} else if (!Validator.isEmail(values.email)) {
		errors.email = 'Please enter a valid email address.';
	}

	if (!values.password) {
		errors.password = 'Required';
	} else if (!Validator.isLength(values.password, { min: 6, })) {
		errors.password = 'Your password must me at least 6 characters.';
	}

	if (!values.repeat_password) {
		errors.repeat_password = 'Required';
	} else if (!Validator.isLength(values.repeat_password, { min: 6, })) {
		errors.repeat_password = 'Your password must me at least 6 characters.';
	} else if (values.repeat_password !== values.password) {
		errors.repeat_password = 'Passwords do not match.';
	}

	return errors;
};
