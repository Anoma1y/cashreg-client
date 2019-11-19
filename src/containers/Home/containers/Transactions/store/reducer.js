import createReducer from 'utils/createReducer';
import { CHANGE_FILTER } from './constants';

export const INITIAL_STATE = {
	filter: {
		date_from: null,
		date_to: null,
	},
};

const HANDLERS = {
	[CHANGE_FILTER]: (draft, payload) => {
		draft.filter[payload.key] = payload.value;
	},
};

export default createReducer(INITIAL_STATE, HANDLERS);
