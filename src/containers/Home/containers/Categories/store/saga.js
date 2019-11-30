import { put, call, takeLatest } from 'redux-saga/effects';
import Cookie from 'utils/cookie';
import Api from 'api';
import {
	PULL_DATA,
	PULL_CATEGORIES,
} from './constants';
import {
	makeSelectProjectsOrder,
} from './selectors';
import {
	setReady,
	setCategories,
} from './actions';

export function* getCategories() {
	try {
		const wsid = Cookie.get('active_workspace');

		const data = yield call(Api.getCategories, wsid);

		yield put(setCategories(data.data));

		return true;
	} catch (err) {
		throw new Error(err);
	}
}

export function* getData() {
	try {
		yield call(getCategories);

		yield put(setReady(true));
	} catch (e) {
		console.error(e);
	}
}

export default function* transactionSaga() {
	yield takeLatest(PULL_CATEGORIES, getCategories);
	yield takeLatest(PULL_DATA, getData);
}
