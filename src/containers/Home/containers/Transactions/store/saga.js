import { put, call, takeLatest } from 'redux-saga/effects';
import Cookie from 'utils/cookie';
import Api from 'api';
import {
	PULL_DATA,
	PULL_CATEGORIES,
	PULL_CONTRAGENTS,
	PULL_PROJECTS,
} from './constants';
import { setReady, setCategories, setContrangets, setProjects, } from './actions';

export function* getCategories() {
	try {
		const wsid = Cookie.get('active_workspace');
		const category = yield call(Api.getCategories, wsid);

		yield put(setCategories(category.data));

		return true;
	} catch (err) {
		throw new Error(err)
	}
}

export function* getContragents() {
	try {
		const wsid = Cookie.get('active_workspace');
		const contranget = yield call(Api.getContragents, wsid);

		yield put(setContrangets(contranget.data));

		return true;
	} catch (err) {
		throw new Error(err)
	}
}

export function* getProjects() {
	try {
		const wsid = Cookie.get('active_workspace');
		const project = yield call(Api.getProjects, wsid);

		yield put(setProjects(project.data));

		return true;
	} catch (err) {
		throw new Error(err)
	}
}

export function* getData() {
	try {
		yield call(getCategories);
		yield call(getContragents);

		yield put(setReady(true));
	} catch (e) {
		console.error(e);
	}
}

export default function* transactionSaga() {
	yield takeLatest(PULL_CATEGORIES, getCategories);
	yield takeLatest(PULL_CONTRAGENTS, getContragents);
	yield takeLatest(PULL_PROJECTS, getProjects);
	yield takeLatest(PULL_DATA, getData);
}
