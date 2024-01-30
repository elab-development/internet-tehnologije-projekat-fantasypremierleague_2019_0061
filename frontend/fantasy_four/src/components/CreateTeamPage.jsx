import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import NavigationMenu from './NavigationMenu';
import '../css/CreateTeamPage.css';
import PlayerInputField from './PlayerInputField';
import BackgroundImageRotator from './BackgroundImageRotator';


const CreateTeamPage = () => {
return (
    <>
    <NavigationMenu />
    <BackgroundImageRotator>
        
        <h1>Create your team</h1>
        <form id='player-input-form'>
            <label htmlFor="player-search">Enter the player's name here:</label>
            <input type="text" name='player-search' />
            <button>Search</button>
        </form>
        <Link to="/login" id='link'>Go back to the login page</Link>
    </BackgroundImageRotator>
    </>
);
};

export default CreateTeamPage;