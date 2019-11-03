import createReducer from 'utils/createReducer';
import { CHANGE_ERROR } from './constants';

export const INITIAL_STATE = {
	error: null,
};

const HANDLERS = {
	[CHANGE_ERROR]: (draft, payload) => {draft.error = payload},
};

export default createReducer(INITIAL_STATE, HANDLERS)
