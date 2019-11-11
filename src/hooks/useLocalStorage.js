import { useEffect, useState } from 'react';

const useLocalStorage = (key, initialValue, raw) => {
	const [state, setState] = useState(() => {
		try {
			const localStorageValue = localStorage.getItem(key);

			if (typeof localStorageValue !== 'string') {
				localStorage.setItem(key, raw ? String(initialValue) : JSON.stringify(initialValue));

				return initialValue;
			}

			return raw ? localStorageValue : JSON.parse(localStorageValue || 'null');
		} catch {
			return initialValue;
		}
	});

	useEffect(() => {
		try {
			const serializedState = raw ? String(state) : JSON.stringify(state);

			localStorage.setItem(key, serializedState);
		} catch (e) {
			console.error(e);
		}
	}, [state]);

	return [state, setState];
};

export default useLocalStorage;
