import { subDays } from 'date-fns';
import createReducer from 'utils/createReducer';
import {
	CHANGE_FILTER,
	SET_READY,
	SET_TRANSACTION,
	SET_TRANSACTION_INFO,
	CHANGE_FILTER_DATE_RANGE,
	SET_TRANSACTION_ORDER,
} from './constants';

const currentDate = new Date();

export const INITIAL_STATE = {
	filter: {
		date_from: subDays(currentDate, 7),
		date_to: null,
		category: [],
		contragent: [],
		project: [],
		sum_from: '',
		sum_to: '',
		type: null,
		search: '',
	},
	transaction_info: {
		page: 1,
		num_on_page: 20,
		total_records: 0,
	},
	transaction_order: [
		['registered_at', 'desc'],
	],
	ready: false,
	transaction: [],
};

const HANDLERS = {
	[CHANGE_FILTER]: (draft, payload) => {
		draft.filter[payload.key] = payload.value;
	},
	[SET_TRANSACTION_INFO]: (draft, payload) => {
		draft.transaction_info = payload;
	},
	[SET_TRANSACTION_ORDER]: (draft, payload) => {
		draft.transaction_order = payload;
	},
	[CHANGE_FILTER_DATE_RANGE]: (draft, payload) => {
		draft.filter.date_from = payload.from;
		draft.filter.date_to = payload.to;
	},
	[SET_READY]: (draft, payload) => {
		draft.ready = payload;
	},
	[SET_TRANSACTION]: (draft, payload) => {
		draft.transaction = payload;
	},
};

export default createReducer(INITIAL_STATE, HANDLERS);
