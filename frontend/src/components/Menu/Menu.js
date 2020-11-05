import React from 'react';
import MenuItem from './MenuItem';
import MenuComponents from './MenuComponents';

import '../../styles/Menu.css';

function Menu() {
  return (
    <nav className="menu-container">
      {MenuComponents.map((menuItem) => (
        <MenuItem
          key={menuItem.name}
          name={menuItem.name}
          link={`/kingdom${menuItem.link}`}
        />
      ))}
    </nav>
  );
}

export default Menu;
