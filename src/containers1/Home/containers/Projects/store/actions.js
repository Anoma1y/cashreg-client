import {
	CHANGE_FILTER,
	SET_READY,
	SET_PROJECTS_ORDER,
	CHANGE_FILTER_DATE_RANGE,
	SET_PROJECTS,
	PULL_DATA,
	PULL_PROJECTS,
} from './constants';

export const setReady = value => ({ type: SET_READY, payload: value });

export const changeFilter = (key, value) => ({ type: CHANGE_FILTER, payload: { key, value } });

export const setProjects = value => ({ type: SET_PROJECTS, payload: value });

export const setProjectsOrder = value => ({ type: SET_PROJECTS_ORDER, payload: value });

export const changeFilterDateRange = (from, to) => ({ type: CHANGE_FILTER_DATE_RANGE, payload: { from, to } });

export const pullProjectData = () => ({ type: PULL_DATA });

export const pullProjects = (opt = {}) => ({
	type: PULL_PROJECTS,
	data: {
		order: opt.order,
		info: opt.info,
		resetPage: opt.resetPage,
	},
});
