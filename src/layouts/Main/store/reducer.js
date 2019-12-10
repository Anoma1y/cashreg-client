import createReducer from 'utils/createReducer';
import {
	SET_USER,
	SET_CURRENCY,
	SET_READY,
	SET_LOADING,
	SET_WORKSPACE,
	SET_ACTIVE_WORKSPACE,
} from './constants';

export const INITIAL_STATE = {
	user: {},
	currency: [],
	workspace: [],
	active_workspace: null,
	cash: [],
	ready: false,
	loading: true,
};

const HANDLERS = {
	[SET_USER]: (draft, payload) => {
		draft.user = payload;
	},
	[SET_LOADING]: (draft, payload) => {
		draft.loading = payload;
	},
	[SET_CURRENCY]: (draft, payload) => {
		draft.currency = payload;
	},
	[SET_WORKSPACE]: (draft, payload) => {
		draft.workspace = payload;
	},
	[SET_ACTIVE_WORKSPACE]: (draft, payload) => {
		draft.active_workspace = payload;
	},
	[SET_READY]: (draft, payload) => {
		draft.ready = payload;
	},
};

export default createReducer(INITIAL_STATE, HANDLERS);
