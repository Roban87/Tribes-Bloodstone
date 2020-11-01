import React from 'react';
import PropTypes from 'prop-types';
import './Resource.css';

function Resource(props) {
  const {
    generation,
    building,
    altBuilding,
    amount,
    resource,
    altResource,
  } = props;

  const resGeneration = generation > 0 ? 'increase' : 'decrease';

  return (
    <div className="resource-container">
      <img className="building" src={building} alt={altBuilding} />

      <div>
        <div className="resource-amount">
          <h2>{amount}</h2>
          <img className="icon" src={resource} alt={altResource} />
        </div>

        <h3 className={resGeneration}>{`${generation} / minute`}</h3>
      </div>
    </div>
  );
}

Resource.propTypes = {
  generation: PropTypes.number.isRequired,
  building: PropTypes.string.isRequired,
  altBuilding: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
  resource: PropTypes.string.isRequired,
  altResource: PropTypes.string.isRequired,
};

export default Resource;
