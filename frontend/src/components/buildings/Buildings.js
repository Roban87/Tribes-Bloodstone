import React from 'react';
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

export default Buildings;
