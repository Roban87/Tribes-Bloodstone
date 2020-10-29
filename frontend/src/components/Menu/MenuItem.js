import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/MenuItem.css';

function MenuItem({ name, link }) {
  return (
    <Link className="menuItem" key={link} to={link}>
      <div className={`menuImage ${name}`} />
      <p className="menuText">{name}</p>
    </Link>
  );
}

export default MenuItem;
