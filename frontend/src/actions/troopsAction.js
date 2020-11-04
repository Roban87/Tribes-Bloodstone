import fetchDataGeneral from '../utilities/generalFetch';
import { setTroopsError } from './errorActions';

export const setTroopsAction = (troops) => ({
  type: 'SET_TROOPS',
  payload: troops,
});

export const troopsLoadAction = () => ({ type: 'TROOPS_LOADING' });

export const setErrorMessageAction = (error) => ({
  type: 'SET_ERROR',
  error,
});

export function setTroopsAsync() {
  return async (dispatch) => {
    const endpoint = '/kingdom/troops';
    const method = 'GET';
    try {
      const results = await fetchDataGeneral(endpoint, method);
      return dispatch(setTroopsAction(results.troops));
    } catch (err) {
      return dispatch(setTroopsError(err.message));
    }
  };
}
