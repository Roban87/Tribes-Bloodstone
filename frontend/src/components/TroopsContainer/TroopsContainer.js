import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import Troops from '../Troops/Troops';
import { setTroopsAsync } from '../../actions/troopsAction';
import troopImage from '../../assets/icons/TroopsPage.png';
import sword from '../../assets/icons/attack1.png';
import shield from '../../assets/icons/defence1.png';
import bread from '../../assets/icons/bread.png';
import './TroopsContainer.css';

function TroopsContainer(props) {
  const { troops, setTroopsError } = props;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setTroopsAsync());
  }, [dispatch]);

  return (
    <div>
      <div className="troops-total">
        <img className="troop-image" src={troopImage} alt="Troops" />
        <div className="troops-total-data">
          <p className="troops-data">
            <img className="detail-image" src={sword} alt="Sword" />
            Attack: &nbsp;
            {troops[0] && troops.map((troop) => {
              let sum = 0;
              sum += troop.attack;
              return sum;
            }).reduce((a, b) => a + b)}
          </p>
          <p className="troops-data">
            <img className="detail-image" src={shield} alt="Shield" />
            Defence: &nbsp;
            {troops[0] && troops.map((troop) => {
              let sum = 0;
              sum += troop.defence;
              return sum;
            }).reduce((a, b) => a + b)}
          </p>
          <p className="troops-data">
            <img className="detail-image" src={bread} alt="Bread" />
            Sustenance: &nbsp;
            {troops[0] && troops.map((troop) => {
              let sum = 0;
              sum += troop.attack;
              return sum;
            }).reduce((a, b) => a + b)}
          </p>
        </div>
      </div>
      <div className="troops">
        {setTroopsError ? <h2>{setTroopsError}</h2> : null}
        {troops.length && troops.map((troop) => <Troops key={troop.id} troop={troop} />)}
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
    }),
  ),
  setTroopsError: PropTypes.string,
};

TroopsContainer.defaultProps = {
  troops: [],
  setTroopsError: '',
};

export default connect(mapStateToProps)(TroopsContainer);
