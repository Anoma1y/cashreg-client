import { createStore, compose, applyMiddleware } from 'redux';
import { routerMiddleware as createRouterMiddleware } from 'connected-react-router';
import createSagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger';
import history from './history';
import createReducer from './reducers';

const reduxSagaMonitorOptions = {};
const sagaMiddleware = createSagaMiddleware(reduxSagaMonitorOptions);
const routerMiddleware = createRouterMiddleware(history);

let middlewares = [routerMiddleware, sagaMiddleware];
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

import contragentsSaga from 'containers/Home/containers/Contragents/store/saga';
import categoriesSaga from 'containers/Home/containers/Categories/store/saga';
import projectsSaga from 'containers/Home/containers/Projects/store/saga';
import homeSaga from 'containers/Home/store/saga';
import transactionsSaga from 'containers/Home/containers/Transactions/store/saga';

sagaMiddleware.run(contragentsSaga);
sagaMiddleware.run(categoriesSaga);
sagaMiddleware.run(projectsSaga);
sagaMiddleware.run(homeSaga);
sagaMiddleware.run(transactionsSaga);

store.runSaga = sagaMiddleware.run;
store.injectedReducers = {};
store.injectedSagas = {};

if (module.hot) {
	module.hot.accept('./reducers', () => {
		store.replaceReducer(createReducer(store.injectedReducers));
	});
}

export default store;
