import { SET_USER, PULL_DATA, SET_READY, SET_CURRENCY, PULL_CURRENCY, PULL_USER } from './constants';

export const setUser = (payload) => ({ type: SET_USER, payload });

export const setCurrency = (payload) => ({ type: SET_CURRENCY, payload });

export const setReady = payload => ({ type: SET_READY, payload });

export const pullHomeData = () => ({ type: PULL_DATA });
