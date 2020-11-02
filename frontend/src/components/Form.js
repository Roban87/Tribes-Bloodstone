import React, { useState } from 'react';
import '../styles/Form.css';
import { useHistory } from 'react-router-dom';
import fetchDataGeneral from '../utilities/generalFetch';

function Form({ formType }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [kingdomName, setKingdomName] = useState('');
  const history = useHistory();

  const onUsernameChange = (e) => {
    if (errorMessage) {
      setErrorMessage('');
    }
    setUsername(e.target.value);
  };

  const onPasswordChange = (e) => {
    if (errorMessage) {
      setErrorMessage('');
    }
    setPassword(e.target.value);
  };

  const onKingdomNameChange = (e) => {
    if (errorMessage) {
      setErrorMessage('');
    }
    setKingdomName(e.target.value);
  };

  const loginUser = async () => {
    const endpoint = '/login';
    const method = 'POST';
    const loginData = {
      username,
      password,
    };

    try {
      const loginResponse = await fetchDataGeneral(endpoint, method, loginData);

      if (!loginResponse.token) {
        setErrorMessage(loginResponse.message);
        return null;
      }

      window.localStorage.token = loginResponse.token;
      setPassword('');
      setUsername('');
      history.push('/kingdom');
    } catch (error) {
      console.log(error);
    }
    return null;
  };

  const registerUser = async () => {
    const endpoint = '/register';
    const method = 'POST';
    const registData = {
      username,
      password,
      kingdomname: kingdomName.length === 0 ? username : kingdomName,
    };

    try {
      const registerResponse = await fetchDataGeneral(
        endpoint,
        method,
        registData,
      );

      return registerResponse.message
        ? setErrorMessage(registerResponse.message)
        : history.push('/login');
    } catch (error) {
      console.log(error);
    }
    return null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formType === 'login') {
      if (!username || !password) {
        setErrorMessage('All the input fields are required');
        return null;
      }
      loginUser();
    }
    if (formType === 'register') {
      if (!username || !password) {
        setErrorMessage('Username and password are required');
        return null;
      }
      registerUser();
    }
    return null;
  };

  const kingdomInputStyle = {
    borderBottom: '2px solid rgb(14,155,141)',
  };
  const errorStyle = {
    borderBottom: '2px solid rgb(221,67,48)',
  };
  return (
    <div>
      <form onSubmit={handleSubmit} className="user-form">
        <input
          type="text"
          id="username-input"
          value={username}
          placeholder="Username"
          onChange={onUsernameChange}
        />
        <input
          type="password"
          id="password-input"
          value={password}
          placeholder="Password"
          onChange={onPasswordChange}
          style={errorMessage ? errorStyle : null}
        />
        {errorMessage && (
          <div className="error-message">
            <p>{errorMessage}</p>
            <i className="fas fa-exclamation-triangle" />
          </div>
        )}
        {formType === 'register' ? (
          <input
            type="text"
            id="kingdom-input"
            value={kingdomName}
            placeholder="Kingdom name"
            onChange={onKingdomNameChange}
            style={kingdomInputStyle}
          />
        ) : null}
        <button type="submit">
          {formType === 'register' ? 'SIGN UP' : 'LOG IN'}
        </button>
      </form>
    </div>
  );
}

export default Form;
