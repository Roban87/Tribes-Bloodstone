import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import Buildings from '../buildings/Buildings';
import './kingdomBuildings.css';
import { setBuildingsAsync } from '../../actions/buildingsActions';

function KingdomBuildings(props) {
  const { buildings, errorMessage } = props;
  const dispatch = useDispatch();

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
