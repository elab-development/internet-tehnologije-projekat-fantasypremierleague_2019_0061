import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import NavigationMenu from './NavigationMenu';
import BackgroundImageRotator from './BackgroundImageRotator';

const PlayerPage = ({ mode, playerPhoto }) => {
    const { playerId } = useParams();
    const [player, setPlayer] = useState({
        name: '',
        club: '',
        cost: ''
    });

    useEffect(() => {
        if(mode === 'edit'){loadPlayer();}
        
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
                cost: data.cost
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

    return (
        <>
            <NavigationMenu />
            <BackgroundImageRotator>
                <h1 className="heading">Player Details (Mode: {mode})</h1>
                {playerPhoto && <img src={playerPhoto} alt={`${player.name}`} />} {/* Display player photo */}
                <form>
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
                        name="club"
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

                    <button type="button">Save changes</button> {/* Save button */}
                    <button type="button" disabled={mode === 'create'}>Delete the player</button> {/* Delete button */}
                </form>
            </BackgroundImageRotator>
        </>
    );
};

export default PlayerPage;