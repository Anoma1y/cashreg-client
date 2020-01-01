import { createStore, compose, applyMiddleware } from 'redux';
import { routerMiddleware as createRouterMiddleware } from 'connected-react-router';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import createReducer from './reducers';

export default (initialState = {}, history) => {
	const routerMiddleware = createRouterMiddleware(history);
	let middlewares = [thunkMiddleware, routerMiddleware];

	let composeEnhancers = compose;

	if (process.env.NODE_ENV !== 'production' && typeof window === 'object') {
		const logger = createLogger({
			collapsed: true,
			duration: true,
			diff: true,
			colors: {
				title: () => '#fff',
			},
		});

		middlewares = [...middlewares, logger];

		if (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
			composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
				shouldHotReload: false,
			});
		}
	}

	const enchancers = [applyMiddleware(...middlewares)];

	const store = createStore(
		createReducer(),
		initialState,
		composeEnhancers(...enchancers),
	);

	if (module.hot) {
		module.hot.accept('./reducers', () => {
			store.replaceReducer(createReducer(store.injectedReducers));
		});
	}

	return store;
};
