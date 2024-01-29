import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import NavigationMenu from './NavigationMenu';

const CreateTeamPage = () => {
return (
    <div className='container'>
        <NavigationMenu />
        <h1>Create your team</h1>
        <form>
            <label htmlFor="goalkeeper">Select your goalkeeper:</label>
            <select name="goalkeeper" id="goalkeeper"></select>
            <label htmlFor="defender">Select your defender:</label>
            <select name="defender" id="defender"></select>
            <label htmlFor="midfielder">Select your midfielder:</label>
            <select name="midfielder" id="midfielder"></select>
            <label htmlFor="forward">Select your forward:</label>
            <select name="forward" id="forward"></select>

            <button>Save your team</button>
        </form>
        <Link to="/login" id='link'>Go back to the login page</Link>
    </div>
);
};

export default CreateTeamPage;