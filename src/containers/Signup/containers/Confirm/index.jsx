import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { parseParams } from 'utils/helpers';
import { url } from 'utils/constants';
import SiteLoader from 'components/SiteLoader';
import Api from 'api';
import history from 'store/history';
import PropTypes from 'prop-types';

const SignupConfirm = ({ location }) => {
	const [error, setError] = useState(null);

	useEffect(() => {
		const { user_id, code_id, code } = parseParams(location.search);

		if (user_id && code_id && code) {
			Api.modules.auth
				.verifyEmail(user_id, {
					token_id: code_id,
					token: code,
				})
				.then(() => {
					history.replace(url.auth.signup.success);
				})
				.catch(() => {
					setError(true);
				});
		}
	}, []);

	const renderError = () => (
		<div>
			<p>Activation Error</p>
			<Link to={url.auth.signup.index}>Go To Signup</Link>
		</div>
	);

	return error ? renderError() : <SiteLoader />;
};

SignupConfirm.propTypes = {
	location: PropTypes.any,
};

export default SignupConfirm;
