import { useEffect } from 'react';

const useUnmount = fn => {
	useEffect(() => fn, []);
};

export default useUnmount;
