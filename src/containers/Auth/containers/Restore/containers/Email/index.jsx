import React, {
	memo,
} from 'react';
import { Link } from 'react-router-dom';
import { reduxForm, Field } from 'redux-form';
import AuthInput from '../../../../components/AuthInput';
import { validateEmail } from '../../../../validate';

const Email = () => {
	const handleSignin = e => {
		e.preventDefault();
	};

	return (
		<div className={'auth auth-inner'}>
			<h1>Restore password</h1>
			<p>Enter your account email address and we will send you a link to reset your password.</p>

			<form className={'auth-form'} onSubmit={handleSignin}>

				<Field
					label={'E-Mail'}
					name="email"
					component={AuthInput}
					type="email"
					id={'email'}
					placeholder={'test@example.com'}
				/>

				<button className={'auth-form_btn'}>Request Password Reset</button>
			</form>

			<span><Link to={'/auth/signin'}>Back!</Link></span>
		</div>
	);
}

export default reduxForm({
	form: 'signin',
	validate: validateEmail,
})(memo(Email));

