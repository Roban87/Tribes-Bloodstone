import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../../styles/MenuItem.css';

function MenuItem({ name, link }) {
  const backgroundColor = { Grey: '#2323236c' };
  return (
    <NavLink className="menuItem" key={link} to={link} activeStyle={{ backgroundColor: backgroundColor.Grey }}>
      <div className={`menuImage ${name}`} />
      <p className="menuText">{name}</p>
    </NavLink>
  );
}

MenuItem.propTypes = {
  name: PropTypes.string,
  link: PropTypes.string,
};

MenuItem.defaultProps = {
  name: undefined,
  link: undefined,
};

export default MenuItem;
