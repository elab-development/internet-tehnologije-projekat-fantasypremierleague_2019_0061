import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import '../css/NavigationMenu.css';

const NavigationMenu = () => {
return (
    <div id='navmenu'>
       <ul>
        <li><Link to="/">home page</Link></li>
        <li><Link to="/create_team">my team</Link></li>
        <li><Link to="/about">about</Link></li>
        <li>log out</li>
       </ul>
    </div>
);
};

export default NavigationMenu;