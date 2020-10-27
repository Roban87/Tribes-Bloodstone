import React, { useState, useEffect } from 'react';
import Buildings from '../buildings/Buildings';
import './kingdomBuildings.css';
import fetchDataGeneral from '../../utilities/generalFetch';

function KingdomBuildings() {
  const [buildings, setBuildings] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  async function fetchBuildings() {
    const kingdomId = localStorage.getItem('kingdomId');
    const endpoint = `/kingdom/buildings/${kingdomId}`;
    const method = 'GET';

    try {
      const buildingsData = await fetchDataGeneral(endpoint, method);

      setBuildings(buildingsData.buildings);
    } catch (error) {
      setErrorMessage('Something went wrong');
    }
  }

  useEffect(() => {
    fetchBuildings();
  }, []);

  return (
    <div className="buildings">
      {errorMessage ? (
        <h2>{errorMessage}</h2>
      ) : (
        buildings.map((building) => (
          <Buildings key={building.id} building={building} />
        ))
      )}
    </div>
  );
}

export default KingdomBuildings;
