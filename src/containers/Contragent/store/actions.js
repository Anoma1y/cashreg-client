import {
	CHANGE_FILTER,
	SET_READY,
	SET_CONTRAGENT_ORDER,
	SET_CONTRAGENT,
	PULL_DATA,
	PULL_CONTRAGENT,
} from './constants';

export const setReady = value => ({ type: SET_READY, payload: value });

export const changeFilter = (key, value) => ({ type: CHANGE_FILTER, payload: { key, value } });

export const setContragent = value => ({ type: SET_CONTRAGENT, payload: value });

export const setContragentOrder = value => ({ type: SET_CONTRAGENT_ORDER, payload: value });

export const pullContragentData = () => ({ type: PULL_DATA });

export const pullContragent = (opt = {}) => ({
	type: PULL_CONTRAGENT,
	data: {
		order: opt.order,
		info: opt.info,
		resetPage: opt.resetPage,
	},
});
