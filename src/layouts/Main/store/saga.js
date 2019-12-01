import { put, call, takeLatest } from 'redux-saga/effects';
import Cookie from 'utils/cookie';
import Api from 'api';
import { PULL_DATA } from './constants';
import { setUser, setCurrency, setWorkspace, setActiveWorkspace, setReady } from './actions';

export function* getUser() {
	try {
		const user = yield call(Api.getMe);
		yield put(setUser(user.data));

		return true;
	} catch (err) {
		throw new Error(err);
	}
}

export function* getCurrency() {
	try {
		const currency = yield call(Api.getCurrencyList);

		yield put(setCurrency(currency.data));

		return true;
	} catch (err) {
		throw new Error(err);
	}
}

export function* getWorkspace() {
	try {
		const workspaces = yield call(Api.getWorkspaceList);

		yield put(setWorkspace(workspaces.data));

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
		throw new Error(err);
	}
}

export function* getData() {
	try {
		yield call(getCurrency);
		yield call(getUser);
		yield call(getWorkspace);

		yield put(setReady(true));
	} catch (e) {
		console.error(e);
	}
}

export default function* homeSaga() {
	yield takeLatest(PULL_DATA, getData);
}
