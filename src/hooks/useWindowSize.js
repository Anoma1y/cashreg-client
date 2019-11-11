import { useRef, useState, useEffect, useCallback } from 'react';
import useUnmount from './useUnmount';

const useRafState = initialState => {
	const frame = useRef(0);
	const [state, setState] = useState(initialState);

	const setRafState = useCallback(value => {
		cancelAnimationFrame(frame.current);

		frame.current = requestAnimationFrame(() => {
			setState(value);
		});
	}, []);

	useUnmount(() => {
		cancelAnimationFrame(frame.current);
	});

	return [state, setRafState];
};

const useWindowSize = () => {
	const [state, setState] = useRafState({
		width: window.innerWidth,
		height: window.innerHeight,
	});

	useEffect(() => {
		const handler = () => {
			setState({
				width: window.innerWidth,
				height: window.innerHeight,
			});
		};

		window.addEventListener('resize', handler);

		return () => {
			window.removeEventListener('resize', handler);
		};
	}, [setState]);

	return state;
};

export default useWindowSize;
