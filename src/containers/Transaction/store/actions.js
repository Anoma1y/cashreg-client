import {
	CHANGE_FILTER,
	SET_READY,
	CHANGE_FILTER_DATE_RANGE,
	SET_TRANSACTION_INFO,
	SET_TRANSACTION_ORDER,
	SET_TRANSACTION,
	PULL_DATA,
	PULL_CATEGORIES,
	PULL_TRANSACTION,
} from './constants';

export const setReady = value => ({ type: SET_READY, payload: value });

export const changeFilter = (key, value) => ({ type: CHANGE_FILTER, payload: { key, value } });

export const changeFilterDateRange = (from, to) => ({ type: CHANGE_FILTER_DATE_RANGE, payload: { from, to } });

export const setTransactionInfo = value => ({ type: SET_TRANSACTION_INFO, payload: value });

export const setTransactionOrder = value => ({ type: SET_TRANSACTION_ORDER, payload: value });

export const setTransaction = value => ({ type: SET_TRANSACTION, payload: value });

export const pullTransactionData = () => ({ type: PULL_DATA });

export const pullCategories = () => ({ type: PULL_CATEGORIES });

export const pullTransaction = (opt) => ({
	type: PULL_TRANSACTION,
	data: {
		order: opt.order,
		info: opt.info,
		resetPage: opt.resetPage,
	},
});
