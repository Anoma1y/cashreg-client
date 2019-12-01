import {
	SET_USER,
	PULL_DATA,
	SET_READY,
	SET_CURRENCY,
	PULL_CURRENCY,
	PULL_USER,
	SET_WORKSPACE,
	SET_ACTIVE_WORKSPACE,
} from './constants';

export const setUser = value => ({ type: SET_USER, payload: value });

export const setWorkspace = value => ({ type: SET_WORKSPACE, payload: value });

export const setCurrency = value => ({ type: SET_CURRENCY, payload: value });

export const setActiveWorkspace = value => ({ type: SET_ACTIVE_WORKSPACE, payload: value });

export const setReady = value => ({ type: SET_READY, payload: value });

export const pullHomeData = () => ({ type: PULL_DATA });
