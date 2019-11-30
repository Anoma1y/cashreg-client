import { put, call, takeLatest } from 'redux-saga/effects';
import Cookie from 'utils/cookie';
import Api from 'api';
import {
	PULL_DATA,
	PULL_CONTRAGENT,
} from './constants';
import {
	setReady,
	setContragent,
} from './actions';

export function* getContragent() {
	try {
		const wsid = Cookie.get('active_workspace');

		const data = yield call(Api.getContragentList, wsid);

		yield put(setContragent(data.data));

		return true;
	} catch (err) {
		throw new Error(err);
	}
}

export function* getData() {
	try {
		yield call(getContragent);

		yield put(setReady(true));
	} catch (e) {
		console.error(e);
	}
}

export default function* transactionSaga() {
	yield takeLatest(PULL_CONTRAGENT, getContragent);
	yield takeLatest(PULL_DATA, getData);
}
