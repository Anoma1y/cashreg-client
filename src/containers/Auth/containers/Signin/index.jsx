import React, {
	memo,
	useState,
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
import Api from 'api';

const Signin = ({ form }) => {
	const [loading, setLoading] = useState(false);

	const handleSignin = e => {
		e.preventDefault();

		const {
			values: {
				email, password
			},
			syncErrors
		} = form.signin;

		if (syncErrors) return;

		setLoading(true);

		Api.modules.auth.signin({ email, password, })
			.then(data => {
				console.log('aa', data.data.data)
			})
			.catch(err => {
				if (err.response.status === Api.codes.UNAUTHORIZED) {
					AppToater.show({ message: "Invalid email or password", intent: Intent.DANGER });
				} else if (err.response.status === Api.codes.FORBIDDEN) {
					const { ban_period } = err.response.data.extra;
					const leftTime = format(addSeconds(new Date(0), ban_period), 'mm:ss');

					AppToater.show({ message: `User banned, ${leftTime} left`, intent: Intent.DANGER });
				}
			})
			.finally(() => {setLoading(false)});
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
							loading={loading}
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
