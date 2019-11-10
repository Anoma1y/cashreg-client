export const useKeyOnly = (val, key) => val && key;

export const useValueAndKey = (val, key) => val && val !== true && `${val} ${key}`;

export const getUnhandledProps = (Component, props) => {
	const {
		handledProps = [],
	} = Component;

	return Object.keys(props).reduce((acc, prop) => {
		if (prop === 'childKey') return acc;

		if (handledProps.indexOf(prop) === -1) acc[prop] = props[prop];

		return acc
	}, {})
};
