import React from 'react';
import { useState } from 'react';
import './Settings.css';
import { fetchDataGeneral } from '../../utilities/generalFetch';

function Settings() {
  const [kingdomname, setKingdomName] = useState('');

  const onKingdomNameChange = e => {
    setKingdomName(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = '/settings';
    const method = 'PUT';
    const fetchData = {
      name: kingdomname 
    }
    try {
      let settingsData = await fetchDataGeneral(endpoint, method, fetchData);
      console.log(settingsData);
    } catch (error) {
      console.log(error);
    }
    
  };
  return (
    <div>
      <form className="submit-container" onSubmit={handleSubmit}>
        <h2>Kingdom Settings</h2>
        <input
          type="text"
          className="kingdom-input"
          value={kingdomname}
          placeholder="Kingdom's name"
          onChange={onKingdomNameChange}
        />

        <button type="submit" className="submit-button">
          UPDATE SETTINGS
        </button>
      </form>
    </div>
  );
}

export default Settings;
