import React from 'react';
import Form from '../components/Form';
import '../styles/Register.css';

function Register() {
  return (
    <div className="register-container">
      <h1>Tribes of Microtis</h1>
      <Form formType={'register'} />
    </div>
  );
}

export default Register;
