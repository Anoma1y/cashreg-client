import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { connectRouter } from 'connected-react-router';
import history from './history';
import AppReducer from '../containers/store/reducer';

export default (injectedReducers) => combineReducers({
  router: connectRouter(history),
  app: AppReducer,
  form: formReducer,
  ...injectedReducers,
});

