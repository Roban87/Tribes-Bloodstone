import React from 'react';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function Login() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const history = useHistory();

  const onUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const onPasswordChange = (e) => {
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

  return (
    <div>
      <h1>Hello world</h1>
      <form onSubmit={handleSubmit}className="login-form">
        <input type="text" id="login-username" value={username} onChange={onUsernameChange} />
        <input type="password" id="login-password" value={password} onChange={onPasswordChange} />
        <p>{errorMessage}</p>
        <button type="submit">LOGIN</button>
      </form>
    </div>
  )
}

export default Login
