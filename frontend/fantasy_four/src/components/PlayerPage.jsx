import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate
import BackgroundImageRotator from './BackgroundImageRotator';

const PlayerPage = ({ mode }) => {
    const { playerId } = useParams();
    const navigate = useNavigate(); // For navigating after delete
    const [player, setPlayer] = useState({
        name: '',
        club: '',
        cost: '',
        position: '',
        photo: ''
    });

    useEffect(() => {
        if (mode === 'edit') {
            loadPlayer();
        }
    }, [playerId]);

    const loadPlayer = async () => {
        const response = await fetch(`http://localhost:8000/api/players/${playerId}`, {
            method: 'GET'
        });

        if (response.ok) {
            const data = await response.json();
            setPlayer({
                name: data.name,
                position: data.position,
                clubId: data.club_id,
                cost: data.cost,
                photo: data.photo
            });
        } else {
            alert('An error occurred while fetching the player data');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPlayer((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSaveChanges = async () => {
        // Prepare the player data to be sent to the merge function
        const playerData = {
            id: playerId,
            name: player.name,
            position: player.position,
            club_id: player.clubId,
            cost: player.cost
        };

        const response = await fetch('http://localhost:8000/api/players/merge', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(playerData)
        });

        if (response.ok) {
            alert('Player saved successfully');
        } else {
            alert('Failed to save player');
        }
    };

    const handleDelete = async () => {
        const response = await fetch(`http://localhost:8000/api/players/${playerId}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            alert('Player deleted successfully');
            navigate('/admin_dashboard'); // Redirect to admin page after deletion
        } else {
            alert('Failed to delete player');
        }
    };

    return (
        
            <BackgroundImageRotator>
                <h1 className="heading">Player Details - {player.name}</h1>
                {player.photo && <img src={player.photo} alt={`${player.name}`} />} {/* Display player photo */}
                <form style={{backgroundColor: 'transparent'}}>
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={player.name}
                        onChange={handleChange}
                        disabled={mode === 'edit'}
                    />

                    <label htmlFor="position">Position:</label>
                    <input
                        type="text"
                        id="position"
                        name="position"
                        value={player.position}
                        onChange={handleChange}
                        disabled={mode === 'edit'}
                    />

                    <label htmlFor="club">Club:</label>
                    <input
                        type="text"
                        id="club"
                        name="clubId" // Updated to match the state field
                        value={player.clubId}
                        onChange={handleChange}
                    />

                    <label htmlFor="cost">Cost:</label>
                    <input
                        type="text"
                        id="cost"
                        name="cost"
                        value={player.cost}
                        onChange={handleChange}
                    />

                    <button type="button" onClick={handleSaveChanges}>Save changes</button> {/* Save button */}
                    <button type="button" onClick={handleDelete} disabled={mode === 'create'}>Delete the player</button> {/* Delete button */}
                </form>
            </BackgroundImageRotator>
           
        
    );
};

export default PlayerPage;