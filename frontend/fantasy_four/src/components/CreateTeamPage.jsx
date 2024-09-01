import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import NavigationMenu from './NavigationMenu';
import '../css/CreateTeamPage.css';
import BackgroundImageRotator from './BackgroundImageRotator';


const CreateTeamPage = () => {

    const [username, setUsername] = useState('');
    const [players, setPlayers] = useState([]);

    useEffect(() => {
        // Retrieve the username from local storage when the component mounts
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
            setUsername(storedUsername);
        }
    }, []);

    const searchPlayers = async(e) => {
        e.preventDefault();
        const position = e.target.elements['player-position'].value;
        const maxCost = e.target.elements['player-max-cost'].value;

        const queryParams = {
            position: position,
            maxCost: maxCost
        };

        const url = 'http://localhost:8000/api/players/search?position=' + queryParams.position + '&max_cost=' + queryParams.maxCost;

        const searchResponse = await fetch(url,{
            method: 'GET'
        });
        if (searchResponse.ok) {
            const data = await searchResponse.json();
            setPlayers(data);  // Update the global players array
            alert('The players are succesfully fetched. URL: ' + url);
        } else {
            console.error('Search request failed');
        }
    }


return (
    <>
    <NavigationMenu />
    <BackgroundImageRotator>
        
        <h1>Create your team</h1>
        <p>Logged in as: {username}</p>
        <form id='player-input-form' onSubmit={searchPlayers}>
            <label htmlFor="player-position">Position</label>
            <select name="player-position" id="">
                <option value="1">Goalkeeper</option>
                <option value="2">Defender</option>
                <option value="3">Midfielder</option>
                <option value="4">Striker</option>
            </select>
            <label htmlFor="player-max-cost">Cost lower than...</label>
            <input type="text" name='player-max-cost' />
            <button>Search</button>
        </form>
        <div 
    id="search-results" 
    style={{ 
        height: '300px', // Set the height of the container
        width: '300px',
        overflowY: 'auto', // Enable vertical scrolling
        border: '1px solid #ccc', // Optional: Add a border for better visual distinction
        padding: '10px', // Optional: Add some padding
        backgroundColor: '#f9f9f9', // Optional: Set a background color
        color: 'black'
    }}
>
    {players.map((player) => (
        <div key={player.id}>
            <p>{player.name}</p>
        </div>
    ))}
</div>
    </BackgroundImageRotator>
    </>
);
};

export default CreateTeamPage;