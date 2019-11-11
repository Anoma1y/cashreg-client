import { useEffect, useState, useRef } from 'react';

const useLoading = (async = true) => {
	const [isLoading, setIsLoading] = useState(false);
	const mount = useRef(false);

	useEffect(() => {
		mount.current = true;

		return () => {
			mount.current = false;
		};
	}, []);

	const load = async
		? aPromise => {
			setIsLoading(true);
				return aPromise.finally(() => {
					if (mount.current) setIsLoading(false);
				});
			}
		: state => setIsLoading(state);

	return [isLoading, load];
};

export default useLoading;
