import React from 'react'
import '../styles/Form.css';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';


function Form({formType}) {
  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [kingdomName, setKingdomName] = useState("");
  const history = useHistory();
  const path = process.env.REACT_APP_API_PATH;

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

  const onKingdomNameChange = (e) => {
    if (errorMessage) {
      setErrorMessage("");
    }
    setKingdomName(e.target.value);
  }

  const loginUser = () => {
    const loginData = {
      username: username,
      password: password,
    };
    fetch(path +  'login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', 
      }, 
      body: JSON.stringify(loginData),
    })
    .then((result) => result.json())
    .then((result) => {
      if(!result.token) {
        setErrorMessage(result.message);
        return null;
      }
      window.localStorage.token = result.token;
      setPassword("");
      setUsername("");
      history.push('/main');
    })
    .catch((err) => console.log(err));
  };

  const registerUser = () => {
    console.log("Placeholder for registration function")
  };

  const handleSubmit = (e) =>{
    e.preventDefault();
    if (!username || !password) {
      setErrorMessage('All the input fields are required');
      return null;
    } 
    if (formType === "login") {
      loginUser();
    }
    if (formType === "register") {
      registerUser();
    }
  };

  const kingdomInputStyle = {
    borderBottom: "2px solid rgb(14,155,141)",
  };
  const errorStyle = {
    borderBottom: "2px solid rgb(221,67,48)",
  };
  return (
    <div>
      <form onSubmit={handleSubmit} className="user-form">
        <input 
          type="text" 
          id="username-input"
          value={username} 
          placeholder="Username" 
          onChange={onUsernameChange} />
        <input 
          type="password" 
          id="password-input"
          value={password} 
          placeholder="Password" 
          onChange={onPasswordChange} 
          style={errorMessage ? errorStyle : null}
          />
        {errorMessage && <div className="error-message"><p>{errorMessage}</p><i className="fas fa-exclamation-triangle"></i></div>}
        {formType === "register" ? 
        <input 
          type="text" 
          id="kingdom-input"
          value={kingdomName}
          placeholder="Kingdom name"
          onChange={onKingdomNameChange}
          style={kingdomInputStyle}
          /> : null
          }
        <button type="submit">{formType === "register" ? "SIGN UP" : "LOG IN"}</button>
      </form>
    </div>
  )
}

export default Form;
