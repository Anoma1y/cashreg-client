import preduce from 'immer';

const createReducer = (INITIAL_STATE, HANDLRES) => {
	return (state = INITIAL_STATE, action) => {
		return (action.type in HANDLRES ? preduce(state, draft => {HANDLRES[action.type](draft, action.payload)}) : state);
	}
};

export default createReducer;
