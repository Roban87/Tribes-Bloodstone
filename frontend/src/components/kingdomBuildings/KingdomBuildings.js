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
    const token = localStorage.getItem('token');
    const kingdomId = localStorage.getItem('kingdomId');
    
    try {
      const buildingData = await fetch(
        `${process.env.REACT_APP_API_PATH}/kingdom/buildings/${kingdomId}`, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
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
