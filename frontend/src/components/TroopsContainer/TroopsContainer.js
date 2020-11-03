import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import Troops from '../Troops/Troops';
import { setTroopsAsync } from '../../actions/troopsAction';
import fetchDataGeneral from '../../utilities/generalFetch';

function TroopsContainer(props) {
  const { troops, setTroopsError } = props;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setTroopsAsync());
  }, [dispatch]);

  return (
    <div>
      <div className="troops">
        {setTroopsError ? <h2>{setTroopsError}</h2> : null}
        {troops.length &&
          troops.map((troop) => (
            <Troops key={troop.id} troop={troop} />
          ))}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  troops: state.troops.troops,
  setTroopsError: state.error.troopsError,
});

TroopsContainer.propTypes = {
  troops: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      level: PropTypes.number,
      hp: PropTypes.number,
      attack: PropTypes.number,
      defence: PropTypes.number,
      started_at: PropTypes.string,
      finished_at: PropTypes.string,
    })
  ),
  setTroopsError: PropTypes.string,
};

TroopsContainer.defaultProps = {
  troops: [],
  setTroopsError: '',
};

export default connect(mapStateToProps)(TroopsContainer);
