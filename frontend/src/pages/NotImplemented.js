import React from 'react';
import { Link } from 'react-router-dom';

import '../styles/NotImplemented.css';

function NotImplemented({ isLoggedIn, loggingOut }) {
console.log(isLoggedIn);
  return (
    <div className="notImplemented">
      <h1>Sorry, this page is not implemented yet!</h1>
      <h2>Please come back later!</h2>
      <Link
        id='redirect'
        to="/login"
        style={{ textDecoration: 'none', color: '#3cb878' }}
        onClick={() => {if(isLoggedIn !== null) {loggingOut()}}}
      >
        Click here to go back to homepage
      </Link>
    </div>
  );
}

export default NotImplemented;