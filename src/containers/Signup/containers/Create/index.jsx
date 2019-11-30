import React, { memo } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { url } from 'utils/constants';
import { Button, Intent } from '@blueprintjs/core';
import { AppToater } from 'components/Toaster';
import history from 'store/history';
import PropTypes from 'prop-types';
import Api from 'api';
import useLoading from 'hooks/useLoading';
import AuthInput from 'components/Auth/AuthInput';
import { validateSignup, asyncValidateSignup } from '../../validate';

const SignupCreate = ({ form }) => {
	const [isLoading, setLoad] = useLoading();

	const handleSignup = async e => {
		e.preventDefault();

		if (form.signup.syncErrors || form.signup.asyncErrors) {
			return;
		}

		const { email, password } = form.signup.values;

		try {
			const data = await setLoad(Api.modules.auth.signup({ email, password }));

			history.replace('/auth/signup/send', {
				email,
				user_id: data.data.id,
				token_id: data.data.token_id,
			});
		} catch (err) {
			if (err.response.status === Api.codes.CONFLICT) {
				AppToater.show({ message: 'That email already taken', intent: Intent.DANGER });
			}
		}
	};

	return (
		<div className={'auth auth-inner'}>
			<h1 className={'auth_title'}>Create Your Account</h1>

			<form className={'auth-form'} onSubmit={handleSignup}>
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

				<Field
					label={'Repeat Password'}
					name="repeat_password"
					component={AuthInput}
					type="password"
					id={'repeat_password'}
				/>

				<Button type={'submit'} loading={isLoading} className={'auth-form_btn'}>Create Account</Button>
			</form>

			<span>Already have an account? <Link to={url.auth.signin.index}>Sign In!</Link></span>
		</div>
	);
};

SignupCreate.propTypes = {
	form: PropTypes.any,
};

const mapStateToProps = ({ form }) => ({
	form,
});

export default reduxForm({
	form: 'signup',
	validate: validateSignup,
	asyncValidate: asyncValidateSignup,
	asyncBlurFields: ['email'],
})(memo(connect(mapStateToProps)(SignupCreate)));
