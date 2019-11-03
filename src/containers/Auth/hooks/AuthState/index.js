import {
	useState,
	useEffect,
} from 'react';
import Validator from 'validator';

const debounce = (callback, wait) => {
	let timeout = null
	return (...args) => {
		const next = () => callback(...args);
		clearTimeout(timeout)
		timeout = setTimeout(next, wait)
	}
};

const getErrData = obj => {
	const errData = {};

	Object.keys(obj).forEach(key => {
		errData[key] = Boolean(obj[key]);
	});

	return errData;
};

export const authState = (data) => {
	const [formData, setFormData] = useState(data);
	const [formDataError, setFormDataError] = useState(getErrData(data));

	const setError = (name, value, state) => {
		setFormDataError({
			...formDataError,
			[name]: state
		})
	};

	const debounceSetError = debounce(setError, 150);

	const handleChange = e => {
		const { name, value, type } = e.target;

		if (type === 'checkbox') {
			setFormData({
				...formData,
				[name]: !formData[name] ,
			});

			return;
		}

		if (name === 'email') {
			debounceSetError(name, value, !Validator.isEmail(value));
		}

		if (name === 'password') {
			debounceSetError(name, value, !Validator.isLength(value, { min: 6, }));
		}

		setFormData({
			...formData,
			[name]: value,
		})
	};

	return [formData, formDataError, handleChange];
};
