import {
	CHANGE_FILTER,
	SET_READY,
	SET_PROJECT_ORDER,
	SET_PROJECT,
	PULL_DATA,
	PULL_PROJECT,
} from './constants';

export const setReady = value => ({ type: SET_READY, payload: value });

export const changeFilter = (key, value) => ({ type: CHANGE_FILTER, payload: { key, value } });

export const setProject = value => ({ type: SET_PROJECT, payload: value });

export const setProjectOrder = value => ({ type: SET_PROJECT_ORDER, payload: value });

export const pullProjectData = () => ({ type: PULL_DATA });

export const pullProject = (opt = {}) => ({
	type: PULL_PROJECT,
	data: {
		order: opt.order,
		info: opt.info,
		resetPage: opt.resetPage,
	},
});
