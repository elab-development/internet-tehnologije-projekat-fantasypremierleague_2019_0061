import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import BackgroundImageRotator from './BackgroundImageRotator';

const AdminDashboardPage = () => {
    const [players, setPlayers] = useState([]);
    const navigate = useNavigate(); // Updated hook for navigation

    const handleSearch = async (e) => {
        e.preventDefault();
        
        const playerName = e.target.elements['player-name'].value;

        const url = `http://localhost:8000/api/players/search?name=${playerName}`;

        const searchResponse = await fetch(url, {
            method: 'GET'
        });

        if (searchResponse.ok) {
            const data = await searchResponse.json();
            setPlayers(data);
        } else {
            alert('Search request failed');
        }

    }
    const handlePlayerSelection = (e) => {
        const playerId = e.target.value;
        const selectedPlayer = players.find(player => player.id === parseInt(playerId)); // Find the player by ID
    
        if (selectedPlayer) {
            // Check if the photo exists and pass it, otherwise pass an empty string or a placeholder
            const photo= selectedPlayer.photo ? selectedPlayer.photo : ''; 
            navigate(`/player/${playerId}`, {state: {photo}});
        } else {
            console.error('Player not found or photo is undefined.');
        }
    };

    return (
        <>
        <BackgroundImageRotator>
            <h1>Admin dashboard</h1>
            <p>This is the interface that is dedicated for modifying the game-related data by the administrators.</p>
            <form onSubmit={handleSearch}>
            <label htmlFor="player-name">Search players by name:</label>
            <input type="text" name='player-name'/>
            <button type='submit'>Search</button>
            </form>
           
            <select name="players" onChange={handlePlayerSelection}>
    <option value="">Select a player</option>
    {players.map((player) => (
        <option key={player.id} value={player.id}>{player.name}</option>
    ))}
</select>

            <button style={{color: 'black'}}><Link to="/player">Create a new player</Link></button>
    
        </BackgroundImageRotator>
        </>
    );
};

export default AdminDashboardPage;