import { createStore, compose, applyMiddleware } from 'redux';
import { routerMiddleware as createRouterMiddleware } from 'connected-react-router';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import history from './history';
import createReducer from './reducers';

const routerMiddleware = createRouterMiddleware(history);

let middlewares = [thunkMiddleware, routerMiddleware];
let enchancers = [];
const initialState = {};

if (process.env.NODE_ENV !== 'production') {
	const logger = createLogger({
		collapsed: true,
		duration: true,
		diff: true,
		colors: {
			title: () => '#fff',
		},
	});

	if (typeof window === 'object') {
		enchancers = [
			...enchancers,
			window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
		];
	}

	middlewares = [...middlewares, logger];
}

const store = createStore(
	createReducer(),
	initialState,
	compose(
		applyMiddleware(...middlewares),
		...enchancers,
	),
);

if (module.hot) {
	module.hot.accept('./reducers', () => {
		store.replaceReducer(createReducer(store.injectedReducers));
	});
}

export default store;
