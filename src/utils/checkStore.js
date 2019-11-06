import invariant from 'invariant';
import { conformsTo, isFunction, isObject } from './helpers';

export default store => {
	const shape = {
		dispatch: isFunction,
		subscribe: isFunction,
		getState: isFunction,
		replaceReducer: isFunction,
		runSaga: isFunction,
		injectedReducers: isObject,
		injectedSagas: isObject,
	};
	const conf = conformsTo(store, shape);

	invariant(conf, '(app/utils...) injectors: Expected a valid redux store');
};
