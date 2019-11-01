import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import history from './history';

export default (injectedReducers) => combineReducers({
  router: connectRouter(history),
  ...injectedReducers,
});

