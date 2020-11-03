import fetchDataGeneral from '../utilities/generalFetch';

export const setTroopsAction = (resources) => ({
  type: 'SET_TROOPS',
  resources,
});

export const setErrorMessageAction = (error) => ({
  type: 'SET_ERROR',
  error,
});

export const getTroopsFetch = () => {
  const endpoint = '/kingdom/troops';
  const method = 'GET';

  return async (dispatch) => {
    try {
      const result = await fetchDataGeneral(endpoint, method);
    } catch (error) {
      return dispatch(
        setErrorMessageAction("Can't load troops. Please refresh the page!")
      );
    }
  };
};
