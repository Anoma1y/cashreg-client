import {
	CHANGE_FILTER,
	SET_READY,
	SET_CATEGORY_ORDER,
	SET_CATEGORY,
	PULL_DATA,
	PULL_CATEGORY,
} from './constants';
import Cookie from 'utils/cookie';
import Api from 'api';

export const setReady = value => ({ type: SET_READY, payload: value });

export const changeFilter = (key, value) => ({ type: CHANGE_FILTER, payload: { key, value } });

export const setCategory = value => ({ type: SET_CATEGORY, payload: value });

export const setCategoryOrder = value => ({ type: SET_CATEGORY_ORDER, payload: value });

export const pullCategory = (opt = {}) => ({
	type: PULL_CATEGORY,
	data: {
		order: opt.order,
		info: opt.info,
		resetPage: opt.resetPage,
	},
});

export function pullCategoryData(opt = {}) {
	return (dispatch) => new Promise((resolve, reject) => {
		const {
			init_page = '',
		} = opt;

		if (init_page === 'contragent') {
			Cookie.remove('init_page');
			return;
		}

		const workspace_id = Cookie.get('active_workspace');

		Api.getCategoryList(workspace_id)
			.then((data) => {
				dispatch(setCategory(data.data));
				resolve();
			})
			.catch(reject);
	});
}
