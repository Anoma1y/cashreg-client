import React, {
	useEffect,
	useCallback,
} from 'react';
import { Button } from '@blueprintjs/core';
import { useCountDown } from 'hooks';

const COUNTDOWN_BLOCK = 60 * 1000;

const ReSendButton = ({ isLoading, children }) => {
	const [timeLeft, start] = useCountDown(COUNTDOWN_BLOCK);

	const restartCountDown = useCallback(() => {start(COUNTDOWN_BLOCK)}, [start]);

	const handleResend = async () => {
		if (timeLeft !== 0) return;

		// resend email with verification code

		restartCountDown(COUNTDOWN_BLOCK);
	};

	useEffect(() => {
		start(COUNTDOWN_BLOCK)
	}, []);

	// if (Number.isInteger(block) && timeLeft === 0) {
	// 	setBlock(null)
	// }
	// console.log(block, timeLeft)

	return (
		<Button
			minimal
			disabled={timeLeft !== 0}
			onClick={handleResend}
			className={'auth_resend-btn'}
		>{timeLeft === 0 ? children : (timeLeft / 1000)}</Button>
	)
};

export default ReSendButton;
