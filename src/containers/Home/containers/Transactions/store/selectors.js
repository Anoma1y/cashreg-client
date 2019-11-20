import { createSelector } from 'reselect';
import { INITIAL_STATE } from './reducer';

export const selectTransaction = state => state.transaction || INITIAL_STATE;

export const makeSelectReady = () =>
	createSelector(
		selectTransaction,
		state => state.ready,
	);

export const makeSelectCategories = () =>
	createSelector(
		selectTransaction,
		state => state.categories,
	);

export const makeSelectContragents = () =>
	createSelector(
		selectTransaction,
		state => state.contragents,
	);

export const makeSelectProjects = () =>
	createSelector(
		selectTransaction,
		state => state.projects,
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

export const makeSelectFilterDate = () =>
	createSelector(
		selectTransaction,
		state => ({
			from: state.filter.date_from,
			to: state.filter.date_to,
		}),
	);

export const makeSelectFilterCategories = () =>
	createSelector(
		selectTransaction,
		state => state.filter.categories,
	);

export const makeSelectFilterContragents = () =>
	createSelector(
		selectTransaction,
		state => state.filter.contragents,
	);

export const makeSelectFilterProjects = () =>
	createSelector(
		selectTransaction,
		state => state.filter.projects,
	);
