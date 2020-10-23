import React from 'react';
import { useState } from 'react';
import './Settings.css';

function Settings() {
    const [kingdomname, setKingdomName] = useState('');

    const onKingdomNameChange = (e) => {
        setKingdomName(e.target.value);
    }
  return (
    <div>
      <form className="submit-container">
        <h2>Kingdom Settings</h2>
        <input
          type="text"
          className="kingdom-input"
          value={kingdomname}
          placeholder="Kingdom's name"
          onChange={onKingdomNameChange}
        />

        <button type="submit" className="submit-button">UPDATE SETTINGS</button>
      </form>
    </div>
  );
}

export default Settings;
