import React, { useEffect, useState } from 'react';
import BackgroundImageRotator from './BackgroundImageRotator';
import NavigationMenu from './NavigationMenu';

const GameDataPage = () => {
    const [bestPlayers, setBestPlayers] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch the best players' data from your API
        fetch('http://localhost:8000/api/best-players')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setBestPlayers(data); // Set the best players' data
                setLoading(false); // Set loading to false after data is fetched
            })
            .catch(error => {
                console.error('Error fetching best players data:', error);
                setLoading(false); // Stop loading even if an error occurs
            });
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <>
            <NavigationMenu />
            <BackgroundImageRotator>
                <div>
                    <h1>Here are the league's best players on every position</h1>

                    {/* Check if bestPlayers data is available */}
                    {bestPlayers && (
                        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                            {Object.keys(bestPlayers).map(position => (
                                <div key={bestPlayers[position].id} style={{ margin: '20px' }}>
                                    <h2>{position.charAt(0).toUpperCase() + position.slice(1)}</h2>
                                    <p><strong>Name:</strong> {bestPlayers[position].name}</p>
                                    <p><strong>Total Points:</strong> {bestPlayers[position].total_points}</p>
                                    <img 
                                        src={bestPlayers[position].photo}
                                        alt={bestPlayers[position].name} 
                                        style={{ width: '110px', height: '140px' }}
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </BackgroundImageRotator>
        </>
    );
};

export default GameDataPage;