import {
	CHANGE_FILTER,
	SET_READY,
	SET_CATEGORY_ORDER,
	SET_CATEGORY,
	PULL_DATA,
	PULL_CATEGORY,
} from './constants';

export const setReady = value => ({ type: SET_READY, payload: value });

export const changeFilter = (key, value) => ({ type: CHANGE_FILTER, payload: { key, value } });

export const setCategory = value => ({ type: SET_CATEGORY, payload: value });

export const setCategoryOrder = value => ({ type: SET_CATEGORY_ORDER, payload: value });

export const pullCategoryData = () => ({ type: PULL_DATA });

export const pullCategory = (opt = {}) => ({
	type: PULL_CATEGORY,
	data: {
		order: opt.order,
		info: opt.info,
		resetPage: opt.resetPage,
	},
});
