import { put, call, takeLatest } from 'redux-saga/effects';
import Cookie from 'utils/cookie';
import Api from 'api';
import {
	PULL_DATA,
	PULL_CATEGORY,
} from './constants';
import {
	setReady,
	setCategory,
} from './actions';

export function* getCategory() {
	try {
		const wsid = Cookie.get('active_workspace');

		const data = yield call(Api.getCategoryList, wsid);

		yield put(setCategory(data.data));

		return true;
	} catch (err) {
		throw new Error(err);
	}
}

export function* getData() {
	try {
		yield call(getCategory);

		yield put(setReady(true));
	} catch (e) {
		console.error(e);
	}
}

export default function* transactionSaga() {
	yield takeLatest(PULL_CATEGORY, getCategory);
	yield takeLatest(PULL_DATA, getData);
}
