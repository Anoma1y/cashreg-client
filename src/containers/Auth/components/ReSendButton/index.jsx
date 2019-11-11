import React, { useEffect, useCallback } from 'react';
import { Button, Intent } from '@blueprintjs/core';
import { AppToater } from 'components/Toaster';
import { useCountDown } from 'hooks';
import Api from 'api';

const COUNTDOWN_BLOCK = 5 * 1000;

const ReSendButton = ({ user_id, token_id, setTokenId, load, isLoading, children }) => {
	const [timeLeft, start] = useCountDown(COUNTDOWN_BLOCK);

	const restartCountDown = useCallback(() => {
		start(COUNTDOWN_BLOCK);
	}, [start]);

	const handleResend = async () => {
		if (timeLeft !== 0) return;

		try {
			const data = await load(
				Api.modules.auth.resendVerificationEmail(user_id, {
					token_id,
				}),
			);
			setTokenId(data.data.token_id);
			AppToater.show({ message: 'Email sent', intent: Intent.SUCCESS });

			restartCountDown(COUNTDOWN_BLOCK);
		} catch (err) {
			if (err.response.status === Api.codes.NOT_FOUND) {
				AppToater.show({ message: 'Token not found', intent: Intent.DANGER });
			} else if (err.response.status === Api.codes.CONFLICT) {
				AppToater.show({ message: 'User already verified', intent: Intent.DANGER });
			}
		}
	};

	useEffect(() => {
		start(COUNTDOWN_BLOCK); // todo add initial time after reload page
	}, []);

	return (
		<Button
			minimal
			loading={isLoading}
			disabled={timeLeft !== 0}
			onClick={handleResend}
			className={'auth_resend-btn'}
		>
			{timeLeft === 0 ? children : `Resend the verification code in ${timeLeft / 1000}`}
		</Button>
	);
};

export default ReSendButton;
