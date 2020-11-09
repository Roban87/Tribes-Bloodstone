import { setBattleError } from './errorActions';
import fetchDataGeneral from '../utilities/generalFetch';

export const battleAction = (results) => ({ type: 'BATTLE', payload: results });
export const battleLoadAction = () => ({ type: 'BATTLE_LOADING' });
export const openModalAction = () => ({ type: 'OPEN_BATTLE_MODAL' });
export const closeModalAction = () => ({ type: 'CLOSE_BATTLE_MODAL' });
export const clearBattleResults = () => ({ type: 'CLEAR_BATTLE_RESULTS' });
export const battleActionAsync = (id) => (async (dispatch) => {
  dispatch(battleLoadAction());
  try {
    const method = 'GET';
    const endpoint = `/kingdom/battle/${id}`;
    const result = await fetchDataGeneral(endpoint, method);
    return dispatch(battleAction(result));
  } catch (err) {
    return dispatch(setBattleError(err.message));
  }
});
