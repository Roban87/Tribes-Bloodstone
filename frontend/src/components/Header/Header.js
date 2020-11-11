import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import HeaderMain from './HeaderMain';
import './Header.css';

function Header({ isLoggedIn, loggingOut }) {
  const loggedInLinks = [
    { text: 'Settings', path: '/settings' },
    { text: 'Logout', path: '/login' },
  ];
  const loggedOutLinks = [
    { text: 'Login', path: '/login' },
    { text: 'Register', path: '/register' },
  ];
  let currentStatus = loggedOutLinks;

  const linkStyle = {
    textDecoration: 'none',
    color: 'black',
  };

  if (isLoggedIn !== false) {
    currentStatus = loggedInLinks;
  }
  return (
    <div className="header" key="header">
      <HeaderMain isLoggedIn={isLoggedIn} />
      <div>
        {currentStatus.map((item) => (
          <Link
            key={item.text}
            to={item.path}
            style={linkStyle}
            className="link"
            onClick={() => {
              if (item.text === 'Logout') {
                loggingOut();
              }
            }}
          >
            {item.text}
          </Link>
        ))}
      </div>
    </div>
  );
}

Header.propTypes = {
  loggingOut: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};

export default Header;
