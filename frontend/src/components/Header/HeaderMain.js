import React from 'react';
import { Link } from 'react-router-dom';

const linkStyle = {
  textDecoration: 'none',
  color: 'white',
};

function HeaderMain({ isLoggedIn }) {
  if (isLoggedIn !== null) {
    return (
      <Link className="headerMain" to="/kingdom" style={linkStyle}>
        My Kingdom
      </Link>
    );
  } else {
    return <h1 className="headerMain">Tribes of Microtis</h1>;
  }
}

export default HeaderMain;
