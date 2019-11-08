import {
	SET_USERS,
	PULL_DATA,
	SET_READY,
	SET_CURRENCIES,
	PULL_CURRENCY,
	PULL_USER,
	SET_WORKSPACES,
	SET_ACTIVE_WORKSPACE,
} from './constants';

export const setUser = payload => ({ type: SET_USERS, payload });

export const setWorkspaces = payload => ({ type: SET_WORKSPACES, payload });

export const setCurrencies = payload => ({ type: SET_CURRENCIES, payload });

export const setActiveWorkspace = payload => ({ type: SET_ACTIVE_WORKSPACE, payload });

export const setReady = payload => ({ type: SET_READY, payload });

export const pullHomeData = () => ({ type: PULL_DATA });
