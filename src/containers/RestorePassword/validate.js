export const validateEmail = values => {
	const errors = {};

	if (!values.email) {
		errors.email = 'Required';
	} else if (!Validator.isEmail(values.email)) {
		errors.email = 'Please enter a valid email address.';
	}

	return errors;
};
