import { put, call, takeLatest } from 'redux-saga/effects';
import Cookie from 'utils/cookie';
import Api from 'api';
import {
	PULL_DATA,
	PULL_PROJECTS,
} from './constants';
import {
	makeSelectFilter,
	makeSelectProjectsOrder,
} from './selectors';
import {
	setReady,
	setProjects,
} from './actions';

export function* getProjects() {
	try {
		const wsid = Cookie.get('active_workspace');

		const data = yield call(Api.getProjects, wsid);

		yield put(setProjects(data.data));

		return true;
	} catch (err) {
		throw new Error(err);
	}
}

export function* getData() {
	try {
		yield call(getProjects);

		yield put(setReady(true));
	} catch (e) {
		console.error(e);
	}
}

export default function* transactionSaga() {
	yield takeLatest(PULL_PROJECTS, getProjects);
	yield takeLatest(PULL_DATA, getData);
}
