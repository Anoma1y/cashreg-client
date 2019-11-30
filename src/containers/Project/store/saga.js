import { put, call, takeLatest } from 'redux-saga/effects';
import Cookie from 'utils/cookie';
import Api from 'api';
import {
	PULL_DATA,
	PULL_PROJECT,
} from './constants';
import {
	makeSelectFilter,
	makeSelectProjectOrder,
} from './selectors';
import {
	setReady,
	setProject,
} from './actions';

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

export function* getData() {
	try {
		yield call(getProject);

		yield put(setReady(true));
	} catch (e) {
		console.error(e);
	}
}

export default function* transactionSaga() {
	yield takeLatest(PULL_PROJECT, getProject);
	yield takeLatest(PULL_DATA, getData);
}
