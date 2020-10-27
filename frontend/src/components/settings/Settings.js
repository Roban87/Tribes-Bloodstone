import React from 'react';
import { useState } from 'react';
import './Settings.css';
import { fetchDataGeneral } from '../../utilities/generalFetch';
import { useHistory } from 'react-router-dom';

function Settings() {
  const [kingdomname, setKingdomName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const history = useHistory();

  const onKingdomNameChange = e => {
    setKingdomName(e.target.value);
    setErrorMessage('');
  };
  const handleSubmit = async e => {
    e.preventDefault();
    const endpoint = '/kingdom';
    const method = 'PUT';
    const fetchData = {
      name: kingdomname,
    };
    try {
      let settingsData = await fetchDataGeneral(endpoint, method, fetchData);
      if (kingdomname.length >= 3) {
        console.log(settingsData);
        history.push('/main');
      } else {
        setErrorMessage('Needs minimum 3 character for kingdomname');
      }
    } catch (error) {
      console.log(error);
      
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
            <i className="fas fa-exclamation-triangle"></i>
          </div>
        )}

        <button type="submit" className="submit-button">
          UPDATE SETTINGS
        </button>
      </form>
    </div>
  );
}

export default Settings;
