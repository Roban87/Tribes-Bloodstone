import React from 'react';
import Form from '../components/Form';
import '../styles/Login.css';

function Login() {
  return (
    <div className="login-container">
      <h1>Tribes of Microtis</h1>
      <Form formType="login" />
    </div>
  );
}

export default Login;
