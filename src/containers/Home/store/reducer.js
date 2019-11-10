import createReducer from 'utils/createReducer';
import {
	SET_USERS,
	SET_CURRENCIES,
	SET_READY,
	SET_WORKSPACES,
	SET_ACTIVE_WORKSPACE,
	CHANGE_TRANSACTION,
} from './constants';

export const INITIAL_STATE = {
	user: {},
	currencies: [],
	workspaces: [],
	active_workspace: null,
	transaction: {
		sum: '',
		description: ''
	},
	cash: [],
	ready: false,
};

const HANDLERS = {
	[SET_USERS]: (draft, payload) => {
		draft.user = payload;
	},
	[SET_CURRENCIES]: (draft, payload) => {
		draft.currencies = payload;
	},
	[CHANGE_TRANSACTION]: (draft, payload) => {
		draft.transaction[payload.key] = payload.value
	},
	[SET_WORKSPACES]: (draft, payload) => {
		draft.workspaces = payload;
	},
	[SET_ACTIVE_WORKSPACE]: (draft, payload) => {
		draft.active_workspace = payload;
	},
	[SET_READY]: (draft, payload) => {
		draft.ready = payload;
	},
};

export default createReducer(INITIAL_STATE, HANDLERS);
