import { createSelector } from 'reselect';
import { INITIAL_STATE } from './reducer';
import { format as formatDate } from 'date-fns';

export const selectContragent = state => state.contragent || INITIAL_STATE;

// export const makeSelectFilter = () =>
// 	createSelector(
// 		selectContragent,
// 		state => state.filter,
// 	);

// export const makeSelectProjectsOrder = () =>
// 	createSelector(
// 		selectContragent,
// 		state => state.projects_order,
// 	);

export const makeSelectReady = () =>
	createSelector(
		selectContragent,
		state => state.ready,
	);
