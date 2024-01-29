import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import NavigationMenu from './NavigationMenu';
import '../css/CreateTeamPage.css';
import PlayerInputField from './PlayerInputField';


const CreateTeamPage = () => {
return (
    <div className='container'>
        <NavigationMenu />
        <h1>Create your team</h1>
        <form id='player-input-form'>
            <PlayerInputField />
            <button>Save your team</button>
        </form>
        <Link to="/login" id='link'>Go back to the login page</Link>
    </div>
);
};

export default CreateTeamPage;