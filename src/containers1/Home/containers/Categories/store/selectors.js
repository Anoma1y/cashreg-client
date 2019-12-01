import { createSelector } from 'reselect';
import { INITIAL_STATE } from './reducer';
import { format as formatDate } from 'date-fns';

export const selectCategories = state => state.categories || INITIAL_STATE;

// export const makeSelectFilter = () =>
// 	createSelector(
// 		selectCategories,
// 		state => state.filter,
// 	);

// export const makeSelectProjectsOrder = () =>
// 	createSelector(
// 		selectCategories,
// 		state => state.projects_order,
// 	);

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
