import React, { useState, useEffect } from 'react';
import Validator from 'validator';
import { Button, InputGroup, FormGroup, Intent } from '@blueprintjs/core';
import { AppToater } from 'components/Toaster';
import ReSendButton from '../../../../components/ReSendButton';
import { useLoading } from 'hooks';
import history from 'store/history';
import Api from 'api';

const Send = props => {
	const { email, user_id } = props.location.state;

	const [token_id, setTokenId] = useState(props.location.state.token_id);
	const [isLoading, load] = useLoading();
	const [verificationCode, setVerificationCode] = useState('');

	const isValidLength = !Validator.isLength(verificationCode, { min: 6, max: 6 });

	useEffect(() => {
		if (!email && !token_id) {
			history.replace('/auth/signup');
		}
	}, []);

	const handleSend = async e => {
		e.preventDefault();

		if (isValidLength) {
			return;
		}

		try {
			const data = await load(
				Api.modules.auth.verifyEmailViaKey(user_id, {
					token_id,
					key: parseInt(verificationCode),
				}),
			);

			history.push('/auth/signup/success');
		} catch (err) {
			if (err.response.status === Api.codes.FORBIDDEN) {
				AppToater.show({ message: "Activation key doesn't match", intent: Intent.WARNING });
			} else if (err.response.status === Api.codes.NOT_FOUND) {
				AppToater.show({ message: 'Token not found', intent: Intent.DANGER });
			} else if (err.response.status === Api.codes.CONFLICT) {
				AppToater.show({ message: 'User already verified', intent: Intent.DANGER });
			}
		}
	};

	const handleChangeSendCode = e => {
		const { value } = e.target;

		if (Validator.isLength(value, { min: 0, max: 6 }) && (value !== '' ? Validator.isNumeric(value) : true)) {
			setVerificationCode(value);
		}
	};

	return (
		<div className={'auth auth-inner'}>
			<p>You are in few steps from becoming a part of us</p>

			<h1>You have successfully registered!</h1>

			<p>A confirmation code has been sent to your {email}</p>
			<form className={'auth-form'} onSubmit={handleSend}>
				<FormGroup className={'auth-form-group mb-m'}>
					<InputGroup
						type="text"
						value={verificationCode}
						placeholder={'Enter verification code'}
						onChange={handleChangeSendCode}
					/>
					{/*{isError && (<AuthError text={error} />)}*/}
				</FormGroup>

				<Button type={'submit'} loading={isLoading} disabled={isValidLength} className={'auth-form_btn'}>
					Confirm
				</Button>
			</form>

			<ReSendButton user_id={user_id} token_id={token_id} isLoading={isLoading} setTokenId={setTokenId} load={load}>
				Resend Code
			</ReSendButton>
		</div>
	);
};

export default Send;
