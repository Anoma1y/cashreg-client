import {
	CHANGE_ERROR,
} from './constants';

export const changeError = state => ({
	type: CHANGE_ERROR,
	payload: state,
});
