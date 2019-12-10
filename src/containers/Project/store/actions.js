import {
	CHANGE_FILTER,
	SET_READY,
	SET_ORDER,
	SET_PROJECT,
	SET_LOADING,
	PULL_DATA,
	CHANGE_FILTER_DATE_RANGE,
	PULL_PROJECT,
	APPLY_AND_SET_PROJECT_FILTER,
} from './constants';

export const setReady = value => ({ type: SET_READY, payload: value });

export const changeFilter = (key, value) => ({ type: CHANGE_FILTER, payload: { key, value } });

export const setProject = value => ({ type: SET_PROJECT, payload: value });

export const changeFilterDateRange = (from, to) => ({ type: CHANGE_FILTER_DATE_RANGE, payload: { from, to } });

export const setOrder = value => ({ type: SET_ORDER, payload: value });

export const setLoading = value => ({ type: SET_LOADING, payload: value });

export const pullProjectData = payload => ({ type: PULL_DATA, payload: { isInit: payload.isInit, init_page: payload.init_page } });

export const applyAndSetProjectFilter = (key, value) => ({ type: APPLY_AND_SET_PROJECT_FILTER, payload: { key, value } });

export const pullProject = (opt = {}) => ({
	type: PULL_PROJECT,
	data: {
		order: opt.order,
		info: opt.info,
		resetPage: opt.resetPage,
	},
});
