import { put, call, select, takeLatest } from 'redux-saga/effects';
import Cookie from 'utils/cookie';
import Api from 'api';
import { PULL_DATA, CREATE_TRANSACTION } from './constants';
import { setUser, setCurrency, setWorkspace, setActiveWorkspace, setReady } from './actions';
import { removeEmpty } from 'utils/helpers';
import { amountToInteger, toInt } from 'utils/amount';
import { getUnixTime, fromUnixTime } from 'date-fns';
import { AppToater } from 'components/Toaster';
import { Intent } from '@blueprintjs/core';

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

export function* createTransaction({ transactionType }) {
	const form = yield select(state => state.form.transaction);

	const {
		syncErrors,
		values,
	} = form;

	try {
		if (syncErrors || !values) {
			AppToater.show({ message: 'Fill in all required fields', intent: Intent.WARNING });
			return;
		}
		const active_workspace_id = Cookie.get('active_workspace');

		const data = removeEmpty({
			type: toInt(transactionType),
			sum: amountToInteger(values.sum),
			category_id: toInt(values.category),
			currency_id: toInt(values.currency),
			contragent_id: toInt(values.contragent),
			project_id: toInt(values.project),
			registered_at: values.registered_at,
			comment: values.comment,
		});

		yield call(Api.createTransaction, active_workspace_id, data);
		// AppToater.show({ message: 'Transaction has been created', intent: Intent.SUCCESS });

	} catch (e) {
		console.error(e)
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
	yield takeLatest(CREATE_TRANSACTION, createTransaction);
}
