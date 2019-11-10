import { put, call, select, takeLatest, all, fork } from 'redux-saga/effects';
import { PULL_DATA } from './constants';
import { setUser, setCurrencies, setWorkspaces, setActiveWorkspace, setReady } from './actions';
import Cookie from 'utils/cookie';
import {
	getMe,
	getWorkspaceList,
	getCurrencyList,
} from 'api';

const wait = time => new Promise(resolve => setTimeout(resolve, time));

export function* getUser() {
	try {
		const user = yield call(getMe);

		yield put(setUser(user.data));

		return true;
	} catch (err) {
		console.error(err);
	}
}

export function* getCurrency() {
	try {
		const currency = yield call(getCurrencyList);

		yield put(setCurrencies(currency.data));

		return true;
	} catch (err) {
		console.error(err);
	}
}

export function* getWorkspaces() {
	try {
		const workspaces = yield call(getWorkspaceList);

		yield put(setWorkspaces(workspaces.data));

		const active_workspace_id = Cookie.get('active_workspace');

		if (active_workspace_id) {
			const active_workspace = workspaces.data.find(ws => ws.id === parseInt(active_workspace_id));

			yield put(setActiveWorkspace(active_workspace));
		} else {
			const active_workspace = workspaces.data.find(ws => ws.is_personal);

			Cookie.set('active_workspace', active_workspace.id.toString(), { expires: 7 });
			yield put(setActiveWorkspace(active_workspace));
		}

		return true;
	} catch (err) {
		console.error(err);
	}
}

export function* getData() {
	try {
		yield call(getCurrency);
		yield call(getUser);
		yield call(getWorkspaces);

		yield put(setReady(true));
		// const hasData = yield all([call(getUser), call(getCurrency), call(getWorkspaces)]);

		// if (hasData.every(Boolean)) {
		// 	yield put(setReady(true));
		// }
	} catch (e) {
		console.error(e);
	}
}

// export function* homeData() {
// 	yield takeLatest(PULL_DATA, getData);
// }

export default function* homeSagas() {
	yield takeLatest(PULL_DATA, getData);
}
