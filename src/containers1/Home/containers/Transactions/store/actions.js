import {
	CHANGE_FILTER,
	SET_READY,
	CHANGE_FILTER_DATE_RANGE,
	SET_TRANSACTION_INFO,
	SET_CATEGORIES,
	SET_CONTRAGENTS,
	SET_TRANSACTION_ORDER,
	SET_PROJECTS,
	SET_TRANSACTIONS,
	PULL_DATA,
	PULL_CATEGORIES,
	PULL_TRANSACTIONS,
} from './constants';

export const setReady = value => ({ type: SET_READY, payload: value });

export const changeFilter = (key, value) => ({ type: CHANGE_FILTER, payload: { key, value } });

export const changeFilterDateRange = (from, to) => ({ type: CHANGE_FILTER_DATE_RANGE, payload: { from, to } });

export const setCategories = value => ({ type: SET_CATEGORIES, payload: value });

export const setContrangets = value => ({ type: SET_CONTRAGENTS, payload: value });

export const setTransactionInfo = value => ({ type: SET_TRANSACTION_INFO, payload: value });

export const setProjects = value => ({ type: SET_PROJECTS, payload: value });

export const setTransactionOrder = value => ({ type: SET_TRANSACTION_ORDER, payload: value });

export const setTransactions = value => ({ type: SET_TRANSACTIONS, payload: value });

export const pullTransactionData = () => ({ type: PULL_DATA });

export const pullCategories = () => ({ type: PULL_CATEGORIES });

export const pullTransactions = (opt) => ({
	type: PULL_TRANSACTIONS,
	data: {
		order: opt.order,
		info: opt.info,
		resetPage: opt.resetPage,
	},
});
