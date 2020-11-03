import fetchDataGeneral from '../utilities/generalFetch';
import { setBuildingsError } from './errorActions';

export const setBuildingsAction = (buildings) => ({ type: 'SET_BUILDINGS', payload: buildings });

export const buildingsLoadAction = () => ({ type: 'BUILDINGS_LOADING' });

export const selectBuildingAction = (building) => ({ type: 'SELECT_BUILDING', payload: building });

export function setBuildingsAsync() {
  return (async (dispatch) => {
    const endpoint = '/kingdom/buildings';
    try {
      const results = await fetchDataGeneral(endpoint, 'GET');
      return dispatch(setBuildingsAction(results.buildings));
    } catch (err) {
      return dispatch(setBuildingsError(err.message));
    }
  });
}

export function selectBuildingAsync(buildingId) {
  return async (dispatch) => {
    const endpoint = `/kingdom/buildings/${buildingId}`;
    dispatch(buildingsLoadAction());
    try {
      const result = await fetchDataGeneral(endpoint, 'GET');
      return dispatch(selectBuildingAction(result));
    } catch {
      return dispatch(setBuildingsError('Can\'t load buildings. Please refresh the page!'));
    }
  };
}
