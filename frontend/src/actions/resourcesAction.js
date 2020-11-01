import fetchDataGeneral from '../utilities/generalFetch';

export const setRecourcesAction = (resourcesArray) => ({
  type: 'SET_RESOURCES',
  resourcesArray,
});

export const setErrorMessageAction = (error) => ({
  type: 'SET_ERROR',
  error,
});

export const getResourcesFetch = () => {
  const endpoint = '/kingdom/resource';
  const method = 'GET';

  return async (dispatch) => {
    try {
      const result = await fetchDataGeneral(endpoint, method);
      return dispatch(setRecourcesAction(result.resources));
    } catch (error) {
      return dispatch(setErrorMessageAction('Can\'t load resources. Please refresh the page!'));
    }
  };
};
