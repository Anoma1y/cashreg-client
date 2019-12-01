import { subDays } from 'date-fns';
import createReducer from 'utils/createReducer';
import {
	CHANGE_FILTER,
	SET_READY,
	SET_CATEGORIES,
	SET_PROJECTS,
	SET_CONTRAGENTS,
	SET_TRANSACTIONS,
	SET_TRANSACTION_INFO,
	CHANGE_FILTER_DATE_RANGE,
	SET_TRANSACTION_ORDER,
} from './constants';

const currentDate = new Date();

export const INITIAL_STATE = {
	filter: {
		date_from: subDays(currentDate, 7),
		date_to: null,
		categories: [],
		contragents: [],
		projects: [],
		sum_from: '',
		sum_to: '',
		type: null,
		search: '',
	},
	transactions_info: {
		page: 1,
		num_on_page: 20,
		total_records: 0,
	},
	transactions_order: [
		['registered_at', 'desc'],
	],
	ready: false,
	categories: [],
	projects: [],
	contragents: [],
	transactions: [],
};

const HANDLERS = {
	[CHANGE_FILTER]: (draft, payload) => {
		draft.filter[payload.key] = payload.value;
	},
	[SET_TRANSACTION_INFO]: (draft, payload) => {
		draft.transactions_info = payload;
	},
	[SET_TRANSACTION_ORDER]: (draft, payload) => {
		draft.transactions_order = payload;
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
	[SET_TRANSACTIONS]: (draft, payload) => {
		draft.transactions = payload;
	},
	[SET_CONTRAGENTS]: (draft, payload) => {
		draft.contragents = payload;
	},
	[SET_PROJECTS]: (draft, payload) => {
		draft.projects = payload;
	},
};

export default createReducer(INITIAL_STATE, HANDLERS);
