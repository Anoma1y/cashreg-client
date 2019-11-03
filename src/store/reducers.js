import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { connectRouter } from 'connected-react-router';
import history from './history';

export default (injectedReducers) => combineReducers({
  router: connectRouter(history),
  form: formReducer,
  ...injectedReducers,
});

