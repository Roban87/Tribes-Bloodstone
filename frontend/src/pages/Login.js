import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { loginStartedAction } from '../actions/sessionAction';
import Form from '../components/Form';
import '../styles/Login.css';

function Login() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loginStartedAction());
  }, [dispatch]);

  return (
    <div className="login-container">
      <h1>Tribes of Microtis</h1>
      <Form formType="login" />
    </div>
  );
}

export default connect()(Login);
