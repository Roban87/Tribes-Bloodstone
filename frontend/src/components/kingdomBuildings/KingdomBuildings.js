import React, { useState, useEffect } from 'react';
import Buildings from '../buildings/Buildings';
import './kingdomBuildings.css';
import { fetchDataGeneral } from '../../utilities/generalFetch';

function KingdomBuildings() {
  const [buildings, setBuildings] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchBuildings();
  }, []);

  async function fetchBuildings() {
    const token = localStorage.getItem('token');
    const kingdomId = localStorage.getItem('kingdomId');
    const endpoint = `/kingdom/buildings/${kingdomId}`;
    const method = 'GET';
    
    try {
      let buildingsData = fetchDataGeneral(endpoint, method, token);
      setBuildings(buildingsData.buildings);
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
