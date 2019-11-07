import { put, call, select, takeLatest, all, fork, } from 'redux-saga/effects';
import { PULL_DATA } from './constants';
import { setUser, setCurrency, setReady } from './actions';
import Api from 'api';

const wait = time => new Promise((resolve) => setTimeout(resolve, time));

export function* getUser() {
	try {
		const user = yield call([Api, Api.modules.user.getMe]);

		yield put(setUser(user.data));

		return true;
	} catch (err) {
		console.error(err)
	}
}

export function* getCurrency() {
	try {
		const currency = yield call([Api, Api.modules.currency.getList]);

		yield put(setCurrency(currency.data));

		return true;
	} catch (err) {
		console.error(err)
	}
}

export function * getData() {
	try {
		const pizda = yield all([call(getUser), call(getCurrency)]);

		if (pizda.every(Boolean)) {
			yield put(setReady(true))
		}
	} catch (e) {
		console.error(e)
	}

}

export function* homeData() {
	yield takeLatest(PULL_DATA, getData);
}

export default function* homeSagas() {
	yield all([
		call(homeData),
	]);
}
