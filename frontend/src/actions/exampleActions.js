//action creators
export const exampleActionAdd = (number) => {
  return {
    type: 'ADD_TO_COUNT',
    count: number
  }
};

export const exampleActionSum = () => {
  return {
    type: 'GET_SUM'
  }
};

export const setErrorMessage = (message) => {
  return {
    type: 'SET_ERROR',
    error: message
  }
}

//action creators with thunk (async)
export const exampleActionWithThunk = () => {
  return (dispatch) => {
    fetch('url')
      .then(response => {
        dispatch(exampleActionAdd(response.number));
        dispatch(exampleActionSum());
      })
      .catch(error => {
        dispatch(setErrorMessage(error.message));
      })
  }
}