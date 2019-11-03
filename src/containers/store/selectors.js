import { createSelector } from 'reselect';
import { INITIAL_STATE } from './reducer';

export const selectApp = state => state.app || INITIAL_STATE;

const selectRouter = state => state.router;

export const makeSelectError = () => createSelector(
	selectApp,
	appState => appState.error
);
