import React from 'react';
import PropTypes from 'prop-types';
import troopImage from '../../assets/icons/TroopsPage.png';

function Troops(props) {
  const { level, count } = props;
  return (
    <div className="troops-container">
      <div className="troops-list">
        <img className="small-troop-image" src={troopImage} alt="Troops" />
        <p className="troop-levels">
          <strong>{count}</strong>
          &nbsp;Troops level&nbsp;
          {level}
        </p>
      </div>
    </div>
  );
}

Troops.propTypes = {
  level: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
};

export default Troops;
