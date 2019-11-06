import React, {
	memo,
} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import {
	Button,
	Intent,
} from '@blueprintjs/core';
import AuthInput from '../../components/AuthInput';
import AuthCheckbox from '../../components/AuthCheckbox';
import { AppToater } from 'components/Toaster';
import { validateSignin } from '../../validate';
import { format, addSeconds } from 'date-fns';
import Cookie from 'utils/cookie';
import history from 'store/history';
import Api from 'api';
import useLoading from 'hooks/useLoading';

const Signin = ({ form }) => {
	const [isLoading, setLoad] = useLoading();

	const handleSignin = async e => {
		e.preventDefault();

		if (form.signin.syncErrors) {
			return
		}

		const {
			email,
			password,
			rememberMe
		} = form.signin.values;

		try {
			const data = await setLoad(Api.modules.auth.signin({ email, password, }));
			const { access_token, refresh_token, created_at, expires_at } = data.data.data;

			if (rememberMe) {
				const minutes = (expires_at - created_at) / 1000 / 60;

				Cookie.setExpiresMinutes('access_token', access_token, minutes);
				Cookie.set('refresh_token', refresh_token, {expires: 60});
			} else {
				Cookie.set('access_token', access_token);
				Cookie.set('refresh_token', refresh_token);
			}

			history.replace('/');
		} catch (err) {
			if (err.response.status === Api.codes.UNAUTHORIZED) {
				AppToater.show({ message: "Invalid email or password", intent: Intent.DANGER });
			} else if (err.response.status === Api.codes.FORBIDDEN) {
				const { ban_period } = err.response.data.extra;

				const leftTime = format(addSeconds(new Date(0), ban_period), 'mm:ss');

				AppToater.show({ message: `User banned, ${leftTime} left`, intent: Intent.WARNING });
			} else if (err.response.status === Api.codes.NOT_FOUND) {
				AppToater.show({ message: "User not found", intent: Intent.WARNING });
			} else if (err.response.status === Api.codes.IM_A_TEAPOT) {
				history.push('/auth/signup/send', {
					email
				});
			}
		}
	};

	return (
		<div className={'auth auth-inner'}>
			<h1 className={'auth_title'}>Sign In</h1>

			<form className={'auth-form'} onSubmit={handleSignin}>

				<Field
					label={'E-Mail'}
					name="email"
					component={AuthInput}
					type="email"
					id={'email'}
					placeholder={'test@example.com'}
				/>

				<Field
					label={'Password'}
					name="password"
					component={AuthInput}
					type="password"
					id={'password'}
				/>

				<div className="auth-form_row">
					<div className="auth-form_col">
						<Field
							label={'Remember Me'}
							name="rememberMe"
							component={AuthCheckbox}
							id={'rememberMe'}
						/>
					</div>
					<div className="auth-form_col">
						<Button
							type={'submit'}
							loading={isLoading}
							className={'auth-form_btn'}
						>
							Sign In
						</Button>
					</div>
				</div>

				<Link to={'/auth/restore/email'} className={'auth-form_faggot'}>Forgot password?</Link>
			</form>

			<span>Don’t have an account? <Link to={'/auth/signup'}>Sign Up!</Link></span>
		</div>
	);
};

const mapStateToProps = ({ form }) => ({
	form,
});

export default reduxForm({
	form: 'signin',
	validate: validateSignin,
})(memo(connect(mapStateToProps)(Signin)));
