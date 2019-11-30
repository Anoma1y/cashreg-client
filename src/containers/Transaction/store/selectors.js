import { createSelector } from 'reselect';
import { INITIAL_STATE } from './reducer';

export const selectTransaction = state => state.transaction || INITIAL_STATE;

export const makeSelectReady = () =>
	createSelector(
		selectTransaction,
		state => state.ready,
	);

export const makeSelectFilter = () =>
	createSelector(
		selectTransaction,
		state => state.filter,
	);

export const makeSelectFilterSearch = () =>
	createSelector(
		selectTransaction,
		state => state.filter.search,
	);

export const makeSelectFilterType = () =>
	createSelector(
		selectTransaction,
		state => state.filter.type,
	);

export const makeSelectFilterSum = () =>
	createSelector(
		selectTransaction,
		state => ({
			from: state.filter.sum_from,
			to: state.filter.sum_to,
		}),
	);

export const makeSelectTransactionOrder = () =>
	createSelector(
		selectTransaction,
		state => state.transaction_order,
	);

export const makeSelectTransactionInfo = () =>
	createSelector(
		selectTransaction,
		state => state.transaction_info,
	);

export const makeSelectFilterDate = () =>
	createSelector(
		selectTransaction,
		state => ({
			from: state.filter.date_from,
			to: state.filter.date_to,
		}),
	);

export const makeSelectFilterCategory = () =>
	createSelector(
		selectTransaction,
		state => state.filter.category,
	);

export const makeSelectFilterContragent = () =>
	createSelector(
		selectTransaction,
		state => state.filter.contragent,
	);

export const makeSelectFilterProject = () =>
	createSelector(
		selectTransaction,
		state => state.filter.project,
	);
