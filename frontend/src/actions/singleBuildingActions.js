import fetchDataGeneral from '../utilities/generalFetch';
import setErrorMessage from './errorActions';

export default function selectBuildingAsync(buildingId) {
  return (dispatch) => {
    const endpoint = `/kingdom/buildings/${buildingId}`;
    return fetchDataGeneral(endpoint, 'GET')
      .then((result) => dispatch({ type: 'SELECT_BUILDING', buildingData: result }))
      .catch((err) => dispatch(setErrorMessage(err.message)));
  };
}
