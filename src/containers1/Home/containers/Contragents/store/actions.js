import {
	CHANGE_FILTER,
	SET_READY,
	SET_CONTRAGENTS_ORDER,
	SET_CONTRAGENTS,
	PULL_DATA,
	PULL_CONTRAGENTS,
} from './constants';

export const setReady = value => ({ type: SET_READY, payload: value });

export const changeFilter = (key, value) => ({ type: CHANGE_FILTER, payload: { key, value } });

export const setContragents = value => ({ type: SET_CONTRAGENTS, payload: value });

export const setContragentsOrder = value => ({ type: SET_CONTRAGENTS_ORDER, payload: value });

export const pullContragentData = () => ({ type: PULL_DATA });

export const pullContragents = (opt = {}) => ({
	type: PULL_CONTRAGENTS,
	data: {
		order: opt.order,
		info: opt.info,
		resetPage: opt.resetPage,
	},
});
