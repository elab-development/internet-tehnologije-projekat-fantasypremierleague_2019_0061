import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../css/NavigationMenu.css';

const NavigationMenu = () => {
  const location = useLocation();

  // Check if the user is logged in by verifying if authToken exists
  const isLoggedIn = !!localStorage.getItem('authToken');
  const userRole = localStorage.getItem('role'); // Assuming role is stored in localStorage
  
  const isCurrentPage = (path) => {
    return location.pathname === path;
  };

  return (
    <div id='navmenu'>
      <ul>
        <li className={isCurrentPage('/') ? 'active' : ''}>
          <Link to="/">home page</Link>
        </li>
        {isLoggedIn && userRole === 'manager' && (
          <li className={isCurrentPage('/create_team') ? 'active' : ''}>
            <Link to="/create_team">my team</Link>
          </li>
        )}
        {isLoggedIn && userRole === 'admin' && (
          <li className={isCurrentPage('/admin_dashboard') ? 'active' : ''}>
            <Link to="/admin_dashboard">admin dashboard</Link>
          </li>
        )}
        <li className={isCurrentPage('/about') ? 'active' : ''}>
          <Link to="/about">about</Link>
        </li>
        {isLoggedIn && (
          <li className={isCurrentPage('/game_data') ? 'active' : ''}>
            <Link to="/game_data">game data</Link>
          </li>
        )}
      </ul>
    </div>
  );
};

export default NavigationMenu;