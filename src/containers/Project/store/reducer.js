import createReducer from 'utils/createReducer';
import {
	CHANGE_FILTER,
	SET_READY,
	SET_PROJECT,
	CHANGE_FILTER_DATE_RANGE,
	SET_ORDER,
	SET_LOADING,
} from './constants';
import { subMonths } from 'date-fns';

const currentDate = new Date();

export const INITIAL_STATE = {
	filter: {
		date_from: subMonths(currentDate, 12),
		date_to: null,
		status: null,
		contragent_id: [],
		search: '',
	},
	order: {},
	ready: false,
	loading: false,
	project: [],
};

const HANDLERS = {
	[CHANGE_FILTER]: (draft, payload, state) => {
		if (typeof payload.key !== 'object') {
			draft.filter[payload.key] = payload.value;
		} else {
			draft.filter = { ...state.filter, ...payload.key };
		}
	},
	[SET_ORDER]: (draft, payload) => {
		draft.order = payload;
	},
	[CHANGE_FILTER_DATE_RANGE]: (draft, payload) => {
		draft.filter.date_from = payload.from;
		draft.filter.date_to = payload.to;
	},
	[SET_READY]: (draft, payload) => {
		draft.ready = payload;
	},
	[SET_LOADING]: (draft, payload) => {
		draft.loading = payload;
	},
	[SET_PROJECT]: (draft, payload) => {
		draft.project = payload;
	},
};

export default createReducer(INITIAL_STATE, HANDLERS);
