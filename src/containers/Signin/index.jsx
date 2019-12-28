import React, { memo, useContext } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Intent } from '@blueprintjs/core';
import { AppToater } from 'components/Toaster';
import { format, addSeconds } from 'date-fns';
import { setAuthToken } from 'utils/auth';
import { url } from 'utils/constants';
import history from 'store/history';
import Api from 'api';
import useLoading from 'hooks/useLoading';
import PropTypes from 'prop-types';
import SigninForm from './Form';

const Signin = ({ form }) => {
	const [isLoading, setLoad] = useLoading();
	// const { setIsAuth } = useContext(AuthContext);

	const handleSignin = async event => {
		event.preventDefault();

		if (form.syncErrors) {
			return;
		}

		const { email, password, rememberMe } = form.values;

		try {
			const data = await setLoad(Api.signin({ email, password }));

			setAuthToken(data.data.data, rememberMe);
			history.replace(url.index);
		} catch (err) {
			if (err.response.status === Api.codes.UNAUTHORIZED) {
				AppToater.show({ message: 'Invalid email or password', intent: Intent.DANGER });
			} else if (err.response.status === Api.codes.FORBIDDEN) {
				const { ban_period } = err.response.data.extra;

				const leftTime = format(addSeconds(new Date(0), ban_period), 'mm:ss');

				AppToater.show({ message: `User banned, ${leftTime} left`, intent: Intent.WARNING });
			} else if (err.response.status === Api.codes.NOT_FOUND) {
				AppToater.show({ message: 'User not found', intent: Intent.WARNING });
			} else if (err.response.status === Api.codes.IM_A_TEAPOT) {
				history.push(url.auth.signup.send, {
					email,
				});
			}
		}
	};

	return (
		<div className={'auth auth-inner'}>
			<h1 className={'auth_title'}>Sign In</h1>

			<SigninForm
				isLoading={isLoading}
				handleSignin={handleSignin}
			/>

			<span>Don’t have an account? <Link to={url.auth.signup.index}>Sign Up!</Link></span>
		</div>
	);
};

Signin.propTypes = {
	form: PropTypes.any,
};

const mapStateToProps = ({ form }) => ({
	form: form[url.auth.signin.index],
});

export default connect(mapStateToProps)(Signin);
