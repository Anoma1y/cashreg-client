import React, { memo } from 'react';
import AuthInput from 'components/Auth/AuthInput';
import AuthCheckbox from 'components/Auth/AuthCheckbox';
import { url } from 'utils/constants';
import { reduxForm, Field } from 'redux-form';
import { Button } from '@blueprintjs/core';
import { Link } from 'react-router-dom';
import { validateSignin } from './validate';

const SigninForm = ({ handleSignin, isLoading }) => (
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
				<Field label={'Remember Me'} name="rememberMe" component={AuthCheckbox} id={'rememberMe'}	/>
			</div>
			<div className="auth-form_col">
				<Button type={'submit'} loading={isLoading} className={'auth-form_btn'}>
					Sign In
				</Button>
			</div>
		</div>

		<Link to={url.auth.restore.email} className={'auth-form_faggot'}>Forgot password?</Link>
	</form>
);

export default reduxForm({
	form: url.auth.signin.index,
	validate: validateSignin,
})(memo(SigninForm));
