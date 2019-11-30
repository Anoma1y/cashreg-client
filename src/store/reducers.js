import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { connectRouter } from 'connected-react-router';
import history from './history';
import AppReducer from '../containers1/store/reducer';

// import contragentsReducer from 'src/containers1/Home/containers/Contragents/store/reducer';
// import categoriesReducer from 'src/containers1/Home/containers/Categories/store/reducer';
// import projectsReducer from 'src/containers1/Home/containers/Projects/store/reducer';
// import homeReducer from 'src/containers1/Home/store/reducer';
// import transactionsReducer from 'src/containers1/Home/containers/Transactions/store/reducer';

export default injectedReducers =>
	combineReducers({
		router: connectRouter(history),
		app: AppReducer,
		form: formReducer,
		// home: homeReducer,
		// contragents: contragentsReducer,
		// categories: categoriesReducer,
		// projects: projectsReducer,
		// workspaces: workspacesReducer,
		// transactions: transactionsReducer,
		...injectedReducers,
	});
