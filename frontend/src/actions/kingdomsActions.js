import fetchDataGeneral from '../utilities/generalFetch';
import { setKingdomsError } from './errorActions';

export const setKingdomsAction = (kingdoms) => ({ type: 'SET_KINGDOMS', payload: kingdoms });

export const kingdomsLoadAction = () => ({ type: 'KINGDOMS_LOAD' });
export const setKingdomsAsync = (endpoint) => (async (dispatch) => {
  dispatch(kingdomsLoadAction());
  const method = 'GET';
  try {
    const kingdomsData = await fetchDataGeneral(endpoint, method);
    return dispatch(setKingdomsAction(kingdomsData));
  } catch (err) {
    return dispatch(setKingdomsError(err.message));
  }
});
