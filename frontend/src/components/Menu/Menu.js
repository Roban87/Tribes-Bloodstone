import React from 'react';
import MenuItem from './MenuItem';
import MenuComponents from './MenuComponents';

import '../../styles/Menu.css';

function Menu() {
  //   console.log(MenuComponents[0].component);
  return (
    <nav className="Menu">
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
