import fetchDataGeneral from '../utilities/generalFetch';
import { setUpgradeError } from './errorActions';
import { getResourcesFetch } from './resourcesAction';

export const upgradeLoading = () => ({ type: 'UPGRADE_LOADING' });

export const upgradeBuilding = (building) => ({ type: 'UPGRADE', payload: building });

const upgradeBuildingAsync = (buildingId) => async (dispatch) => {
  dispatch(upgradeLoading);
  const endpoint = `/kingdom/buildings/${buildingId}`;
  const method = 'PUT';

  try {
    const result = await fetchDataGeneral(endpoint, method);
    dispatch(upgradeBuilding(result));
    return dispatch(getResourcesFetch());
  } catch (err) {
    return dispatch(setUpgradeError(err.message));
  }
};

export default upgradeBuildingAsync;
