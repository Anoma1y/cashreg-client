import { put, call, takeLatest } from 'redux-saga/effects';
import Cookie from 'utils/cookie';
import Api from 'api';
import {
	PULL_DATA,
	PULL_CONTRAGENTS,
} from './constants';
import {
	setReady,
	setContragents,
} from './actions';

export function* getContragents() {
	try {
		const wsid = Cookie.get('active_workspace');

		const data = yield call(Api.getContragents, wsid);

		yield put(setContragents(data.data));

		return true;
	} catch (err) {
		throw new Error(err);
	}
}

export function* getData() {
	try {
		yield call(getContragents);

		yield put(setReady(true));
	} catch (e) {
		console.error(e);
	}
}

export default function* transactionSaga() {
	yield takeLatest(PULL_CONTRAGENTS, getContragents);
	yield takeLatest(PULL_DATA, getData);
}
