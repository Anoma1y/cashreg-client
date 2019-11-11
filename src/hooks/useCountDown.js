import { useEffect, useState, useCallback } from 'react';

const useCountdown = (timeToCount = 60 * 1000, interval = 1000) => {
	const [timeLeft, setTimeLeft] = useState(0);
	const cb = newTimeToCount =>
		setTimeLeft(newTimeToCount !== undefined ? newTimeToCount : timeToCount);
	const start = useCallback(cb, []);

	let timer = null;

	useEffect(() => {
		if (timeLeft === 0) return;

		clearTimeout(timer);

		timer = setTimeout(() => {
			const nextSecondsLeft = timeLeft - interval > 0 ? timeLeft - interval : 0;
			setTimeLeft(nextSecondsLeft);
		}, interval);

		return () => clearTimeout(timer);
	}, [timeLeft, timer]);

	return [timeLeft, start];
};

export default useCountdown;
