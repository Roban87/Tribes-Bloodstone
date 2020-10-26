import React from 'react';
import { useState } from 'react';
import './Settings.css';

function Settings() {
  const [kingdomname, setKingdomName] = useState('');
  const path = process.env.REACT_APP_API_PATH;

  const onKingdomNameChange = e => {
    setKingdomName(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const fetchData = {
      name: kingdomname 
    }
    let token = localStorage.getItem('token');
    let response = await fetch(`${path}/settings`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'accepts': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(fetchData),
    });
    let data = await response.json();
    console.log(data);
    
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
