import createReducer from 'utils/createReducer';
import { SET_USER, SET_CURRENCY, SET_READY } from './constants';

export const INITIAL_STATE = {
	user: {},
	currencies: [],
	cash: [],
	ready: false,
};

const HANDLERS = {
	[SET_USER]: (draft, payload) => {
		draft.user = payload;
	},
	[SET_CURRENCY]: (draft, payload) => {
		draft.currencies = payload;
	},
	[SET_READY]: (draft, payload) => {
		draft.ready = payload;
	}
};

export default createReducer(INITIAL_STATE, HANDLERS);
