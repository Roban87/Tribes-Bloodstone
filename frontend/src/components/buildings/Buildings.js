import React from 'react';
import './buildings.css'

function Buildings({ building }) {
  return (
    <div className="building">
      <button
        className="building-buttons"
        className={building.type}
        value={building.type}
      ></button>
      <p>{building.type}</p>
      <p>Level {building.level}</p>
    </div>
  );
}

export default Buildings;
