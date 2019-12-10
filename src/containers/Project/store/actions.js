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
import Cookie from 'utils/cookie';
import Api from 'api';
import {
	removeEmpty,
	serializeParams,
} from 'utils/helpers';
import { getUnixTime } from 'date-fns';

export const setReady = value => ({ type: SET_READY, payload: value });

export const changeFilter = (key, value) => ({ type: CHANGE_FILTER, payload: { key, value } });

export const setProject = value => ({ type: SET_PROJECT, payload: value });

export const changeFilterDateRange = (from, to) => ({ type: CHANGE_FILTER_DATE_RANGE, payload: { from, to } });

export const setOrder = value => ({ type: SET_ORDER, payload: value });

export const setLoading = value => ({ type: SET_LOADING, payload: value });

export const pullProject = (opt = {}) => ({
	type: PULL_PROJECT,
	data: {
		order: opt.order,
		info: opt.info,
		resetPage: opt.resetPage,
	},
});

export function pullProjectData(opt = {}) {
	return (dispatch, getState) => new Promise((resolve, reject) => {
		const {
			init_page = '',
		} = opt;

		if (init_page === 'project') {
			Cookie.remove('init_page');
			return;
		}

		const { filter } = getState().project;

		const pureFilter = removeEmpty(filter);

		if (pureFilter.date_from) {
			pureFilter.date_from = getUnixTime(pureFilter.date_from);
		}

		if (pureFilter.date_to) {
			pureFilter.date_to = getUnixTime(pureFilter.date_to);
		}

		Object.keys(pureFilter).forEach((item) => {
			if (Array.isArray(pureFilter[item])) {
				pureFilter[item] = pureFilter[item]
					.map(a => a.id.toString())
					.join(',');
			}
		});

		const serialializeFilter = serializeParams(pureFilter);

		const workspace_id = Cookie.get('active_workspace');

		Api.getProjectList(workspace_id, serialializeFilter)
			.then((data) => {
				dispatch(setProject(data.data));
				resolve();
			})
			.catch(reject);
	});
}

export function applyAndSetProjectFilter(key, value) {
	return async (dispatch) => {
		dispatch(changeFilter(key, value));
		await dispatch(pullProjectData());
	};
}
