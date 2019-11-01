export const testAction = (value) => ({ type: 'TYPE/TEST', payload: value });

export const testActionPromise = () => (dispatch) => new Promise((resolve, reject) => {
  dispatch(testAction());
  resolve();
});
