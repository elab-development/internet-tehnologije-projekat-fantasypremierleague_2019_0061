import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../css/NavigationMenu.css';
 
const NavigationMenu = () => {
  const location = useLocation();
 
  const isCurrentPage = (path) => {
    return location.pathname === path;
  };
 
  return (
    <div id='navmenu'>
      <ul>
        <li className={isCurrentPage('/') ? 'active' : ''}>
          <Link to="/">home page</Link>
        </li>
        <li className={isCurrentPage('/create_team') ? 'active' : ''}>
          <Link to="/create_team">my team</Link>
        </li>
        <li className={isCurrentPage('/about') ? 'active' : ''}>
          <Link to="/about">about</Link>
        </li>
        <li className={isCurrentPage('/game_data') ? 'active' : ''}>
          <Link to="/game_data">game data</Link>
        </li>
      </ul>
    </div>
  );
};
 
export default NavigationMenu;