import React, { useState } from 'react';

import './Settings.css';
import { useHistory } from 'react-router-dom';
import fetchDataGeneral from '../../utilities/generalFetch';

function Settings() {
  const [kingdomname, setKingdomName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const history = useHistory();

  const onKingdomNameChange = (e) => {
    setKingdomName(e.target.value);
    setErrorMessage('');
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = '/kingdom';
    const method = 'PUT';
    const fetchData = {
      name: kingdomname,
    };
    if (kingdomname.length >= 3) {
      try {
        const settingsData = await fetchDataGeneral(
          endpoint,
          method,
          fetchData,
        );
        console.log(settingsData);
        history.push('/kingdom');
      } catch (error) {
        setErrorMessage(error.message);
        console.log(error);
      }
    } else {
      setErrorMessage('The kingdomname needs to be longer than 3 characters');
    }
  };
  return (
    <div className="settings-container">
      <form className="submit-container" onSubmit={handleSubmit}>
        <h2>Kingdom Settings</h2>
        <input
          type="text"
          className="kingdom-input"
          value={kingdomname}
          placeholder="Kingdom's name"
          onChange={onKingdomNameChange}
        />
        {errorMessage && (
          <div className="error-message">
            <p>{errorMessage}</p>
            <i className="fas fa-exclamation-triangle" />
          </div>
        )}

        <button type="submit" className="submit-button">
          UPDATE NAME
        </button>
      </form>
    </div>
  );
}

export default Settings;
