import fetchDataGeneral from '../utilities/generalFetch';

export const setUserAction = (userData) => ({ type: 'SET_USER', payload: userData });
export const setLastBattleAction = (date) => ({ type: 'SET_LAST_BATTLE', payload: date });
export const setUserAsyncAction = () => (async (dispatch) => {
  const method = 'GET';
  const endpoint = '/kingdom';
  const results = await fetchDataGeneral(endpoint, method);
  return dispatch(setUserAction(results));
});
