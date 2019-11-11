import invariant from 'invariant';
import { isString, isFunction, isEmpty } from './helpers';
import checkStore from './checkStore';
import createReducer from '../store/reducers';

export const injectReducerFactory = (store, isValid) => function injectReducer(key, reducer) {
	if (!isValid) checkStore(store);

	invariant(
		isString(key) && !isEmpty(key) && isFunction(reducer),
		'(app/utils...) injectReducer: Expected `reducer` to be a reducer function',
	);

	if (Reflect.has(store.injectedReducers, key) && store.injectedReducers[key] === reducer) return;

	store.injectedReducers[key] = reducer;
	store.replaceReducer(createReducer(store.injectedReducers));
};

export default store => {
	checkStore(store);

	return {
		injectReducer: injectReducerFactory(store, true),
	};
};
