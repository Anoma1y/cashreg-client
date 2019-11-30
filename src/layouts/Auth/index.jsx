import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';

const AuthLaylout = ({ children }) => (
	<div className={'auth auth-wrapper'}>
		{children}
	</div>
);

AuthLaylout.propTypes = {
	children: PropTypes.node,
};

export default AuthLaylout;
