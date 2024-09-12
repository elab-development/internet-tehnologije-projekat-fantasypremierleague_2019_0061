import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import NavigationMenu from './NavigationMenu';
import '../css/CreateTeamPage.css';
import BackgroundImageRotator from './BackgroundImageRotator';
import PlayerField from './PlayerField';
import { useNavigate } from 'react-router-dom';

const CreateTeamPage = () => {
    const [username, setUsername] = useState('');
    const [token, setToken] = useState('');
    const [team, setTeam] = useState(null);
    const [players, setPlayers] = useState([]);
    const [selectedPlayers, setSelectedPlayers] = useState([]);
    const [teamPlayers, setTeamPlayers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        const token = localStorage.getItem('token');
        const role = localStorage.getItem('role');
        setToken(token);

        if (token && role === 'manager') {
            setUsername(storedUsername);
            fetchUserTeam();
            fetchTeamPlayers();
        }
    }, []);

    const fetchUserTeam = async () => {
        const token = localStorage.getItem('token');
        
        const response = await fetch('http://localhost:8000/api/user/team', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
    
        if (response.ok) {
            const team = await response.json();
            setTeam(team);
        } else {
            console.log('Failed to fetch the team');
        }
    };

    const fetchTeamPlayers = async () => {
        const token = localStorage.getItem('token');
    
        const response = await fetch('http://localhost:8000/api/user/team/players', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
    
        if (response.ok) {
            const data = await response.json();
            const players = data.players || [];
            
            // Fetch live scores for these players
            const liveScoreResponse = await fetch('http://localhost:8000/api/user/team/players/scores', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
    
            if (liveScoreResponse.ok) {
                const liveScores = await liveScoreResponse.json();
                // Combine players with their live scores
                const playersWithScores = players.map(player => {
                    const scoreData = liveScores.find(score => score.player_id === player.id);
                    return {
                        ...player,
                        score: scoreData ? scoreData.score : 0, // Default score to 0 if not found
                    };
                });
    
                setTeamPlayers(playersWithScores);
                console.log(playersWithScores);
            } else {
                alert('Failed to fetch live scores.');
            }
        } else {
            alert('Failed to fetch the players of your team.');
        }
    };

    const createTeam = async (e) => {
        e.preventDefault();
        const teamName = e.target.elements['team-name'].value;
        const token = localStorage.getItem('token');

        const response = await fetch('http://localhost:8000/api/teams', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ name: teamName }),
        });

        if (response.ok) {
            const data = await response.json();
            setTeam(data); // Update the team data
        } else {
            alert('Failed to create team');
        }
    };

    const searchPlayers = async (e) => {
        e.preventDefault();
        const position = e.target.elements['player-position'].value;
        const maxCost = e.target.elements['player-max-cost'].value;

        const url = `http://localhost:8000/api/players/search?position=${position}&max_cost=${maxCost}`;

        const searchResponse = await fetch(url, {
            method: 'GET'
        });

        if (searchResponse.ok) {
            const data = await searchResponse.json();
            setPlayers(data);
        } else {
            alert('Search request failed');
        }
    };

    const handleAddOrRemovePlayer = (player) => {
        if (selectedPlayers.includes(player)) {
            setSelectedPlayers(selectedPlayers.filter(p => p.id !== player.id));
        } else if (selectedPlayers.length < 4) {
            setSelectedPlayers([...selectedPlayers, player]);
        }
    };

    const handleConfirmTeam = async () => {
        const playerIds = selectedPlayers.map(player => player.id);
        console.log(playerIds);
        const token = localStorage.getItem('token');
    
        try {
            const response = await fetch('http://localhost:8000/api/acquisitions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(playerIds),
            });
    
            if (response.ok) {
                fetchUserTeam(); // Refresh the team data and lead to valid team UI
            } else {
                const errorData = await response.json(); // Extract the error message
                console.log('Failed to create team:', errorData.error); // Log the specific error
                alert(`Failed to create team: ${errorData.error}`); // Display the specific error to the user
            }
        } catch (error) {
            console.error('Failed to create team due to a network error:', error); // Handle network or other unexpected errors
            alert('Failed to create team due to a network error.');
        }
    };
    const handleLogout = async () => {
        const token = localStorage.getItem('token');

        const response = await fetch('http://localhost:8000/api/logout', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        });

        if (response.ok) {
           localStorage.clear();
            navigate('/');
        } else {
            alert('Logout failed');
        }
    };
    if(!token){
        return(
            <>
                <NavigationMenu />
                <BackgroundImageRotator>
                    <h1>Register to play the game. If you already have an account, feel free to log in and play.</h1>
                    <Link style={{marginBottom: '20px'}} to='/'>Register to the game</Link>
                    <Link to='/login'>Log in to your account</Link>
                </BackgroundImageRotator>
            </>
        );
    }
    if(token && localStorage.getItem('role') === 'admin'){
        return(
            <>
                <NavigationMenu />
                <BackgroundImageRotator>
                    <h1>Hi, admin. This is the page where managers create and manage their teams.</h1>
                    <button
                        onClick={handleLogout}
                        style={{ marginTop: '10px' }}
                    >
                        Logout
                    </button>
                    <Link to='/admin_dashboard'>Back to admin dashboard</Link>
                </BackgroundImageRotator>
            </>
        );
    }

    if (!team) {
        // User has no team, show create team form
        return (
            <>
                <NavigationMenu />
                <BackgroundImageRotator>
                    <h1>Create your team</h1>
                    <p>Logged in as: {username}</p>
                    <form onSubmit={createTeam}>
                        <label htmlFor="team-name">Team Name</label>
                        <input type="text" name="team-name" required />
                        <button>Create Team</button>
                    </form>
                    <button onClick={handleLogout}>Logout</button>
                </BackgroundImageRotator>
            </>
        );
    } else if (!team.is_valid) {
        // Team exists but is not valid, show player selection page
        return (
            <>
                <NavigationMenu />
                <BackgroundImageRotator>
                    <h1>Add players to your team</h1>
                    <p>Team: {team.name}</p>
                    <p>Logged in as: {username}</p>
                    <form id='player-input-form' onSubmit={searchPlayers}>
                        <label htmlFor="player-position">Position</label>
                        <select name="player-position">
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
                            height: 'auto', // Allow it to grow naturally
                            minHeight: '150px', // Set a minimum height
                            maxHeight: '300px', // Optionally limit the maximum height
                            overflowY: 'auto', // Allow scrolling if the list overflows
                            border: '1px solid #ccc',
                            padding: '10px',
                            backgroundColor: '#f9f9f9',
                            color: 'black'
                        }}
                    >
                        {players.map((player) => (
                            <PlayerField
                                key={player.id}
                                player={player}
                                onAddOrRemove={handleAddOrRemovePlayer}
                            />
                        ))}
                    </div>

                    <div
                        id="selected-players"
                        style={{
                            marginTop: '20px',
                            padding: '10px',
                            backgroundColor: '#e6e6e6',
                            border: '1px solid #ccc',
                            minHeight: '150px', // Set a minimum height
                            maxHeight: '300px', // Optionally limit the maximum height
                            overflowY: 'auto' // Allow scrolling if the list overflows
                        }}
                    >
                        <h2>Selected Players</h2>
                        <ul>
                            {selectedPlayers.map((player) => (
                                <li key={player.id}>{player.name}</li>
                            ))}
                        </ul>
                    </div>

                    <button
                        onClick={handleConfirmTeam}
                        disabled={selectedPlayers.length === 0}
                        style={{ marginTop: '20px' }}
                    >
                        Confirm Team
                    </button>

                    <button
                        onClick={handleLogout}
                        style={{ marginTop: '10px' }}
                    >
                        Logout
                    </button>
                </BackgroundImageRotator>
            </>
        );
    } else {
        // Team is valid, show the team
        return (
            <>
                <NavigationMenu />
                <BackgroundImageRotator>
                    <h1>Your Team</h1>
                    <p>Team: {team.name}</p>
                    <p>Logged in as: {username}</p>
                    <div>
                        <h1>Your player selection:</h1>
                        <ul>
                            {teamPlayers.map(player => (
                                <li style={{fontStyle: 'italic', fontWeight: 'bolder'}} key={player.id}>
                                    {player.photo && <img src={player.photo} alt={`${player.name}`} />} {/* Display player photo */}
                                    <span style={{marginRight: '5px'}}>{player.name}</span><span style={{color:'limegreen'}}>Live Score: {player.score}</span>
                                </li>
                            ))}
                        </ul>
                        <h1>Total Live Score: {teamPlayers.reduce((total, player) => total + player.score, 0)}</h1> {/* Calculate and display total score */}
                    </div>
                    <button onClick={handleLogout}>Logout</button>
                </BackgroundImageRotator>
            </>
        );
    }
};

export default CreateTeamPage;