import React from 'react';
import { useState, useEffect } from 'react';

function Login() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) =>{
    e.preventDefault();
    fetch('http://localhost:3000/api/login/', {
      'method': 'POST', 
      'Content-Type': 'Application/json', 
      'body': { username: username, password: password }})
    .then((result) => result.json())
    .then(console.log);
  }

  return (
    <div>
      <h1>Hello world</h1>
      <form onSubmit={handleSubmit}className="login-form">
        <input type="text" id="login-username" value={username} onChange={onUsernameChange} />
        <input type="password" id="login-password" value={password} onChange={onPasswordChange} />
        <button type="submit">LOGIN</button>
      </form>
    </div>
  )
}

export default Login
