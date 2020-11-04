import React from 'react';

function Troops(props) {
  const { troop } = props;
  return (
    <div className="troops-container">
      <div className="troops-list">
        Troops list
        <div>
          {troop.level}
        </div>
      </div>
    </div>
  );
}

export default Troops;
