import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { connectRouter } from 'connected-react-router';
import history from './history';
import AppReducer from '../containers/store/reducer';

import contragentsReducer from 'containers/Home/containers/Contragents/store/reducer';
import categoriesReducer from 'containers/Home/containers/Categories/store/reducer';
import projectsReducer from 'containers/Home/containers/Projects/store/reducer';
import homeReducer from 'containers/Home/store/reducer';
import transactionsReducer from 'containers/Home/containers/Transactions/store/reducer';

export default injectedReducers =>
	combineReducers({
		router: connectRouter(history),
		app: AppReducer,
		form: formReducer,
		home: homeReducer,
		contragents: contragentsReducer,
		categories: categoriesReducer,
		projects: projectsReducer,
		// workspaces: workspacesReducer,
		transactions: transactionsReducer,
		...injectedReducers,
	});
