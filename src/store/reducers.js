import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { connectRouter } from 'connected-react-router';

import contragentReducer from 'containers/Contragent/store/reducer';
import categoryReducer from 'containers/Category/store/reducer';
import projectReducer from 'containers/Project/store/reducer';
import homeReducer from 'layouts/Main/store/reducer';
import transactionReducer from 'containers/Transaction/store/reducer';
import history from './history';
import AppReducer from './app/reducer';

export default injectedReducers =>
	combineReducers({
		router: connectRouter(history),
		app: AppReducer,
		form: formReducer,
		home: homeReducer,
		contragent: contragentReducer,
		category: categoryReducer,
		project: projectReducer,
		// workspace: workspacesReducer,
		transaction: transactionReducer,
		...injectedReducers,
	});
