import React, {
	memo,
} from 'react';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import AuthInput from '../../components/AuthInput';
import { validateSignup } from '../../validate';


const Signup = () => {
	const handleSignup = e => {
		e.preventDefault();
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

				<button className={'auth-form_btn'}>Create Account</button>
			</form>

			<span>Already have an account? <Link to={'/auth/signin'}>Sign In!</Link></span>
		</div>
	);
};

export default reduxForm({
	form: 'signup',
	validate: validateSignup,
})(memo(Signup));
