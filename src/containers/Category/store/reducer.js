import createReducer from 'utils/createReducer';
import {
	CHANGE_FILTER,
	SET_READY,
	SET_CATEGORY,
	CHANGE_FILTER_DATE_RANGE,
	SET_CATEGORY_ORDER,
} from './constants';

export const INITIAL_STATE = {
	filter: {
		status: null,
		type: null,
		search: '',
	},
	category_order: [
		['id', 'desc'],
	],
	ready: false,
	category: [],
};

const HANDLERS = {
	[CHANGE_FILTER]: (draft, payload) => {
		draft.filter[payload.key] = payload.value;
	},
	[SET_CATEGORY_ORDER]: (draft, payload) => {
		draft.category_order = payload;
	},
	[CHANGE_FILTER_DATE_RANGE]: (draft, payload) => {
		draft.filter.date_from = payload.from;
		draft.filter.date_to = payload.to;
	},
	[SET_READY]: (draft, payload) => {
		draft.ready = payload;
	},
	[SET_CATEGORY]: (draft, payload) => {
		draft.category = payload;
	},
};

export default createReducer(INITIAL_STATE, HANDLERS);
