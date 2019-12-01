import { createSelector } from 'reselect';
import { INITIAL_STATE } from './reducer';

export const selectCategories = state => state.category || INITIAL_STATE;

export const makeSelectReady = () =>
	createSelector(
		selectCategories,
		state => state.ready,
	);

export const makeSelectCategory = () =>
	createSelector(
		selectCategories,
		state => state.category,
	);
