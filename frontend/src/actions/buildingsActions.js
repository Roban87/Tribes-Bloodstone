import fetchDataGeneral from '../utilities/generalFetch';
import setErrorMessage from './errorActions';

export function setBuildingsAsync() {
  return ((dispatch) => {
    const endpoint = '/kingdom/buildings';
    fetchDataGeneral(endpoint, 'GET')
      .then((results) => {
        dispatch({ type: 'SET_BUILDINGS', payload: results.buildings });
      })
      .catch((err) => dispatch(setErrorMessage(err.message)));
  });
}

export function selectBuildingAsync(buildingId) {
  return (dispatch) => {
    const endpoint = `/kingdom/buildings/${buildingId}`;
    fetchDataGeneral(endpoint, 'GET')
      .then((result) => dispatch({ type: 'SELECT_BUILDING', payload: result }))
      .catch((err) => dispatch(setErrorMessage(err.message)));
  };
}
