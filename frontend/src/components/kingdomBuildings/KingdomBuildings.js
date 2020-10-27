import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import Buildings from '../buildings/Buildings';
import AddBuildingButton from '../AddBuildingButton/AddBuildingButton';
import './kingdomBuildings.css';
import { setBuildingsAsync } from '../../actions/buildingsActions';
import setErrorMessage from '../../actions/errorActions';
import fetchDataGeneral from '../../utilities/generalFetch';

function KingdomBuildings(props) {
  const { buildings, errorMessage } = props;
  const dispatch = useDispatch();

  async function onClickHandle(event) {
    event.preventDefault();

    const method = 'POST';
    const endpoint = '/kingdom/buildings';
    const typeData = {
      type: event.target.value,
    };

    try {
      const addBuildingResponse = await fetchDataGeneral(endpoint, method, typeData);

      if (addBuildingResponse.error) {
        dispatch(setErrorMessage(addBuildingResponse.error));
      }
      dispatch(setBuildingsAsync());
    } catch (error) {
      dispatch(setErrorMessage('Can\'t buy building. Try it later'));
    }
  }

  useEffect(() => {
    dispatch(setBuildingsAsync());
  }, [dispatch]);

  return (
    <div>
      <div className="buildings">
        {errorMessage ? <h2>{errorMessage}</h2> : null}
        {buildings.length && buildings.map((building) => (
          <Buildings key={building.id} building={building} />
        )) }
      </div>

      <div>
        <AddBuildingButton type="farm" onClick={onClickHandle} />
        <AddBuildingButton type="mine" onClick={onClickHandle} />
        <AddBuildingButton type="academy" onClick={onClickHandle} />
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  buildings: state.buildings,
  errorMessage: state.error.message,
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
  errorMessage: PropTypes.string,
};

KingdomBuildings.defaultProps = {
  buildings: [],
  errorMessage: '',
};

export default connect(mapStateToProps)(KingdomBuildings);
