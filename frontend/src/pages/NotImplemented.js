import React from 'react';
import { Link } from 'react-router-dom';

import '../styles/NotImplemented.css';

const loggingOut = () => {
  localStorage.removeItem('token');
}

function NotImplemented() {

  return (
    <div className="notImplemented">
      <h1>Sorry, this page is not implemented yet!</h1>
      <h2>Please come back later!</h2>
      <Link
        id='redirect'
        to="/login"
        style={{ textDecoration: 'none', color: '#3cb878' }}
        onClick={loggingOut}
      >
        Click here to go back to homepage
      </Link>
    </div>
  );
}

export default NotImplemented;
