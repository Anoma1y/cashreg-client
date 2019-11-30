import { createSelector } from 'reselect';
import { INITIAL_STATE } from './reducer';
import { format as formatDate } from 'date-fns';

export const selectContragents = state => state.contragents || INITIAL_STATE;

// export const makeSelectFilter = () =>
// 	createSelector(
// 		selectContragents,
// 		state => state.filter,
// 	);

// export const makeSelectProjectsOrder = () =>
// 	createSelector(
// 		selectContragents,
// 		state => state.projects_order,
// 	);

export const makeSelectReady = () =>
	createSelector(
		selectContragents,
		state => state.ready,
	);
