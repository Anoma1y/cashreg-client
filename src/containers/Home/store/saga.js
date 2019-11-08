import { put, call, select, takeLatest, all, fork } from 'redux-saga/effects';
import { PULL_DATA } from './constants';
import { setUser, setCurrencies, setWorkspaces, setActiveWorkspace, setReady } from './actions';
import Cookie from 'utils/cookie';
import Api from 'api';

const wait = time => new Promise(resolve => setTimeout(resolve, time));

export function* getUser() {
	try {
		const user = yield call([Api, Api.modules.user.getMe]);

		yield put(setUser(user.data));

		return true;
	} catch (err) {
		console.error(err);
	}
}

export function* getCurrency() {
	try {
		const currency = yield call([Api, Api.modules.currency.getList]);

		yield put(setCurrencies(currency.data));

		return true;
	} catch (err) {
		console.error(err);
	}
}

export function* getWorkspaces() {
	try {
		const workspaces = yield call([Api, Api.modules.workspace.getList]);

		yield put(setWorkspaces(workspaces.data));

		const active_workspace_id = Cookie.get('active_workspace');
		console.log(workspaces.data);
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
		const hasData = yield all([call(getUser), call(getCurrency), call(getWorkspaces)]);

		if (hasData.every(Boolean)) {
			yield put(setReady(true));
		}
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
