import React from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import '../styles/Login.css';

function Login() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const history = useHistory();

  const onUsernameChange = (e) => {
    if (errorMessage) {
      setErrorMessage("");
    }
    setUsername(e.target.value);
  };

  const onPasswordChange = (e) => {
    if (errorMessage) {
      setErrorMessage("");
    }
    setPassword(e.target.value);
  };

  const handleSubmit = (e) =>{
    e.preventDefault();
    if (!username || !password) {
      setErrorMessage('All the input fields are required');
      return null;
    } 
    
    fetch('http://localhost:3000/api/login/', {
      'method': 'POST',
      headers: {
        'Content-Type': 'application/json', 
      }, 
      body: JSON.stringify({ username: username, password: password }),
    })
    .then((result) => result.json())
    .then((result) => {
      if(!result.token) {
        setErrorMessage(result.message);
        return null;
      }
      window.localStorage.jwt = result.token;
      setPassword("");
      setUsername("");
      history.push('/main')
    })
    .catch((err) => console.log(err));
  }

  const inputStyle = {
    borderBottom: "2px solid rgb(221,67,48)",
  };

  return (
    <div className="login-container">
      <h1>Tribes of Microtis</h1>
      <form onSubmit={handleSubmit} className="login-form">
        <input 
          type="text" 
          id="login-username" 
          value={username} 
          placeholder="Username" 
          onChange={onUsernameChange} />
        <input 
          type="password" 
          id="login-password" 
          value={password} 
          placeholder="Password" 
          onChange={onPasswordChange} 
          style={errorMessage ? inputStyle : null}
          />
        {errorMessage && <div className="error-message"><p>{errorMessage}</p><i class="fas fa-exclamation-triangle"></i></div>}
        <button type="submit">LOGIN</button>
      </form>
    </div>
  )
}

export default Login
