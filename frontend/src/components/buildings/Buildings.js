import React from 'react';
import './buildings.css';

function Buildings({ building }) {
  return (
    <div className="building">
      <button
        alt={building.type}
        type="button"
        className={`${building.type} building-buttons`}
        value={building.type}
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
