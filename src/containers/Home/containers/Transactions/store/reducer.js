import createReducer from 'utils/createReducer';
import {
	CHANGE_FILTER,
	SET_READY,
	SET_CATEGORIES,
	SET_PROJECTS,
	SET_CONTRAGENTS,
	CHANGE_FILTER_DATE_RANGE,
} from './constants';

export const INITIAL_STATE = {
	filter: {
		date_from: null,
		date_to: null,
		categories: [],
		contragents: [],
		projects: [],
		sum_from: '',
		sum_to: '',
		type: null,
		search: '',
	},
	ready: false,
	categories: [],
	projects: [],
	contragents: [],
};

const HANDLERS = {
	[CHANGE_FILTER]: (draft, payload) => {
		draft.filter[payload.key] = payload.value;
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
	[SET_CONTRAGENTS]: (draft, payload) => {
		draft.contragents = payload;
	},
	[SET_PROJECTS]: (draft, payload) => {
		draft.projects = payload;
	},
};

export default createReducer(INITIAL_STATE, HANDLERS);
