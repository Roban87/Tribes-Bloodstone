import React, { useState, useEffect } from 'react';
import Buildings from '../buildings/Buildings';
import './Components/kingdomBuildings/kingdomBuildings.css';

function KingdomBuildings() {
  const [buildings, setBuildings] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchBuildings();
  }, []);

  async function fetchBuildings() {
    const kingdomId = localStorage.getItem('kingdomId');
    try {
      const buildingData = await fetch(
        `http://localhost:3000/api/kingdom/buildings/${kingdomId}`
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
