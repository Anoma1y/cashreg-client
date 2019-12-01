import {
	CHANGE_FILTER,
	SET_READY,
	SET_CATEGORIES_ORDER,
	SET_CATEGORIES,
	PULL_DATA,
	PULL_CATEGORIES,
} from './constants';

export const setReady = value => ({ type: SET_READY, payload: value });

export const changeFilter = (key, value) => ({ type: CHANGE_FILTER, payload: { key, value } });

export const setCategories = value => ({ type: SET_CATEGORIES, payload: value });

export const setCategoriesOrder = value => ({ type: SET_CATEGORIES_ORDER, payload: value });

export const pullCategoryData = () => ({ type: PULL_DATA });

export const pullCategories = (opt = {}) => ({
	type: PULL_CATEGORIES,
	data: {
		order: opt.order,
		info: opt.info,
		resetPage: opt.resetPage,
	},
});
