import fetchDataGeneral from '../utilities/generalFetch';
import { setResourceError } from './errorActions';

export const setResourcesAction = (resourcesArray) => ({
  type: 'SET_RESOURCES',
  resources,
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

      return dispatch(setResourcesAction(payload));
    } catch (error) {
      return dispatch(setResourceError('Can\'t load resources. Please refresh the page!'));
    }
  };
};
