import createReducer from 'utils/createReducer';
import {
	CHANGE_FILTER,
	SET_READY,
	SET_CONTRAGENT,
	CHANGE_FILTER_DATE_RANGE,
	SET_CONTRAGENT_ORDER,
} from './constants';

export const INITIAL_STATE = {
	filter: {
		status: null,
		type: null,
		search: '',
	},
	contragent_order: [
		['id', 'desc'],
	],
	ready: false,
	contragent: [],
};

const HANDLERS = {
	[CHANGE_FILTER]: (draft, payload) => {
		draft.filter[payload.key] = payload.value;
	},
	[SET_CONTRAGENT_ORDER]: (draft, payload) => {
		draft.contragent_order = payload;
	},
	[CHANGE_FILTER_DATE_RANGE]: (draft, payload) => {
		draft.filter.date_from = payload.from;
		draft.filter.date_to = payload.to;
	},
	[SET_READY]: (draft, payload) => {
		draft.ready = payload;
	},
	[SET_CONTRAGENT]: (draft, payload) => {
		draft.contragent = payload;
	},
};

export default createReducer(INITIAL_STATE, HANDLERS);
