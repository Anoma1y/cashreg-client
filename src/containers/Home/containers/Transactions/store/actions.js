import {
	SET_READY,
	SET_CATEGORIES,
	SET_CONTRAGENTS,
	SET_PROJECTS,
	PULL_DATA,
	PULL_CATEGORIES,
} from './constants';

export const setReady = value => ({ type: SET_READY, payload: value });

export const setCategories = value => ({ type: SET_CATEGORIES, payload: value });

export const setContrangets = value => ({ type: SET_CONTRAGENTS, payload: value });

export const setProjects = value => ({ type: SET_PROJECTS, payload: value });

export const pullTransactionData = () => ({ type: PULL_DATA });

export const pullCategories = () => ({ type: PULL_CATEGORIES });
