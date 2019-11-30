import createReducer from 'utils/createReducer';
import {
	CHANGE_FILTER,
	SET_READY,
	SET_CATEGORIES,
	CHANGE_FILTER_DATE_RANGE,
	SET_CATEGORIES_ORDER,
} from './constants';

export const INITIAL_STATE = {
	filter: {
		status: null,
		type: null,
		search: '',
	},
	categories_order: [
		['id', 'desc'],
	],
	ready: false,
	categories: [],
};

const HANDLERS = {
	[CHANGE_FILTER]: (draft, payload) => {
		draft.filter[payload.key] = payload.value;
	},
	[SET_CATEGORIES_ORDER]: (draft, payload) => {
		draft.categories_order = payload;
	},
	[CHANGE_FILTER_DATE_RANGE]: (draft, payload) => {
		draft.filter.date_from = payload.from;
		draft.filter.date_to = payload.to;
	},
	[SET_READY]: (draft, payload) => {
		draft.ready = payload;
	},
	[SET_CATEGORIES]: (draft, payload) => {
		draft.categories = payload;
	},
};

export default createReducer(INITIAL_STATE, HANDLERS);
