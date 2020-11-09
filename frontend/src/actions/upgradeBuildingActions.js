import fetchDataGeneral from '../utilities/generalFetch';
import { setUpgradeError } from './errorActions';

export const upgradeLoading = () => ({ type: 'UPGRADE_LOADING' });

export const upgradeBuilding = (building) => ({ type: 'UPGRADE_BUILDING', payload: building });

const upgradeBuildingAsync = (buildingId) => async (dispatch) => {
  dispatch(upgradeLoading);
  const endpoint = `/kingdom/buildings/${buildingId}`;
  const method = 'PUT';

  try {
    const result = await fetchDataGeneral(endpoint, method);
    return dispatch(upgradeBuilding(result));
  } catch (err) {
    return dispatch(setUpgradeError(err.message));
  }
};

export default upgradeBuildingAsync;
