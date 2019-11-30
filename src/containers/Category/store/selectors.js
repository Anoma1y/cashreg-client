import { createSelector } from 'reselect';
import { INITIAL_STATE } from './reducer';

export const selectCategories = state => state.categories || INITIAL_STATE;

export const makeSelectReady = () =>
	createSelector(
		selectCategories,
		state => state.ready,
	);

export const makeSelectCategories = () =>
	createSelector(
		selectCategories,
		state => state.categories,
	);
