import fetchDataGeneral from '../utilities/generalFetch';
import { setUpgradeError } from './errorActions';

export const upgradeLoading = () => ({ type: 'UPGRADE_TROOP_LOADING' });

export const upgradeTroops = (troops) => ({
  type: 'UPGRADE_TROOP',
  payload: troops,
});

const upgradeTroopsAsync = (amount, level) => async (dispatch) => {
  dispatch(upgradeLoading);
  const endpoint = '/kingdom/troops/';
  const method = 'PUT';
  const data = {
    amount,
    level,
  };

  try {
    const result = await fetchDataGeneral(endpoint, method, data);
    return dispatch(upgradeTroops(result));
  } catch (err) {
    return dispatch(setUpgradeError(err.message));
  }
};

export default upgradeTroopsAsync;
