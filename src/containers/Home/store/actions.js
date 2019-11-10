import {
	SET_USERS,
	PULL_DATA,
	SET_READY,
	SET_CURRENCIES,
	PULL_CURRENCY,
	PULL_USER,
	SET_WORKSPACES,
	SET_ACTIVE_WORKSPACE,
	CHANGE_TRANSACTION,
} from './constants';

export const setUser = value => ({ type: SET_USERS, payload: value });

export const setWorkspaces = value => ({ type: SET_WORKSPACES, payload: value });

export const setCurrencies = value => ({ type: SET_CURRENCIES, payload: value });

export const setActiveWorkspace = value => ({ type: SET_ACTIVE_WORKSPACE, payload: value });

export const setReady = value => ({ type: SET_READY, payload: value });

export const changeTransaction = (key, value) => ({ type: CHANGE_TRANSACTION, payload: { key, value} });

export const pullHomeData = () => ({ type: PULL_DATA });

