// action creators
export const exampleActionAdd = (number) => ({
  type: 'ADD_TO_COUNT',
  counts: number,
});

export const exampleActionSum = () => ({
  type: 'GET_SUM',
});

export const setErrorMessage = (message) => ({
  type: 'SET_ERROR',
  error: message,
});

// action creators with thunk (async)
export const exampleActionWithThunk = () => (dispatch) => {
  fetch('url')
    .then((response) => {
      dispatch(exampleActionAdd(response.number));
      dispatch(exampleActionSum());
    })
    .catch((error) => {
      dispatch(setErrorMessage(error.message));
    });
};
