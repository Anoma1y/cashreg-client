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
	PULL_TRANSACTION,
} from './constants';
import {
	makeSelectFilter,
	makeSelectTransactionOrder,
	makeSelectTransactionInfo,
} from './selectors';
import {
	setReady,
	setTransaction,
	setTransactionInfo,
} from './actions';

export function* getTransaction(payload) {
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

		const transaction = yield call(Api.getTransactionList, serialializeFilter);

		yield put(setTransaction(transaction.data.data));
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
		yield call(getTransaction);

		yield put(setReady(true));
	} catch (e) {
		console.error(e);
	}
}

export default function* transactionSaga() {
	yield takeLatest(PULL_TRANSACTION, getTransaction);
	yield takeLatest(PULL_DATA, getData);
}
