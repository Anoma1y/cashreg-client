import React from 'react';
import { Link } from 'react-router-dom';
import { url } from 'utils/constants';

const SignupSuccess = () => (
	<div>
		<Link to={url.auth.signin.index}>Go to Sign In</Link>
	</div>
);

export default SignupSuccess;
