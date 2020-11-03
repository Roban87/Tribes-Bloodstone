import { setTroopsError } from './errorActions';
import fetchDataGeneral from '../utilities/generalFetch';

export const setTroopsAction = (troops) => ({ type: 'SET_TROOPS', payload: troops });

export const troopsLoadAction = () => ({ type: 'TROOPS_LOADING' });

export const setTroopsAsync = () => (async (dispatch) => {
  const endpoint = '/kingdom/troops';
  dispatch(troopsLoadAction());
  try {
    const results = await fetchDataGeneral(endpoint, 'GET');
    return dispatch(setTroopsAction(results.troops));
  } catch (err) {
    return dispatch(setTroopsError(err.message));
  }
});
