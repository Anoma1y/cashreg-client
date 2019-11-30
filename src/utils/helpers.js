export const objectToArray = obj => {
	const arr = [];

	for (const i in obj) {
		if (Object.prototype.hasOwnProperty.call(obj, i)) {
			const item = {
				id: i,
				name: obj[i],
			};

			arr.push(item);
		}
	}

	return arr;
};

export const debounce = (callback, time) => {
	let interval;

	return (...args) => {
		clearTimeout(interval);

		interval = setTimeout(() => {
			interval = null;
			callback(...args);
		}, time);
	};
};

export const parseParams = str => {
	const query = {};
	const pairs = (str[0] === '?' ? str.substr(1) : str).split('&');

	if (str.length !== 0) {
		for (let i = 0; i < pairs.length; i++) {
			const pair = pairs[i].split('=');
			const [key, val] = pair;

			if (!key || !val) {
				break;
			}

			query[decodeURIComponent(key)] = decodeURIComponent(val);
		}
	}

	return query;
};

export const serializeParams = (obj, start = true) => {
	const str = [];

	for (const p in obj) {
		if (Object.prototype.hasOwnProperty.call(obj, p)) {
			if (Array.isArray(obj[p])) {
				str.push(`${encodeURIComponent(p)}=${obj[p]}`);
				continue;
			}

			str.push(`${encodeURIComponent(p)}=${encodeURIComponent(obj[p])}`);
		}
	}

	if (str.length === 0) return '';

	return start ? `?${str.join('&')}` : str.join('&');
};

export const removeEmpty = (obj) => {
	const modObj = { ...obj };

	// eslint-disable-next-line max-len
	Object.keys(modObj).forEach((key) => (modObj[key] === undefined || modObj[key] === '' || (Array.isArray(modObj[key]) && modObj[key].length === 0) || modObj[key] === null ? delete modObj[key] : modObj[key]));
	// todo test

	return modObj;
};
