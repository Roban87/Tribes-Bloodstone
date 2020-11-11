import React from 'react';
import PropTypes from 'prop-types';
import './buildings.css';
import { useHistory } from 'react-router-dom';

function Buildings({ building }) {
  const history = useHistory();
  function handleClick() {
    const path = `/kingdom/buildings/${building.id}`;
    history.push(path);
  }
  return (
    <div className="building">
      <button
        alt={building.type}
        type="button"
        className={`${building.type} building-buttons`}
        value={building.type}
        onClick={handleClick}
      />
      <p>{building.type}</p>
      <p>
        Level
        {building.level}
      </p>
    </div>
  );
}

Buildings.propTypes = {
  building: PropTypes.shape({
    finishedAt: PropTypes.string,
    startedAt: PropTypes.string,
    type: PropTypes.string,
    id: PropTypes.number,
    hp: PropTypes.number,
    level: PropTypes.number,
  }).isRequired,
};

export default Buildings;
