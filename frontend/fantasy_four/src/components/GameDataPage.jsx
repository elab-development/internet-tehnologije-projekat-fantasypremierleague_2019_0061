import React from 'react';
import BackgroundImageRotator from './BackgroundImageRotator';
import NavigationMenu from './NavigationMenu';

const GameDataPage = () => {
    return (
        <>
        <NavigationMenu></NavigationMenu>
        <BackgroundImageRotator>
            <div>
                <h1>Here is the current game data</h1>
            </div>
        </BackgroundImageRotator>
        </>
    );
};

export default GameDataPage;