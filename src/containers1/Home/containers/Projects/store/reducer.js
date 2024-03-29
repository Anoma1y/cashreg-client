import createReducer from 'utils/createReducer';
import {
	CHANGE_FILTER,
	SET_READY,
	SET_PROJECTS,
	CHANGE_FILTER_DATE_RANGE,
	SET_PROJECTS_ORDER,
} from './constants';

export const INITIAL_STATE = {
	filter: {
		date_from: null,
		date_to: null,
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
	[SET_PROJECTS_ORDER]: (draft, payload) => {
		draft.project_order = payload;
	},
	[CHANGE_FILTER_DATE_RANGE]: (draft, payload) => {
		draft.filter.date_from = payload.from;
		draft.filter.date_to = payload.to;
	},
	[SET_READY]: (draft, payload) => {
		draft.ready = payload;
	},
	[SET_PROJECTS]: (draft, payload) => {
		draft.project = payload;
	},
};

export default createReducer(INITIAL_STATE, HANDLERS);
