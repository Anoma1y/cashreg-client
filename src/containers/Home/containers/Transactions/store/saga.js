import { put, call, select, takeLatest } from 'redux-saga/effects';
import Cookie from 'utils/cookie';
import Api from 'api';
import { removeEmpty, serializeParams } from 'utils/helpers';
import { getUnixTime } from 'date-fns';
import {
	PULL_DATA,
	PULL_CATEGORIES,
	PULL_CONTRAGENTS,
	PULL_PROJECTS,
	PULL_TRANSACTIONS,
} from './constants';
import {
	makeSelectFilter,
	makeSelectTransactionOrder,
	makeSelectTransactionInfo,
} from './selectors';
import {
	setReady,
	setCategories,
	setContrangets,
	setProjects,
	setTransactions,
	setTransactionInfo,
} from './actions';

export function* getCategories() {
	try {
		const wsid = Cookie.get('active_workspace');
		const category = yield call(Api.getCategories, wsid);

		yield put(setCategories(category.data));

		return true;
	} catch (err) {
		throw new Error(err);
	}
}

export function* getContragents() {
	try {
		const wsid = Cookie.get('active_workspace');
		const contranget = yield call(Api.getContragents, wsid);

		yield put(setContrangets(contranget.data));

		return true;
	} catch (err) {
		throw new Error(err);
	}
}

export function* getProjects() {
	try {
		const wsid = Cookie.get('active_workspace');
		const project = yield call(Api.getProjects, wsid);

		yield put(setProjects(project.data));

		return true;
	} catch (err) {
		throw new Error(err);
	}
}

export function* getTransactions(payload) {
	try {
		const wsid = Cookie.get('active_workspace');

		if (payload && payload.resetPage) {
			const info = yield select(makeSelectTransactionInfo());

			yield put(setTransactionInfo(Object.assign(info, { page: 1 })));
		}

		const filter = yield select(makeSelectFilter());
		const pureFilter = removeEmpty(filter);

		pureFilter.workspace_id = wsid;

		if (pureFilter.date_from) {
			pureFilter.date_from = getUnixTime(pureFilter.date_from);
		}

		if (pureFilter.date_to) {
			pureFilter.date_to = getUnixTime(pureFilter.date_to);
		}

		Object.keys(pureFilter).forEach((item) => {
			if (Array.isArray(pureFilter[item])) {
				pureFilter[item] = pureFilter[item]
					.map(a => a.id.toString())
					.join(',');
			}
		});

		const serialializeFilter = serializeParams(pureFilter);

		const transaction = yield call(Api.getTransactions, serialializeFilter);

		yield put(setTransactions(transaction.data.data));
		yield put(setTransactionInfo({
			page: transaction.data.page,
			num_on_page: transaction.data.num_on_page,
			total_records: transaction.data.total_records,
		}));

		return true;
	} catch (err) {
		throw new Error(err);
	}
}

export function* getData() {
	try {
		yield call(getCategories);
		yield call(getContragents);
		yield call(getTransactions);

		yield put(setReady(true));
	} catch (e) {
		console.error(e);
	}
}

export default function* transactionSaga() {
	yield takeLatest(PULL_CATEGORIES, getCategories);
	yield takeLatest(PULL_CONTRAGENTS, getContragents);
	yield takeLatest(PULL_PROJECTS, getProjects);
	yield takeLatest(PULL_TRANSACTIONS, getTransactions);
	yield takeLatest(PULL_DATA, getData);
}
