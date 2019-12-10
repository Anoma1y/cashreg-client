import {
	CHANGE_FILTER,
	SET_READY,
	SET_CONTRAGENT_ORDER,
	SET_CONTRAGENT,
	PULL_DATA,
	PULL_CONTRAGENT,
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

export const setContragent = value => ({ type: SET_CONTRAGENT, payload: value });

export const setContragentOrder = value => ({ type: SET_CONTRAGENT_ORDER, payload: value });

// export const pullContragentData = () => ({ type: PULL_DATA });

export const pullContragent = (opt = {}) => ({
	type: PULL_CONTRAGENT,
	data: {
		order: opt.order,
		info: opt.info,
		resetPage: opt.resetPage,
	},
});

export function pullContragentData(opt = {}) {
	return (dispatch) => new Promise((resolve, reject) => {
		const {
			init_page = '',
		} = opt;

		if (init_page === 'contragent') {
			Cookie.remove('init_page');
			return;
		}

		const workspace_id = Cookie.get('active_workspace');

		Api.getContragentList(workspace_id)
			.then((data) => {
				console.log('success contragent')
				dispatch(setContragent(data.data));
				resolve();
			})
			.catch(reject);
	});
}
