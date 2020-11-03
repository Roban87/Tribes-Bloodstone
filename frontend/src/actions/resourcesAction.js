import fetchDataGeneral from '../utilities/generalFetch';

export const setRecourcesAction = (resources) => ({
  type: 'SET_RESOURCES',
  resources,
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

      const payload = {};
      for (let i = 0; i < result.resources.length; i += 1) {
        if (result.resources[i].type === 'food') {
          payload.foodAmount = result.resources[i].amount;
          payload.foodGeneration = result.resources[i].generation;
        } else {
          payload.goldAmount = result.resources[i].amount;
          payload.goldGeneration = result.resources[i].generation;
        }
      }

      return dispatch(setRecourcesAction(payload));
    } catch (error) {
      return dispatch(setErrorMessageAction('Can\'t load resources. Please refresh the page!'));
    }
  };
};
