import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import Buildings from '../buildings/Buildings';
import AddBuildingButton from '../AddBuildingButton/AddBuildingButton';
import './kingdomBuildings.css';
import { setBuildingsAsync } from '../../actions/buildingsActions';
import { setAddBuildingError, removeAddBuildingError } from '../../actions/errorActions';
import { getResourcesFetch } from '../../actions/resourcesAction';
import fetchDataGeneral from '../../utilities/generalFetch';

function KingdomBuildings(props) {
  const { buildings, setBuildingsError, addBuildingError } = props;
  const dispatch = useDispatch();

  async function onClickHandle(event) {
    event.preventDefault();

    const method = 'POST';
    const endpoint = '/kingdom/buildings';
    const typeData = {
      type: event.target.value,
    };

    try {
      await fetchDataGeneral(endpoint, method, typeData);
    } catch (error) {
      dispatch(setAddBuildingError(error.message));
    }
    dispatch(setBuildingsAsync());
    dispatch(getResourcesFetch());
  }

  useEffect(() => {
    dispatch(setBuildingsAsync());
    return () => {
      dispatch(removeAddBuildingError());
    };
  }, [dispatch]);

  return (
    <div>
      <div className="buildings">
        {setBuildingsError ? <h2>{setBuildingsError}</h2> : null}
        {buildings.length && buildings.map((building) => (
          <Buildings key={building.id} building={building} />
        )) }
      </div>

      <div className="add-buttons-container">
        {addBuildingError ? <h2 className="add-building-error-message">{addBuildingError}</h2> : null}
        <AddBuildingButton type="farm" onClick={onClickHandle} />
        <AddBuildingButton type="mine" onClick={onClickHandle} />
        <AddBuildingButton type="academy" onClick={onClickHandle} />
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  buildings: state.buildings.buildings,
  setBuildingsError: state.error.buildingsError,
  addBuildingError: state.error.addBuildingError,
});

KingdomBuildings.propTypes = {
  buildings: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      type: PropTypes.string,
      level: PropTypes.number,
      hp: PropTypes.number,
      startedAt: PropTypes.string,
      finishedAt: PropTypes.string,
    }),
  ),
  setBuildingsError: PropTypes.string,
  addBuildingError: PropTypes.string,
};

KingdomBuildings.defaultProps = {
  buildings: [],
  setBuildingsError: '',
  addBuildingError: '',
};

export default connect(mapStateToProps)(KingdomBuildings);
