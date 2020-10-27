import React from 'react';
import { Link } from 'react-router-dom';

function HeaderMain({ isLoggedIn }) {
  console.log(isLoggedIn);
  if (isLoggedIn !== null) {
    return (
      <Link className="headerMain" to='/' style={{ textDecoration: 'none', color: 'white' }}>
        My Kingdom
      </Link>
    );
  } else {
    return <h1 className="headerMain">Tribes of Microtis</h1>;
  }
}

export default HeaderMain;
