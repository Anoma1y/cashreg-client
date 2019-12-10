import { put, call, select, takeLatest } from 'redux-saga/effects';
import Cookie from 'utils/cookie';
import Api from 'api';
import {
	removeEmpty,
	serializeParams,
} from 'utils/helpers';
import {
	PULL_DATA,
	PULL_PROJECT,
	APPLY_AND_SET_PROJECT_FILTER,
} from './constants';
import {
	makeSelectFilter,
	makeSelectProjectOrder,
} from './selectors';
import {
	setReady,
	setProject,
	changeFilter,
} from './actions';
import { getUnixTime } from 'date-fns';

export function* getProject() {
	try {
		const wsid = Cookie.get('active_workspace');

		const data = yield call(Api.getProjectList, wsid);

		yield put(setProject(data.data));

		return true;
	} catch (err) {
		throw new Error(err);
	}
}

export function* getData({ payload }) {
	if (payload.init_page === 'project') {
		Cookie.remove('init_page');
		return;
	}

	try {
		yield call(getProject);

		if (payload.isInit) {
			yield put(setReady(true));
		}
	} catch (e) {
		console.error(e);
	}
}

export function* getFilterData({ payload }) {
	const wsid = Cookie.get('active_workspace');

	yield put(changeFilter(payload.key, payload.value));

	const filter = yield select(makeSelectFilter());

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

	try {
		const data = yield call(Api.getProjectList, wsid, serialializeFilter);

		yield put(setProject(data.data));

		return true;
	} catch (err) {
		throw new Error(err);
	}
}

export default function* transactionSaga() {
	yield takeLatest(PULL_PROJECT, getProject);
	yield takeLatest(PULL_DATA, getData);
	yield takeLatest(APPLY_AND_SET_PROJECT_FILTER, getFilterData)
}
