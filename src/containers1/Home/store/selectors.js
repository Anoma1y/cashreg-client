import { createSelector } from 'reselect';
import { INITIAL_STATE } from './reducer';

export const selectHome = state => state.home || INITIAL_STATE;

export const makeSelectReady = () =>
	createSelector(
		selectHome,
		state => state.ready,
	);

export const makeSelectUser = () =>
	createSelector(
		selectHome,
		state => state.user,
	);

export const makeSelectWorkspace = () =>
	createSelector(
		selectHome,
		state => state.workspaces,
	);

export const makeSelectCurrency = () =>
	createSelector(
		selectHome,
		state => state.currencies,
	);

export const makeSelectCash = () =>
	createSelector(
		selectHome,
		state => state.cash,
	);

export const makeSelectActiveWorkspace = () =>
	createSelector(
		selectHome,
		state => state.active_workspace,
	);

export const makeSelectActiveWorkspaceName = () =>
	createSelector(
		selectHome,
		state => (state.active_workspace.is_personal ? 'Personal' : state.active_workspace.name),
	);

export const makeSelectUserInfo = () =>
	createSelector(
		selectHome,
		state => {
			const {
				user: {
					login,
					email,
					profile: { first_name, last_name },
				},
			} = state;

			return {
				name: first_name || last_name ? `${first_name} ${last_name}` : email,
				login: login ? `@${login}` : email,
			};
		},
	);
