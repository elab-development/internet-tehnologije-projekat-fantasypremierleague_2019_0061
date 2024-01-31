import React from 'react';
import BackgroundImageRotator from './BackgroundImageRotator';
import NavigationMenu from './NavigationMenu';
import GameDataTable from './GameDataTable';

const GameDataPage = () => {
    return (
        <>
        <NavigationMenu></NavigationMenu>
        <BackgroundImageRotator>
            <div>
                <h1>Here is the current game data</h1>
                <GameDataTable></GameDataTable>
            </div>
        </BackgroundImageRotator>
        </>
    );
};

export default GameDataPage;