import React, { useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import '../styles/Form.css';
import { useHistory } from 'react-router-dom';
import fetchDataGeneral from '../utilities/generalFetch';
import { loginStartedAction, loginSuccessAction } from '../actions/sessionAction';
import { setLoginError } from '../actions/errorActions';

function Form({ formType, loginError }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [kingdomName, setKingdomName] = useState('');
  const history = useHistory();
  const dispatch = useDispatch();

  const onUsernameChange = (e) => {
    if (loginError) {
      dispatch(setLoginError(''));
    }
    setUsername(e.target.value);
  };

  const onPasswordChange = (e) => {
    if (loginError) {
      dispatch(setLoginError(''));
    }
    setPassword(e.target.value);
  };

  const onKingdomNameChange = (e) => {
    if (loginError) {
      dispatch(setLoginError(''));
    }
    setKingdomName(e.target.value);
  };

  const loginUser = async () => {
    dispatch(loginStartedAction());

    const endpoint = '/login';
    const method = 'POST';
    const loginData = {
      username,
      password,
    };

    try {
      const loginResponse = await fetchDataGeneral(endpoint, method, loginData);
      window.localStorage.token = loginResponse.token;
      setPassword('');
      setUsername('');
      history.push('/kingdom');
      return dispatch(loginSuccessAction(loginResponse.token));
    } catch (error) {
      return dispatch(setLoginError(error.message));
    }
  };

  const registerUser = async () => {
    dispatch(loginStartedAction());

    const endpoint = '/register';
    const method = 'POST';
    const registData = {
      username,
      password,
      kingdomname: kingdomName.length === 0 ? username : kingdomName,
    };

    try {
      const registerResponse = await fetchDataGeneral(endpoint, method, registData);
      history.push({ pathname: '/register/map', kingdomId: registerResponse.kingdomId });
    } catch (error) {
      dispatch(setLoginError(error.message));
    }
    return null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formType === 'login') {
      if (!username || !password) {
        dispatch(setLoginError('All the input fields are required'));
        return null;
      }
      loginUser();
    }
    if (formType === 'register') {
      if (!username || !password) {
        dispatch(setLoginError('Username and password are required'));
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
          style={loginError ? errorStyle : null}
        />
        {loginError && (
          <div className="error-message">
            <p>{loginError}</p>
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

Form.propTypes = {
  formType: PropTypes.string.isRequired,
  loginError: PropTypes.string.isRequired,
};

const mapStateToProps = ({ error }) => ({
  loginError: error.loginError,
});

export default connect(mapStateToProps)(Form);
