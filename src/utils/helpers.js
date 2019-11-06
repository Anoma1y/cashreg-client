export const isEmpty = obj => [Object, Array].includes((obj || {}).constructor) && !Object.entries((obj || {})).length;

export const isObject = value  => {
	const type = typeof value;
	
	return value != null && (type === 'object' || type === 'function');
};

const getTag = value => value === null ? (typeof value === 'undefined' ? '[object Undefined]' : '[object Null]') : Object.prototype.toString.call(value);

export const isFunction = value => {
	if (!isObject(value)) {
		return false
	}
	
	const tag = getTag(getTag);
	
	return tag === '[object Function]' || tag === '[object AsyncFunction]' || tag === '[object GeneratorFunction]' || tag === '[object Proxy]';
};

export const isString = value => {
	const type = typeof value;
	
	return type === 'string' || (type === 'object' && value != null && !Array.isArray(value) && getTag(value) === '[object String]')
};

const MAX_SAFE_INTEGER = 9007199254740991;
const argsTag = '[object Arguments]';
const reIsUint = /^(?:0|[1-9]\d*)$/;

const baseTimes = (n, iteratee) => {
	let index = -1,
		result = Array(n);
	
	while (++index < n) {
		result[index] = iteratee(index);
	}
	
	return result;
};

const overArg = (func, transform) => arg => func(transform(arg));
const nativeKeys = overArg(Object.keys, Object);
const objectProto = Object.prototype;
const hasOwnProperty = objectProto.hasOwnProperty;
const objectToString = objectProto.toString;
const propertyIsEnumerable = objectProto.propertyIsEnumerable;
const isArray = Array.isArray;

const arrayLikeKeys = (value, inherited) => {
	const result = (isArray(value) || isArguments(value))
		? baseTimes(value.length, String)
		: [];
	
	const length = result.length,
		skipIndexes = !!length;
	
	for (let key in value) {
		if ((inherited || hasOwnProperty.call(value, key)) &&
			!(skipIndexes && (key === 'length' || isIndex(key, length)))) {
			result.push(key);
		}
	}
	return result;
};

const baseConformsTo = (object, source, props) => {
	let length = props.length;
	
	if (object == null) {
		return !length;
	}
	
	object = Object(object);
	
	while (length--) {
		const key = props[length],
			predicate = source[key],
			value = object[key];
		
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
	
	for (let key in Object(object)) {
		if (hasOwnProperty.call(object, key) && key !== 'constructor') {
			result.push(key);
		}
	}
	
	return result;
};

const isIndex = (value, length) => {
	length = length == null ? MAX_SAFE_INTEGER : length;
	
	return !!length &&
		(typeof value == 'number' || reIsUint.test(value)) &&
		(value > -1 && value % 1 === 0 && value < length);
};

const isPrototype = value => {
	const Ctor = value && value.constructor,
		proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;
	
	return value === proto;
};

const isArguments = value => isArrayLikeObject(value) && hasOwnProperty.call(value, 'callee') &&
	(!propertyIsEnumerable.call(value, 'callee') || objectToString.call(value) === argsTag);

const isArrayLike = value => value != null && isLength(value.length) && !isFunction(value);

const isArrayLikeObject = value => isObjectLike(value) && isArrayLike(value);

const isLength = value => typeof value == 'number' &&
	value > -1 && value % 1 === 0 && value <= MAX_SAFE_INTEGER;

const isObjectLike = value => !!value && typeof value == 'object';

const keys = object => isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);

export const conformsTo = (object, source) => source == null || baseConformsTo(object, source, keys(source));

export const debounce = (fn, wait) => {
	let timeout;

	return function () {
		clearTimeout(timeout)
		timeout = setTimeout(() => fn.apply(this, arguments), wait)
	}
};
