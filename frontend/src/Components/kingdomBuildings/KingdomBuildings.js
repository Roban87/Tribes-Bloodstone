import React, { useState, useEffect } from 'react';
import Buildings from '../buildings/Buildings';
import './kingdomBuildings.css';

function KingdomBuildings() {
  const [buildings, setBuildings] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchBuildings();
  }, []);

  async function fetchBuildings() {
    const token = JSON.parse(localStorage.getItem('token'));
    ;
    try {
      const buildingData = await fetch(
        `${process.env.REACT_APP_API_PATH}/kingdom/buildings/${token.kingdomId}`, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Token': token,
          }
        }
      );
      const buildingResult = await buildingData.json();
      setBuildings(buildingResult.buildings);
    } catch (error) {
      console.log(error);
      setErrorMessage('Something went wrong');
    }
  }

  return (
    <div className="buildings">
      {errorMessage ? (
        <h2>{errorMessage}</h2>
      ) : (
        buildings.map(building => (
          <Buildings key={building.id} building={building} />
        ))
      )}
    </div>
  );
}

export default KingdomBuildings;
