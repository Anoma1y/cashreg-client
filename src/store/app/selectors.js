import { createSelector } from 'reselect';
import { INITIAL_STATE } from './reducer';

export const selectApp = state => state.app || INITIAL_STATE;

export const selectRouter = state => state.router;

export const makeSelectError = () =>
	createSelector(
		selectApp,
		appState => appState.error,
	);

export const makeSelectLocation = () =>
	createSelector(
		selectRouter,
		routerState => routerState.location,
	)
