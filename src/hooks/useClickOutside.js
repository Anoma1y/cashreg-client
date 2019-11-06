import { useEffect } from 'react';

const useOnClickOutside = (ref, fn) => {
	const listener = e => {
		if (ref.current && !ref.current.contains(e.target)) {
			fn();
		}
	};

	useEffect(() => {
		document.addEventListener('click', listener);
		document.addEventListener('touchstart', listener);

		return () => {
			document.removeEventListener('click', listener);
			document.removeEventListener('touchstart', listener);
		};
	});
};

export default useOnClickOutside;
