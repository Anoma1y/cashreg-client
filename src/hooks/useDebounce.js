import { useCallback, useEffect, useRef } from 'react';

const useTimeoutFn = (fn, ms = 0) => {
	const ready = useRef(false);
	const timeout = useRef();
	const callback = useRef(fn);
	const isReady = useCallback(() => ready.current, []);

	const set = useCallback(() => {
		ready.current = false;
		// eslint-disable-next-line no-unused-expressions
		timeout.current && clearTimeout(timeout.current);
		timeout.current = setTimeout(() => {
			ready.current = true;
			callback.current();
		}, ms);
	}, [ms]);

	const clear = useCallback(() => {
		ready.current = null;
		// eslint-disable-next-line no-unused-expressions
		timeout.current && clearTimeout(timeout.current);
	}, []);

	useEffect(() => {
		callback.current = fn;
	}, [fn]);

	useEffect(() => {
		set();
		return clear;
	}, [ms]);

	return [isReady, clear, set];
};

export default (fn, ms = 0, deps = []) => {
	const [isReady, cancel, reset] = useTimeoutFn(fn, ms);

	useEffect(reset, deps);

	return [isReady, cancel];
};
