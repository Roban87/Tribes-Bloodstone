import fetchDataGeneral from '../utilities/generalFetch';
import { setKingdomError } from './errorActions';

export const setKingdomAction = (kingdom) => ({
  type: 'SET_KINGDOM',
  payload: kingdom,
});

export default function setKingdomAsync() {
  return async (dispatch) => {
    const endpoint = '/kingdom';
    try {
      const result = await fetchDataGeneral(endpoint, 'GET');
      return dispatch(setKingdomAction(result));
    } catch (error) {
      return dispatch(setKingdomError(error.message));
    }
  };
}
