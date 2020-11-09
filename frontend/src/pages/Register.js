import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { loginStartedAction } from '../actions/sessionAction';
import Form from '../components/Form';
import '../styles/Register.css';

function Register() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loginStartedAction());
  }, [dispatch]);

  return (
    <div className="register-container">
      <h1>Tribes of Microtis</h1>
      <Form formType="register" />
    </div>
  );
}

export default connect()(Register);
