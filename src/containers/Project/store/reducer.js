import createReducer from 'utils/createReducer';
import {
	CHANGE_FILTER,
	SET_READY,
	SET_PROJECT,
	CHANGE_FILTER_DATE_RANGE,
	SET_PROJECT_ORDER,
} from './constants';

export const INITIAL_STATE = {
	filter: {
		status: null,
		type: null,
		search: '',
	},
	project_order: [
		['id', 'desc'],
	],
	ready: false,
	project: [],
};

const HANDLERS = {
	[CHANGE_FILTER]: (draft, payload) => {
		draft.filter[payload.key] = payload.value;
	},
	[SET_PROJECT_ORDER]: (draft, payload) => {
		draft.project_order = payload;
	},
	[CHANGE_FILTER_DATE_RANGE]: (draft, payload) => {
		draft.filter.date_from = payload.from;
		draft.filter.date_to = payload.to;
	},
	[SET_READY]: (draft, payload) => {
		draft.ready = payload;
	},
	[SET_PROJECT]: (draft, payload) => {
		draft.project = payload;
	},
};

export default createReducer(INITIAL_STATE, HANDLERS);
