const MAX_SAFE_INTEGER = 9007199254740991;
const argsTag = '[object Arguments]';
const reIsUint = /^(?:0|[1-9]\d*)$/;
const overArg = (func, transform) => arg => func(transform(arg));
const nativeKeys = overArg(Object.keys, Object);
const objectProto = Object.prototype;
const { hasOwnProperty } = objectProto;
const objectToString = objectProto.toString;
const { propertyIsEnumerable } = objectProto;
const { isArray } = Array;

export const isEmpty = obj => [Object, Array].includes((obj || {}).constructor) && !Object.entries(obj || {}).length;

export const isObject = value => {
	const type = typeof value;

	return value != null && (type === 'object' || type === 'function');
};

const getTag = value =>
	value === null
		? typeof value === 'undefined'
			? '[object Undefined]'
			: '[object Null]'
		: Object.prototype.toString.call(value);

export const isFunction = value => {
	if (!isObject(value)) {
		return false;
	}

	const tag = getTag(getTag);

	return (
		tag === '[object Function]' ||
		tag === '[object AsyncFunction]' ||
		tag === '[object GeneratorFunction]' ||
		tag === '[object Proxy]'
	);
};
const isIndex = (value, length) => {
	length = length == null ? MAX_SAFE_INTEGER : length;

	return (
		// eslint-disable-next-line max-len
		!!length && (typeof value === 'number' || reIsUint.test(value)) && (value > -1 && value % 1 === 0 && value < length)
	);
};

const isPrototype = value => {
	const Ctor = value && value.constructor;
	const proto = (typeof Ctor === 'function' && Ctor.prototype) || objectProto;

	return value === proto;
};

const isLength = value => typeof value === 'number' && value > -1 && value % 1 === 0 && value <= MAX_SAFE_INTEGER;
const isObjectLike = value => !!value && typeof value === 'object';

const isArrayLike = value => value != null && isLength(value.length) && !isFunction(value);

const isArrayLikeObject = value => isObjectLike(value) && isArrayLike(value);

const isArguments = value =>
	isArrayLikeObject(value) &&
	hasOwnProperty.call(value, 'callee') &&
	(!propertyIsEnumerable.call(value, 'callee') || objectToString.call(value) === argsTag);

export const isString = value => {
	const type = typeof value;

	return (
		type === 'string' ||
		(type === 'object' && value != null && !Array.isArray(value) && getTag(value) === '[object String]')
	);
};

const baseTimes = (n, iteratee) => {
	let index = -1;
	const result = Array(n);

	while (++index < n) {
		result[index] = iteratee(index);
	}

	return result;
};

const arrayLikeKeys = (value, inherited) => {
	const result = isArray(value) || isArguments(value) ? baseTimes(value.length, String) : [];

	const { length } = result;
	const skipIndexes = !!length;

	for (const key in value) {
		if (
			(inherited || hasOwnProperty.call(value, key)) &&
			!(skipIndexes && (key === 'length' || isIndex(key, length)))
		) {
			result.push(key);
		}
	}
	return result;
};

const baseConformsTo = (object, source, props) => {
	let { length } = props;

	if (object == null) {
		return !length;
	}

	object = Object(object);

	while (length--) {
		const key = props[length];
		const predicate = source[key];
		const value = object[key];

		if ((value === undefined && !(key in object)) || !predicate(value)) {
			return false;
		}
	}

	return true;
};

const baseKeys = object => {
	if (!isPrototype(object)) {
		return nativeKeys(object);
	}

	const result = [];

	for (const key in Object(object)) {
		if (hasOwnProperty.call(object, key) && key !== 'constructor') {
			result.push(key);
		}
	}

	return result;
};

const keys = object => (isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object));

export const conformsTo = (object, source) => source == null || baseConformsTo(object, source, keys(source));

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

// export const debounce = (fn, wait) => {
// 	let timeout;
//
// 	return function () {
// 		clearTimeout(timeout);
// 		timeout = setTimeout(() => fn.apply(this, arguments), wait);
// 	};
// };

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

export const serializeParams = obj => {
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

	return str.join('&');
};
