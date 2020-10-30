import fetchDataGeneral from '../utilities/generalFetch';
import { setBuildingsError } from './errorActions';

export function setBuildingsAsync() {
  return ((dispatch) => {
    const endpoint = '/kingdom/buildings';
    fetchDataGeneral(endpoint, 'GET')
      .then((results) => {
        dispatch({ type: 'SET_BUILDINGS', payload: results.buildings });
      })
      .catch((err) => dispatch(setBuildingsError(err.message)));
  });
}

export function selectBuildingAsync(buildingId) {
  return (dispatch) => {
    const endpoint = `/kingdom/buildings/${buildingId}`;
    dispatch({ type: 'BUILDINGS_LOADING' });
    fetchDataGeneral(endpoint, 'GET')
      .then((result) => dispatch({ type: 'SELECT_BUILDING', payload: result }))
      .catch((err) => dispatch(setBuildingsError(err.message)));
  };
}
