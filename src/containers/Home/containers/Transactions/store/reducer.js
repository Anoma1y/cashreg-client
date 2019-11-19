import createReducer from 'utils/createReducer';
import {
	CHANGE_FILTER,
	SET_READY,
	SET_CATEGORIES,
	SET_PROJECTS,
	SET_CONTRAGENTS,
} from './constants';

export const INITIAL_STATE = {
	filter: {
		date_from: null,
		date_to: null,
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
