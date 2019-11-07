import { createSelector } from 'reselect';
import { INITIAL_STATE } from './reducer';

export const selectHome = state => state.home || INITIAL_STATE;

export const makeSelectReady = () =>
	createSelector(
		selectHome,
		state => state.ready,
	);
