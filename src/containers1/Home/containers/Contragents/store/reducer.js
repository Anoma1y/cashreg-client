import createReducer from 'utils/createReducer';
import {
	CHANGE_FILTER,
	SET_READY,
	SET_CONTRAGENTS,
	CHANGE_FILTER_DATE_RANGE,
	SET_CONTRAGENTS_ORDER,
} from './constants';

export const INITIAL_STATE = {
	filter: {
		status: null,
		type: null,
		search: '',
	},
	contragents_order: [
		['id', 'desc'],
	],
	ready: false,
	contragents: [],
};

const HANDLERS = {
	[CHANGE_FILTER]: (draft, payload) => {
		draft.filter[payload.key] = payload.value;
	},
	[SET_CONTRAGENTS_ORDER]: (draft, payload) => {
		draft.contragents_order = payload;
	},
	[CHANGE_FILTER_DATE_RANGE]: (draft, payload) => {
		draft.filter.date_from = payload.from;
		draft.filter.date_to = payload.to;
	},
	[SET_READY]: (draft, payload) => {
		draft.ready = payload;
	},
	[SET_CONTRAGENTS]: (draft, payload) => {
		draft.contragents = payload;
	},
};

export default createReducer(INITIAL_STATE, HANDLERS);
