import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../../styles/MenuItem.css';

function MenuItem({ name, link }) {
  return (
    <Link className="menuItem" key={link} to={link}>
      <div className={`menuImage ${name}`} />
      <p className="menuText">{name}</p>
    </Link>
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
