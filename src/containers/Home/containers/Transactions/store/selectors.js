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
