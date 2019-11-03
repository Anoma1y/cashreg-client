import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox } from '@blueprintjs/core';

const AuthCheckbox = ({ input, label }) => (
	<Checkbox {...input}>
		{label}
	</Checkbox>
)

AuthCheckbox.propTypes = {
	input: PropTypes.object.isRequired,
	label: PropTypes.string.isRequired,
};

export default AuthCheckbox;
