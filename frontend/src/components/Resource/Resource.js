import React from 'react';
import './Resource.css'

function Resource(props) {

  const resGeneration = props.generation > 0 ? 'increase' : 'decrease';

  return(
    <div className="resource-container">

      <img className="building" src={props.building} alt={props.altBuilding} />

      <div>
      <div className="resource-amount">
        <h2>{props.amount}</h2>
        <img className="icon" src={props.resource} alt={props.altResource} />
      </div>

      <h3 className={resGeneration}>{props.generation} / minute</h3>
      </div>

    </div>
  );
}

export default Resource;